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

    // Configure OCR parameters
    const params = new URLSearchParams({
      Secret: convertApiSecret,
      File: uploadResult.FileId,
      StoreFile: "true",
      Language: settings.language || "eng", // Default to English if not specified
      OCRMode: settings.ocrMode || "document", // document or receipt
      OCRTimeout: "300" // 5 minutes timeout for OCR
    });

    if (settings.quality) {
      params.append("ImageQuality", 
        settings.quality === "high" ? "100" :
        settings.quality === "medium" ? "80" : "60"
      );
    }

    // Convert PDF to OCR using ConvertAPI
    const apiUrl = `https://v2.convertapi.com/convert/pdf/to/ocr?${params.toString()}`;
    
    const response = await fetch(apiUrl, {
      method: "POST"
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.Message || "Failed to perform OCR");
    }

    const result = await response.json();
    
    if (!result.Files?.[0]?.Url) {
      throw new Error("No OCR result URL received");
    }

    // Download the OCR result
    const ocrResponse = await fetch(result.Files[0].Url);
    if (!ocrResponse.ok) {
      throw new Error("Failed to download OCR result");
    }

    const textContent = await ocrResponse.text();

    // Return the OCR text content
    return NextResponse.json({
      text: textContent,
      filename: result.Files[0].FileName
    });

  } catch (error) {
    console.error("OCR error:", error);
    return NextResponse.json(
      { 
        error: "OCR failed",
        details: error instanceof Error ? error.message : "Failed to process file"
      },
      { status: 500 }
    );
  }
}