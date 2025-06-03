import { Metadata } from "next";
import { OcrPDFTool } from "@/components/tools/ocr-pdf-tool";

export const metadata: Metadata = {
  title: "PDF OCR - Extract Text from PDF",
  description: "Extract text from PDF documents using OCR technology. Supports Arabic and English text recognition.",
};

export default function OcrPDFPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold mt-8">PDF OCR</h1>
        <p className="text-muted-foreground">
          Extract text from PDF documents using advanced OCR technology. Our tool supports both Arabic and English text recognition, making it perfect for multilingual documents.
        </p>
      </div>
      <OcrPDFTool />
    </div>
  );
}