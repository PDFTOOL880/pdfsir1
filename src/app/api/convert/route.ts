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
    const conversion = formData.get("conversion") as string;

    if (!file || !conversion) {
      return NextResponse.json(
        { error: "File and conversion type are required" },
        { status: 400 }
      );
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    interface ConversionConfig {
      from: string;
      to: string;
      options?: Record<string, string>;
    }

    // Determine conversion parameters based on tool type
    const conversionParams: Record<string, ConversionConfig> = {
      'pdf-compressor': { from: 'pdf', to: 'pdf', options: { CompressImage: "true" } },
      'pdf-to-word': { from: 'pdf', to: 'docx' },
      'word-to-pdf': { from: 'docx', to: 'pdf' },
      'pdf-merger': { from: 'pdf', to: 'pdf', options: { Merged: "true" } },
      'image-to-pdf': { from: 'auto', to: 'pdf' },
      'pdf-splitter': { from: 'pdf', to: 'split' },
      'pdf-signer': { from: 'pdf', to: 'pdf', options: { SignatureName: "Signature" } }
    };

    const conversionType = conversionParams[conversion as keyof typeof conversionParams];
    
    if (!conversionType) {
      return NextResponse.json({ error: "Invalid conversion type" }, { status: 400 });
    }

    // Convert the file using ConvertAPI
    const params = new URLSearchParams({
      Secret: CONVERT_API_SECRET,
      StoreFile: "true",
      ...(conversionType.options || {})
    });

    const convertUrl = `https://v2.convertapi.com/convert/${conversionType.from}/to/${conversionType.to}?${params}`;
    
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

    // Return the converted file URL
    return NextResponse.json({
      url: result.Files[0].Url,
    });

  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Error converting file" },
      { status: 500 }
    );
  }
}