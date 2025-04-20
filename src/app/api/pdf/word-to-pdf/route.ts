import { NextRequest } from "next/server";
import {
  WordToPdfSettingsSchema,
  validateFile,
  parseSettings,
  QUALITY_PARAMS,
  createErrorResponse,
  createFileResponse,
  DEFAULT_FORMATS
} from "@/lib/conversion-utils";

export async function POST(request: NextRequest) {
  console.log("Starting Word to PDF conversion request");
  
  try {
    const apiSecret = process.env.CONVERTAPI_SECRET;
    if (!apiSecret) {
      console.error("Missing CONVERTAPI_SECRET environment variable");
      return createErrorResponse("API configuration error", 500);
    }

    // Get form data
    let data: FormData;
    try {
      data = await request.formData();
    } catch (error) {
      console.error("Failed to parse form data:", error);
      return createErrorResponse("Invalid form data", 400);
    }

    // Validate file with accepted types
    const acceptedTypes = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    try {
      const file = validateFile(data.get("file"), acceptedTypes);
      console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type
      });
    } catch (error) {
      return createErrorResponse(error, 400);
    }

    // Parse and validate settings
    try {
      const settings = parseSettings(data.get("settings"), WordToPdfSettingsSchema);
      console.log("Parsed settings:", settings);
    } catch (error) {
      return createErrorResponse(error, 400);
    }

    // Get file and settings after validation
    const file = data.get("file") as File;
    const settings = parseSettings(data.get("settings"), WordToPdfSettingsSchema);

    // Send to ConvertAPI
    const sourceFormat = file.name.toLowerCase().endsWith('.docx') ? 'docx' : 'doc';
    const apiUrl = new URL(`https://v2.convertapi.com/convert/${sourceFormat}/to/pdf`);

    // Add API parameters
    const qualityParams = QUALITY_PARAMS[settings.quality];
    const params = {
      Secret: apiSecret,
      StoreFile: "true",
      Timeout: "120",
      PdfA: "false",
      ...qualityParams
    };

    // Add parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      apiUrl.searchParams.append(key, value.toString());
    });

    // Create form data with file
    const formData = new FormData();
    formData.append("File", file);

    console.log("Sending request to ConvertAPI:", {
      url: apiUrl.toString().replace(apiSecret, "***"), // Hide API secret in logs
      fileSize: file.size,
      fileName: file.name,
      quality: settings.quality,
      qualityParams
    });
    
    const convertResponse = await fetch(apiUrl.toString(), {
      method: "POST",
      body: formData
    });

    // Log response content type for debugging
    console.log("ConvertAPI Response Headers:", {
      contentType: convertResponse.headers.get("content-type"),
      status: convertResponse.status
    });

    if (!convertResponse.ok) {
      const errorText = await convertResponse.text();
      console.error("ConvertAPI Error:", {
        status: convertResponse.status,
        statusText: convertResponse.statusText,
        error: errorText
      });
      return createErrorResponse(`Conversion failed: ${errorText}`, convertResponse.status);
    }

    console.log("Received response from ConvertAPI");
    
    const result = await convertResponse.json();
    console.log("ConvertAPI result:", {
      ...result,
      Files: result.Files?.map((f: any) => ({ ...f, Url: "***" })) // Hide URLs in logs
    });

    if (!result.Files?.[0]?.Url) {
      return createErrorResponse("No converted file URL received", 500);
    }

    // Download converted file
    console.log("Downloading converted file from ConvertAPI");
    const fileUrl = result.Files[0].Url;
    const fileResponse = await fetch(fileUrl);
    
    if (!fileResponse.ok) {
      return createErrorResponse("Failed to download converted file", 500);
    }

    const buffer = await fileResponse.arrayBuffer();
    
    console.log("Sending converted file to client:", {
      fileName: file.name,
      contentLength: buffer.byteLength
    });
    
    return createFileResponse(
      buffer,
      file.name,
      DEFAULT_FORMATS.PDF,
      DEFAULT_FORMATS.PDF
    );

  } catch (error) {
    console.error("Conversion error:", error);
    return createErrorResponse(error);
  }
}