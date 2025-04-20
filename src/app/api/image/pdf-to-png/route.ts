import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

interface ConvertAPIResult {
  Files: Array<{
    Url: string;
    FileName: string;
  }>;
}

interface UploadResult {
  FileId: string;
  FileName: string;
  FileExt: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    try {
      // First, upload the file
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const uploadResponse = await fetch(
        'https://v2.convertapi.com/upload',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: uploadFormData
        }
      );

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.Message || 'File upload failed');
      }

      const uploadResult = await uploadResponse.json() as UploadResult;

      // Now convert the uploaded file
      const params = new URLSearchParams({
        Secret: process.env.CONVERT_API_SECRET as string,
        File: uploadResult.FileId,
        ImageHeight: '1920',
        ImageWidth: '1920',
        ScaleImage: 'true',
        ScaleProportions: 'true',
        StoreFile: 'true',
      });

      const response = await fetch(
        `https://v2.convertapi.com/convert/pdf/to/png?${params.toString()}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.Message || 'Conversion failed');
      }

      const result = await response.json() as ConvertAPIResult;

      // Get all converted files (one per page)
      const files = await Promise.all(
        result.Files.map(file => 
          fetch(file.Url).then(res => res.arrayBuffer())
        )
      );

      // If only one file, return it directly
      if (files.length === 1) {
        return new NextResponse(files[0], {
          headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '.png')}"`,
          },
        });
      }

      // For multiple files, create a zip archive
      const zip = new JSZip();
      result.Files.forEach((file, index) => {
        zip.file(`page-${index + 1}.png`, files[index]);
      });

      const zipBuffer = await zip.generateAsync({
        type: 'arraybuffer',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9,
        },
      });

      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '.zip')}"`,
        },
      });

    } catch (conversionError) {
      console.error('Conversion error details:', conversionError);
      const errorMessage = conversionError instanceof Error 
        ? conversionError.message 
        : 'Conversion process failed';
      console.error('Full error:', errorMessage);
      throw new Error(errorMessage);
    }

  } catch (error) {
    console.error('PDF to PNG conversion failed:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Conversion failed: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Conversion failed' },
      { status: 500 }
    );
  }
}