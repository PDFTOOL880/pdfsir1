import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse, validateFile } from "@/lib/conversion-utils";

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

// Verify environment variable
const API_SECRET = process.env.CONVERT_API_SECRET;
if (!API_SECRET) {
  throw new Error("CONVERT_API_SECRET environment variable is not configured");
}

export async function POST(request: NextRequest) {
  try {
    // Get the uploaded files from request
    const formData = await request.formData();
    const files = formData.getAll('files').map(file => {
      return validateFile(file, ['pdf']);
    });

    if (files.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 PDF files are required' },
        { status: 400 }
      );
    }

    console.log(`Processing ${files.length} files for merge...`);

    // Create a FormData object for ConvertAPI
    const convertApiFormData = new FormData();

    // Add each file for merging
    files.forEach((file) => {
      convertApiFormData.append('Files', file);
    });

    // Configure conversion parameters
    convertApiFormData.append('StoreFile', 'true');

    console.log("Sending merge request to ConvertAPI...");
    const response = await fetch(
      `https://v2.convertapi.com/convert/pdf/to/merge?Secret=${API_SECRET}`,
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
    console.log('Conversion result:', result);
    
    if (!result.Files || result.Files.length === 0) {
      throw new Error('Invalid response from ConvertAPI');
    }

    // Download the merged PDF
    const pdfResponse = await fetch(result.Files[0].Url);
    if (!pdfResponse.ok) {
      throw new Error('Failed to download merged file');
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Return the merged PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged.pdf"'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Error merging PDFs",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}