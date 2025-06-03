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

    // Get the uploaded files from request
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    // Process each file to PDF individually
    const pdfUrls: string[] = [];

    for (const file of files) {
      try {
        // Create form data for each file
        const fileFormData = new FormData();
        fileFormData.append('File', file);

        // Set conversion parameters
        const params = new URLSearchParams({
          Secret: convertApiSecret,
          StoreFile: "true",
        });

        // Convert each image to PDF
        const format = file.type.includes('png') ? 'png' : 'jpg';
        const convertUrl = `https://v2.convertapi.com/convert/${format}/to/pdf?${params}`;

        const response = await fetch(convertUrl, {
          method: 'POST',
          body: fileFormData,
        });

        if (!response.ok) {
          throw new Error(`Failed to convert file: ${file.name}`);
        }

        const result = await response.json();
        if (result.Files?.[0]?.Url) {
          pdfUrls.push(result.Files[0].Url);
        }

      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        throw error;
      }
    }

    if (pdfUrls.length === 0) {
      throw new Error("No files were successfully converted");
    }

    // If only one file was converted, return it directly
    if (pdfUrls.length === 1) {
      const response = await fetch(pdfUrls[0]);
      const pdfBuffer = await response.arrayBuffer();
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="merged.pdf"'
        }
      });
    }

    // For multiple files, merge them
    const mergeFormData = new FormData();
    pdfUrls.forEach((url, index) => {
      mergeFormData.append('Files', url);
    });

    const mergeParams = new URLSearchParams({
      Secret: convertApiSecret,
      StoreFile: "true"
    });

    // Merge PDFs using ConvertAPI
    const mergeUrl = `https://v2.convertapi.com/convert/pdf/to/merge?${mergeParams}`;
    const mergeResponse = await fetch(mergeUrl, {
      method: 'POST',
      body: mergeFormData
    });

    if (!mergeResponse.ok) {
      throw new Error("Failed to merge PDF files");
    }

    const mergeResult = await mergeResponse.json();
    
    if (!mergeResult.Files?.[0]?.Url) {
      throw new Error("No merged file URL received");
    }

    // Download the merged PDF
    const finalResponse = await fetch(mergeResult.Files[0].Url);
    const mergedPdfBuffer = await finalResponse.arrayBuffer();

    return new NextResponse(mergedPdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged.pdf"'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: "Failed to process files",
        details: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}