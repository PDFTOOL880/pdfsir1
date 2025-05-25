import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse, createFileResponse, validateFile } from "@/lib/conversion-utils";

const CONVERT_API_SECRET = process.env.CONVERT_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!CONVERT_API_SECRET) {
      return NextResponse.json(
        { error: "ConvertAPI secret not configured" },
        { status: 500 }
      );
    }

    // Get the form data
    const formData = await request.formData();
    
    // Extract and validate files from form data
    const files: File[] = [];
    for (let i = 0; formData.has(`file${i}`); i++) {
      try {
        const file = validateFile(formData.get(`file${i}`), ['jpeg', 'jpg', 'png', 'webp']);
        console.log(`Validated file ${i}:`, file.name, file.type);
        files.push(file);
      } catch (error) {
        console.error(`Error validating file ${i}:`, error);
        return createErrorResponse(error, 400);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    console.log(`Processing ${files.length} files...`);

    // Convert each image to PDF first
    const pdfUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Prepare conversion parameters
        const params = new URLSearchParams({
          Secret: CONVERT_API_SECRET,
          StoreFile: "true",
          ImageQuality: "100",
          PdfResolution: "300"
        });

        // Determine source format
        const format = file.type.includes('png') ? 'png' : 'jpg';
        const convertUrl = `https://v2.convertapi.com/convert/${format}/to/pdf?${params}`;

        // Create form data for the API request
        const apiFormData = new FormData();
        const blob = new Blob([buffer], { type: file.type });
        apiFormData.append("File", blob, file.name);

        console.log(`Converting file ${i + 1}/${files.length}: ${file.name}`);
        const response = await fetch(convertUrl, {
          method: "POST",
          body: apiFormData,
        });

        if (!response.ok) {
          throw new Error(`ConvertAPI error: ${response.statusText}`);
        }

        const result = await response.json();
        const pdfUrl = result.Files[0].Url;
        console.log(`File ${i + 1} converted successfully, URL:`, pdfUrl);
        pdfUrls.push(pdfUrl);
      } catch (error) {
        console.error(`Error converting file ${i}:`, error);
        throw new Error(`Failed to convert ${file.name}`);
      }
    }

    // Verify all files were converted
    console.log(`Converted ${pdfUrls.length}/${files.length} files to PDF`);
    if (pdfUrls.length !== files.length) {
      throw new Error(`Some files failed to convert: ${pdfUrls.length}/${files.length} successful`);
    }

    // If only one file, return it directly
    if (pdfUrls.length === 1) {
      const response = await fetch(pdfUrls[0]);
      if (!response.ok) {
        throw new Error("Failed to fetch converted PDF");
      }
      const pdfBuffer = await response.arrayBuffer();

      return createFileResponse(
        pdfBuffer,
        files[0].name.replace(/\.[^/.]+$/, ".pdf"),
        "pdf",
        "pdf"
      );
    }

    // Merge PDFs if multiple files
    try {
      console.log("Starting merge process with URLs:", pdfUrls);

      // Create the merge request
      const mergeParams = new URLSearchParams({
        Secret: CONVERT_API_SECRET,
        StoreFile: "true"
      });

      const mergeFormData = new FormData();
      
      // Add each PDF URL as an indexed Files parameter
      pdfUrls.forEach((url, index) => {
        mergeFormData.append(`Files[${index}]`, url);
        console.log(`Added file ${index + 1} to merge request:`, url);
      });

      console.log(`Sending merge request with ${pdfUrls.length} files...`);
      const mergeUrl = `https://v2.convertapi.com/convert/pdf/to/merge?${mergeParams}`;
      
      const mergeResponse = await fetch(mergeUrl, {
        method: "POST",
        body: mergeFormData,
      });

      if (!mergeResponse.ok) {
        const errorText = await mergeResponse.text();
        console.error("Merge response error:", errorText);
        throw new Error(`Failed to merge PDFs: ${mergeResponse.statusText}`);
      }

      const mergeResult = await mergeResponse.json();
      console.log("Merge result:", mergeResult);

      if (!mergeResult.Files?.[0]?.Url) {
        throw new Error("Invalid merge result: no URL found");
      }

      const mergedPdfUrl = mergeResult.Files[0].Url;
      console.log("Fetching merged PDF from:", mergedPdfUrl);
      
      const finalResponse = await fetch(mergedPdfUrl);
      if (!finalResponse.ok) {
        throw new Error("Failed to fetch merged PDF");
      }
      
      const pdfBuffer = await finalResponse.arrayBuffer();

      // Return the final merged PDF
      return createFileResponse(
        pdfBuffer,
        "merged-images.pdf",
        "pdf",
        "pdf"
      );

    } catch (error) {
      console.error("Error during merge process:", error);
      throw error;
    }

  } catch (error) {
    console.error("Error in merge-images-to-pdf:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error converting files" },
      { status: 500 }
    );
  }
}