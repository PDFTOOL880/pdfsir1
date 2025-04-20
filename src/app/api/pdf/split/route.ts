import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const pages = JSON.parse(formData.get("pages") as string) as {
      pageNumber: number;
      selected: boolean;
      outputName: string;
    }[];

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const zip = new JSZip();
    
    // Process each page separately
    await Promise.all(
      pages.map(async (page) => {
        // Create a FormData object for ConvertAPI
        const convertApiFormData = new FormData();
        convertApiFormData.append('File', file);
        convertApiFormData.append('StoreFile', 'true');
        convertApiFormData.append('Pages', page.pageNumber.toString());

        // Convert using ConvertAPI's REST endpoint
        const response = await fetch(
          `https://v2.convertapi.com/convert/pdf/to/pdf?Secret=${API_SECRET}`, 
          {
            method: 'POST',
            body: convertApiFormData
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('ConvertAPI error:', errorText);
          throw new Error(errorText);
        }

        const result = await response.json() as ConvertApiResponse;
        
        if (!result.Files || result.Files.length === 0) {
          throw new Error('Invalid response from ConvertAPI');
        }

        // Download the split PDF
        const pdfResponse = await fetch(result.Files[0].Url);
        if (!pdfResponse.ok) {
          throw new Error(`Failed to download split PDF for page ${page.pageNumber}`);
        }

        const pdfBuffer = await pdfResponse.arrayBuffer();
        zip.file(`${page.outputName}.pdf`, pdfBuffer);
      })
    );

    // Generate the zip file
    const zipBuffer = await zip.generateAsync({ type: "arraybuffer" });

    // Return the zip file
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=split_pdfs.zip'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Error splitting PDF",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
