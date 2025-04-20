import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';

// Initialize ConvertAPI with secret from environment variables
const convertApiSecret = process.env.CONVERT_API_SECRET;
if (!convertApiSecret) {
  throw new Error('CONVERT_API_SECRET is not set');
}

interface ConvertAPIResponse {
  Files: Array<{
    Url: string;
    FileName: string;
  }>;
}

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null;
  const tempDir = join(process.cwd(), 'temp');
  
  console.log('Starting PDF compression request...');

  try {
    // Create temp directory if it doesn't exist
    if (!existsSync(tempDir)) {
      console.log('Creating temp directory...');
      await mkdir(tempDir, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const compressionLevel = formData.get("compressionLevel") as string;

    console.log('Received file:', file?.name);
    console.log('Compression level:', compressionLevel);

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!compressionLevel) {
      return NextResponse.json(
        { error: "No compression level specified" },
        { status: 400 }
      );
    }

    // Convert compression level to ConvertAPI parameter
    const quality = {
      high: 100,
      medium: 70,
      low: 40
    }[compressionLevel] || 70;

    // Create a temporary file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    tempFilePath = join(tempDir, `${Date.now()}_${file.name}`);
    
    console.log('Writing temp file to:', tempFilePath);
    await writeFile(tempFilePath, buffer);

    // Prepare the API request
    const apiUrl = `https://v2.convertapi.com/convert/pdf/to/compress?secret=${convertApiSecret}`;
    
    // Create form data for API request
    const apiFormData = new FormData();
    const fileBlob = new Blob([buffer], { type: 'application/pdf' });
    apiFormData.append('File', fileBlob, file.name);
    apiFormData.append('StoreFile', 'true');
    apiFormData.append('Quality', quality.toString());

    // Make the conversion request
    console.log('Sending request to ConvertAPI...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: apiFormData
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('ConvertAPI error:', error);
      throw new Error(error.Message || 'Conversion failed');
    }

    // Parse the API response
    const result = await response.json() as ConvertAPIResponse;
    console.log('ConvertAPI response:', result);

    if (!result.Files?.[0]?.Url) {
      throw new Error('No URL in conversion result');
    }

    // Download the compressed file
    console.log('Downloading compressed file...');
    const compressedFileResponse = await fetch(result.Files[0].Url);
    if (!compressedFileResponse.ok) {
      throw new Error('Failed to download compressed file');
    }

    // Return the compressed file to the client
    const blob = await compressedFileResponse.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="compressed_${file.name}"`
      }
    });

  } catch (error) {
    console.error('PDF compression error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to compress PDF" },
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