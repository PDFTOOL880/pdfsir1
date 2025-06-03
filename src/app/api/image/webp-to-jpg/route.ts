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

    // Configure conversion parameters
    const params = new URLSearchParams({
      Secret: convertApiSecret,
      File: uploadResult.FileId,
      StoreFile: "true",
      ImageQuality: settings.quality === "high" ? "100" :
                   settings.quality === "medium" ? "80" : "60"
    });

    // Convert WebP to JPG using ConvertAPI
    const convertUrl = `https://v2.convertapi.com/convert/webp/to/jpg?${params}`;
    
    const response = await fetch(convertUrl, {
      method: "POST"
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.Message || "Failed to convert file");
    }

    const result = await response.json();
    
    if (!result.Files?.[0]?.Url) {
      throw new Error("No converted file URL received");
    }

    // Download the converted image
    const imageResponse = await fetch(result.Files[0].Url);
    if (!imageResponse.ok) {
      throw new Error("Failed to download converted file");
    }

    const imageBuffer = await imageResponse.arrayBuffer();

    // Return the converted image
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${file.name.replace(/\.webp$/, '.jpg')}"`
      }
    });

  } catch (error) {
    console.error("WebP to JPG conversion error:", error);
    return NextResponse.json(
      { 
        error: "Conversion failed",
        details: error instanceof Error ? error.message : "Failed to convert file"
      },
      { status: 500 }
    );
  }
}