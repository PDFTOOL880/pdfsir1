import { NextRequest, NextResponse } from "next/server";
import { getConvertApiSecret } from "@/lib/convert-api";

export async function POST(request: NextRequest) {
  const convertApiSecret = getConvertApiSecret();

  try {
    if (!convertApiSecret) {
      return NextResponse.json(
        { 
          error: "Service configuration error", 
          details: "The conversion service is not properly configured" 
        },
        { status: 503 }
      );
    }

    // Get the file and settings from the request
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const settingsStr = formData.get("settings") as string;
    const settings = settingsStr ? JSON.parse(settingsStr) : {};

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Upload file to ConvertAPI
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const uploadResponse = await fetch(
      "https://v2.convertapi.com/upload",
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file");
    }

    const uploadResult = await uploadResponse.json();

    // Determine output format
    const outputFormat = settings.format || 'xlsx';

    // Configure conversion parameters
    const params = new URLSearchParams({
      Secret: convertApiSecret,
      File: uploadResult.FileId,
      StoreFile: "true",
    });

    // Add optional parameters
    if (settings.quality) {
      params.append("ImageQuality", 
        settings.quality === "high" ? "100" :
        settings.quality === "medium" ? "80" : "60"
      );
    }

    if (settings.preserveFormatting) {
      params.append("PreserveFormatting", "true");
    }

    // Convert PDF to Excel using ConvertAPI
    const response = await fetch(
      `https://v2.convertapi.com/convert/pdf/to/${outputFormat}?${params.toString()}`,
      {
        method: "POST"
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.Message || "Failed to convert file");
    }

    const result = await response.json();
    
    if (!result.Files?.[0]?.Url) {
      throw new Error("No converted file URL received");
    }

    // Return the conversion result
    return NextResponse.json({
      url: result.Files[0].Url,
      filename: result.Files[0].FileName || `converted.${outputFormat}`
    });

  } catch (error) {
    console.error("PDF to Excel conversion error:", error);
    return NextResponse.json(
      { 
        error: "Conversion failed",
        details: error instanceof Error ? error.message : "Failed to convert file"
      },
      { status: 500 }
    );
  }
}