import { NextRequest, NextResponse } from "next/server";

// Safely check environment variable without throwing
const getConvertApiSecret = () => {
  const secret = process.env.CONVERT_API_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    console.error('CONVERT_API_SECRET environment variable is not configured');
    return null;
  }
  return secret;
};

export async function POST(request: NextRequest) {
  const convertApiSecret = getConvertApiSecret();
  
  if (!convertApiSecret) {
    return NextResponse.json(
      { 
        error: "Service configuration error", 
        details: "The conversion service is not properly configured" 
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const settingsStr = formData.get("settings") as string;
    const settings = JSON.parse(settingsStr);

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

    // Prepare conversion parameters
    const params = new URLSearchParams({
      Secret: convertApiSecret,
      File: uploadResult.FileId,
      StoreFile: "true",
    });

    // Add format-specific parameters
    if (settings.format) {
      params.append("Format", settings.format.toUpperCase());
    }

    if (settings.quality) {
      params.append("ImageQuality", 
        settings.quality === "high" ? "100" :
        settings.quality === "medium" ? "80" : "60"
      );
    }

    if (settings.preserveFormatting) {
      params.append("PreserveFormatting", "true");
    }

    // Convert PDF to Word using ConvertAPI
    const response = await fetch(
      `https://v2.convertapi.com/convert/pdf/to/docx?${params.toString()}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.Message || "Failed to convert file");
    }

    const result = await response.json();
    
    // Return the download URL and filename
    return NextResponse.json({
      url: result.Files[0].Url,
      filename: result.Files[0].FileName,
    });

  } catch (error) {
    console.error("PDF to Word conversion error:", error);
    return NextResponse.json(
      { 
        error: "Conversion failed",
        details: error instanceof Error ? error.message : "Failed to convert file"
      },
      { status: 500 }
    );
  }
}