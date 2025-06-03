import { NextRequest, NextResponse } from "next/server";

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

// Safely check environment variable without throwing
const getConvertApiSecret = () => {
  const secret = process.env.CONVERT_API_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    console.error('CONVERT_API_SECRET environment variable is not configured');
    return null;
  }
  return secret;
};

export async function POST(request: NextRequest) {
  const convertApiSecret = getConvertApiSecret();
  
  if (!convertApiSecret) {
    return NextResponse.json(
      { 
        error: "Service configuration error", 
        details: "The conversion service is not properly configured" 
      },
      { status: 503 }
    );
  }

  try {
    // Get the uploaded files from request
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Create a FormData object for ConvertAPI
    const convertApiFormData = new FormData();

    // Add each file with the "File" parameter name
    files.forEach((file, index) => {
      convertApiFormData.append('File', file);
    });

    // Configure conversion parameters
    convertApiFormData.append('StoreFile', 'true');
    convertApiFormData.append('PageRange', 'allpages');
    convertApiFormData.append('PdfResolution', '150');

    // Convert PNGs to PDF using ConvertAPI's REST endpoint
    const response = await fetch(`https://v2.convertapi.com/convert/png/to/pdf?Secret=${convertApiSecret}`, {
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

    // Download the merged PDF
    const pdfResponse = await fetch(result.Files[0].Url);
    if (!pdfResponse.ok) {
      throw new Error('Failed to download converted file');
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Return the PDF file
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="converted.pdf"`
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