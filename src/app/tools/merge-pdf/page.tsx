import { Metadata } from "next";
import { MergePdfTool } from "@/components/tools/merge-pdf-tool";

export const metadata: Metadata = {
  title: "Merge PDF Files - PDF Tools",
  description: "Combine multiple PDF files into a single document",
};

export default function MergePdfPage() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Merge PDF Files</h1>
        <p className="text-muted-foreground">
          Combine multiple PDF files into a single document. Maximum 20MB per file.
        </p>
      </div>
      
      <MergePdfTool />
    </div>
  );
}