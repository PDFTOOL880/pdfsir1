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

    // Upload the file to ConvertAPI
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

    // Set compression parameters based on settings
    const compressionLevel = settings.quality === 'high' ? 'low' :
                           settings.quality === 'medium' ? 'medium' : 'high';

    // Prepare the API request parameters
    const params = new URLSearchParams({
      Secret: convertApiSecret,
      File: uploadResult.FileId,
      StoreFile: "true",
      CompressLevel: compressionLevel
    });

    // Compress PDF using ConvertAPI
    const apiUrl = `https://v2.convertapi.com/convert/pdf/to/compress?${params.toString()}`;
    
    const response = await fetch(apiUrl, {
      method: "POST"
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.Message || "Failed to compress file");
    }

    const result = await response.json();
    
    if (!result.Files?.[0]?.Url) {
      throw new Error("No compressed file URL received");
    }

    // Download the compressed PDF
    const pdfResponse = await fetch(result.Files[0].Url);
    if (!pdfResponse.ok) {
      throw new Error("Failed to download compressed file");
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Return the compressed PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="compressed_${file.name}"`
      }
    });

  } catch (error) {
    console.error("PDF compression error:", error);
    return NextResponse.json(
      { 
        error: "Compression failed",
        details: error instanceof Error ? error.message : "Failed to compress file"
      },
      { status: 500 }
    );
  }
}