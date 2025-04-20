import { NextRequest, NextResponse } from "next/server";

// Initialize ConvertAPI with the secret
const CONVERT_API_SECRET = process.env.CONVERT_API_SECRET;

export async function POST(request: NextRequest) {
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
    const settings = JSON.parse(settingsStr);

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Set up ConvertAPI parameters
    const params = new URLSearchParams({
      Secret: CONVERT_API_SECRET,
      StoreFile: "true",
      ImageQuality: settings.quality === 'high' ? '100' : 
                   settings.quality === 'medium' ? '80' : '60'
    });

    const convertUrl = `https://v2.convertapi.com/convert/webp/to/jpg?${params}`;
    
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
      throw new Error(`ConvertAPI error: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Download the converted file
    const fileUrl = result.Files[0].Url;
    const convertedFileResponse = await fetch(fileUrl);
    
    if (!convertedFileResponse.ok) {
      throw new Error("Failed to download converted file");
    }

    const convertedFileBuffer = await convertedFileResponse.arrayBuffer();

    // Return the file directly
    return new NextResponse(convertedFileBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${file.name.replace(/\.webp$/, '.jpg')}"`,
      },
    });

  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Error converting file" },
      { status: 500 }
    );
  }
}