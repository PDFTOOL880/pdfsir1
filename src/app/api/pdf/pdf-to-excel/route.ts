import { NextRequest } from "next/server";
import {
  createErrorResponse,
  createFileResponse,
  parseSettings,
  PdfToExcelSettingsSchema,
  validateFile,
  DEFAULT_FORMATS,
  QUALITY_PARAMS,
  MIME_TYPES,
} from "@/lib/conversion-utils";

interface ConvertApiResponse {
  ConversionCost?: number;
  Files?: Array<{
    FileName: string;
    FileSize: number;
    FileId: string;
    Url: string;
  }>;
  Error?: string;
}

export async function POST(request: NextRequest) {
  if (!process.env.CONVERT_API_SECRET) {
    return new Response(
      JSON.stringify({
        error: "Server configuration error",
        details: "ConvertAPI secret is not set"
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const formData = await request.formData();
    const file = validateFile(formData.get("file"), ["application/pdf"]);
    const settings = parseSettings(formData.get("settings"), PdfToExcelSettingsSchema);

    // Create FormData for ConvertAPI
    const apiFormData = new FormData();
    apiFormData.append("File", file);
    apiFormData.append("StoreFile", "true");
    
    // Add conversion parameters based on settings
    const qualityParams = QUALITY_PARAMS[settings.quality];
    if (settings.extractAllTables) {
      apiFormData.append("ExtractAllTables", "true");
    }
    apiFormData.append("OCR", "true"); // Enable OCR for better table detection
    apiFormData.append("Timeout", "180"); // Set timeout to 3 minutes

    const outputFormat = settings.format || DEFAULT_FORMATS.EXCEL;

    // Call ConvertAPI
    const response = await fetch(
      `https://v2.convertapi.com/convert/pdf/to/${outputFormat}?Secret=${process.env.CONVERT_API_SECRET}`,
      {
        method: "POST",
        body: apiFormData,
      }
    );

    if (!response.ok) {
      let errorMessage: string;
      try {
        const errorData = await response.json();
        errorMessage = errorData.Error || response.statusText;
      } catch {
        errorMessage = await response.text() || `Conversion failed with status ${response.status}`;
      }
      return new Response(
        JSON.stringify({
          error: "Conversion service error",
          details: errorMessage
        }),
        { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse ConvertAPI response
    const apiResponse: ConvertApiResponse = await response.json();
    
    if (apiResponse.Error) {
      return new Response(
        JSON.stringify({
          error: "Conversion service error",
          details: apiResponse.Error
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!apiResponse.Files?.[0]?.Url) {
      return new Response(
        JSON.stringify({
          error: "Invalid conversion result",
          details: "No output file in response"
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Download the converted file
    const fileResponse = await fetch(apiResponse.Files[0].Url);
    if (!fileResponse.ok) {
      return new Response(
        JSON.stringify({
          error: "Download failed",
          details: "Failed to download converted file"
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await fileResponse.arrayBuffer();
    if (!result || result.byteLength === 0) {
      return new Response(
        JSON.stringify({
          error: "Empty file",
          details: "Conversion produced an empty file"
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return createFileResponse(
      result,
      apiResponse.Files[0].FileName || file.name.replace(".pdf", `.${outputFormat}`),
      outputFormat,
      DEFAULT_FORMATS.EXCEL
    );
  } catch (error) {
    console.error("PDF to Excel conversion error:", error);
    return new Response(
      JSON.stringify({
        error: "Conversion failed",
        details: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}