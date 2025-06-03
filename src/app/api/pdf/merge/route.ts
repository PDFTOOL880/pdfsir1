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

    if (files.length < 2) {
      return NextResponse.json(
        { error: "At least 2 PDF files are required for merging" },
        { status: 400 }
      );
    }

    // Upload each file to ConvertAPI
    const uploadedFileUrls: string[] = [];

    for (const file of files) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const uploadResponse = await fetch(
        'https://v2.convertapi.com/upload',
        {
          method: 'POST',
          body: uploadFormData
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file: ${file.name}`);
      }

      const uploadResult = await uploadResponse.json();
      uploadedFileUrls.push(uploadResult.FileId);
    }

    // Create merge request form data
    const mergeFormData = new FormData();
    uploadedFileUrls.forEach((fileId) => {
      mergeFormData.append('Files', fileId);
    });

    // Configure merge parameters
    const params = new URLSearchParams({
      Secret: convertApiSecret,
      StoreFile: "true"
    });

    // Merge PDFs using ConvertAPI
    const response = await fetch(
      `https://v2.convertapi.com/convert/pdf/to/merge?${params.toString()}`,
      {
        method: 'POST',
        body: mergeFormData
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.Message || "Failed to merge files");
    }

    const result = await response.json();
    
    if (!result.Files?.[0]?.Url) {
      throw new Error("No merged file URL received");
    }

    // Download the merged PDF
    const pdfResponse = await fetch(result.Files[0].Url);
    if (!pdfResponse.ok) {
      throw new Error("Failed to download merged file");
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
    console.error("PDF merge error:", error);
    return NextResponse.json(
      { 
        error: "Merge failed",
        details: error instanceof Error ? error.message : "Failed to merge files"
      },
      { status: 500 }
    );
  }
}