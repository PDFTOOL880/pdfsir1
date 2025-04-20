import { SplitPDFTool } from "@/components/tools/split-pdf-tool";

export default function SplitPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Split PDF</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manually split your PDF files into multiple documents. Select pages,
          customize output names, and download individual parts.
        </p>
      </div>
      <SplitPDFTool />
    </div>
  );
}