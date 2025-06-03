import { Metadata } from "next";
import { CompressPDFTool } from "@/components/tools/compress-pdf-tool";

export const metadata: Metadata = {
  title: "Compress PDF - PDF Tools",
  description: "Reduce PDF file size while maintaining quality. Perfect for sharing and storing documents.",
};

export default function CompressPDFPage() {
  return (
    <div className="flex justify-center items-start min-h-screen py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold mt-6">Compress PDF</h1>
          <p className="text-muted-foreground">
            Reduce your PDF file size while maintaining quality. Choose from different compression levels to find the perfect balance between file size and quality.
          </p>
        </div>
        <CompressPDFTool />
      </div>
    </div>
  );
}