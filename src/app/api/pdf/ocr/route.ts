import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';

interface ConvertAPIResponse {
  Files: Array<{
    Url: string;
    FileName: string;
  }>;
}

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null;
  const tempDir = join(process.cwd(), 'temp');
  
  console.log('Starting PDF OCR request...');

  try {
    const convertApiSecret = process.env.CONVERT_API_SECRET;
    if (!convertApiSecret) {
      throw new Error('CONVERT_API_SECRET is not set');
    }

    // Create temp directory if it doesn't exist
    if (!existsSync(tempDir)) {
      console.log('Creating temp directory...');
      await mkdir(tempDir, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const language = formData.get("language") as string || "ara,eng";

    console.log('Received file:', file?.name);
    console.log('Language:', language);

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Create a temporary file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    tempFilePath = join(tempDir, `${Date.now()}_${file.name}`);
    
    console.log('Writing temp file to:', tempFilePath);
    await writeFile(tempFilePath, buffer);

    // Create URL with query parameters after validating API key
    const params = new URLSearchParams([
      ['Secret', convertApiSecret],
      ['StoreFile', 'true'],
      ['Language', language]
    ]);
    
    const apiUrl = `https://v2.convertapi.com/convert/pdf/to/ocr?${params.toString()}`;
    
    // Create form data for API request (file only)
    const apiFormData = new FormData();
    const fileBlob = new Blob([buffer], { type: 'application/pdf' });
    apiFormData.append('File', fileBlob, file.name);

    // Make the conversion request
    console.log('Sending request to ConvertAPI...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: apiFormData
    });

    // Log response details for debugging
    console.log('Response status:', response.status);
    const contentType = response.headers.get('content-type');
    console.log('Response content type:', contentType);

    if (!response.ok) {
      try {
        const error = await response.json();
        console.error('ConvertAPI error:', error);
        throw new Error(error.Message || 'OCR processing failed');
      } catch (jsonError) {
        console.error('Error parsing error response:', await response.text());
        throw new Error('OCR processing failed');
      }
    }

    // Parse the API response
    const result = await response.json() as ConvertAPIResponse;
    console.log('ConvertAPI response:', result);

    if (!result.Files?.[0]?.Url) {
      throw new Error('No URL in conversion result');
    }

    // Download the processed file
    console.log('Downloading OCR processed file...');
    const processedFileResponse = await fetch(result.Files[0].Url);
    if (!processedFileResponse.ok) {
      throw new Error('Failed to download OCR processed file');
    }

    // Return the processed file to the client
    const blob = await processedFileResponse.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="ocr_${file.name.replace('.pdf', '.txt')}"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('PDF OCR error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  } finally {
    // Clean up: delete the temporary file
    if (tempFilePath) {
      try {
        console.log('Cleaning up temp file:', tempFilePath);
        await unlink(tempFilePath);
      } catch (error) {
        console.error('Error deleting temporary file:', error);
      }
    }
  }
}