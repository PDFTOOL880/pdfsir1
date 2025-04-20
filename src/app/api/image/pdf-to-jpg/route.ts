import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

// Define types for ConvertAPI response
interface ConvertApiFile {
  FileName: string;
  FileExt: string;
  FileSize: number;
  FileId: string;
  Url: string;
}

interface ConvertApiResponse {
  ConversionCost: number;
  Files: ConvertApiFile[];
}

export async function POST(request: NextRequest) {
  const API_SECRET = process.env.CONVERT_API_SECRET;
  if (!API_SECRET) {
    return NextResponse.json(
      { error: "API configuration error" },
      { status: 500 }
    );
  }

  try {
    // Get the file from the request
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Log file details for debugging
    console.log('File received:', {
      type: file.type,
      size: file.size,
      name: (file as any).name
    });

    // Create a FormData object for ConvertAPI
    const convertApiFormData = new FormData();
    convertApiFormData.append('File', file);
    convertApiFormData.append('StoreFile', 'true');
    convertApiFormData.append('ImageHeight', '1920');
    convertApiFormData.append('ImageWidth', '1080');
    convertApiFormData.append('JpgQuality', '90');

    // Convert PDF to JPG using ConvertAPI's REST endpoint
    const response = await fetch(`https://v2.convertapi.com/convert/pdf/to/jpg?Secret=${API_SECRET}`, {
      method: 'POST',
      body: convertApiFormData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ConvertAPI error:', errorText);
      throw new Error(errorText);
    }

    const result = await response.json() as ConvertApiResponse;
    console.log('Conversion result:', result);
    
    if (!result.Files || result.Files.length === 0) {
      throw new Error('Invalid response from ConvertAPI');
    }

    // If there's only one page, return it directly
    if (result.Files.length === 1) {
      const jpgResponse = await fetch(result.Files[0].Url);
      if (!jpgResponse.ok) {
        throw new Error('Failed to download converted file');
      }
      const jpgBuffer = await jpgResponse.arrayBuffer();

      return new NextResponse(jpgBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': `attachment; filename=${(file as any).name?.replace('.pdf', '.jpg') || 'converted.jpg'}`
        }
      });
    }

    // For multiple pages, create a zip file
    const zip = new JSZip();
    const basename = (file as any).name?.replace('.pdf', '') || 'converted';

    // Download all JPG files and add them to the zip
    await Promise.all(
      result.Files.map(async (file: ConvertApiFile, index: number) => {
        const jpgResponse = await fetch(file.Url);
        if (!jpgResponse.ok) {
          throw new Error(`Failed to download page ${index + 1}`);
        }
        const jpgBuffer = await jpgResponse.arrayBuffer();
        // Add file to zip with page number in filename
        zip.file(`${basename}-page${index + 1}.jpg`, jpgBuffer);
      })
    );

    // Generate the zip file
    const zipBuffer = await zip.generateAsync({ type: "arraybuffer" });

    // Return the zip file
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${basename}.zip`
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Error converting file",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';