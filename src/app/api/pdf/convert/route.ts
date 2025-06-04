import { NextRequest, NextResponse } from "next/server";
import { convertFile } from "@/lib/convert-api";

export async function POST(request: NextRequest) {

  try {
    // Get file and settings from request
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

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Convert PDF to Word
    const result = await convertFile(fileBuffer, 'pdf', 'docx', {
      quality: settings.quality || 'high',
      format: settings.format || 'docx',
      preserveFormatting: true
    });

    // Return the result
    return NextResponse.json({
      url: result.url,
      filename: result.filename
    });

  } catch (error) {
    console.error('Conversion failed:', error);
    return NextResponse.json(
      { 
        error: "Conversion failed",
        details: error instanceof Error ? error.message : "An unexpected error occurred"
      },
      { status: 500 }
    );
  }
}