import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const CONVERT_API_SECRET = process.env.CONVERT_API_SECRET;

  try {
    if (!CONVERT_API_SECRET) {
      return NextResponse.json(
        { error: "ConvertAPI secret not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const settingsStr = formData.get("settings") as string;
    
    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    let settings = {
      quality: "high",
      format: "docx",
      preserveFormatting: true
    };

    if (settingsStr) {
      try {
        const parsedSettings = JSON.parse(settingsStr);
        settings = { ...settings, ...parsedSettings };
      } catch (e) {
        console.error("Error parsing settings:", e);
      }
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Set up conversion parameters
    const params = new URLSearchParams({
      Secret: CONVERT_API_SECRET,
      StoreFile: "true",
      ImageQuality: settings.quality === "high" ? "100" : 
                   settings.quality === "medium" ? "80" : "60",
      PreserveFormatting: settings.preserveFormatting ? "true" : "false"
    });

    const convertUrl = `https://v2.convertapi.com/convert/pdf/to/${settings.format}?${params}`;
    
    // Create form data for the API request
    const apiFormData = new FormData();
    const blob = new Blob([buffer], { type: file.type });
    apiFormData.append("File", blob, file.name);

    // Send request to ConvertAPI
    const response = await fetch(convertUrl, {
      method: "POST",
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ConvertAPI error: ${errorText}`);
    }

    const result = await response.json();

    // Get the converted file
    const convertedFileUrl = result.Files[0].Url;
    const wordFileResponse = await fetch(convertedFileUrl);
    const wordFileBlob = await wordFileResponse.blob();

    // Create safe filename
    const safeFileName = encodeURIComponent(file.name.replace('.pdf', `.${settings.format}`));

    // Return the Word document with proper headers
    return new Response(wordFileBlob, {
      headers: {
        'Content-Type': settings.format === 'docx' ? 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
          'application/msword',
        'Content-Disposition': `attachment; filename*=UTF-8''${safeFileName}`
      }
    });

  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error converting file" },
      { status: 500 }
    );
  }
}