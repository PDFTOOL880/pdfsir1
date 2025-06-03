import { SplitPDFTool } from "@/components/tools/split-pdf-tool";

export default function SplitPDFPage() {
  return (
    <div className="container max-w-3xl py-6 space-y-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold mt-10">Split PDF</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manually split your PDF files into multiple documents. Select pages,
          customize output names, and download individual parts
        </p>
      </div>
      <SplitPDFTool />
    </div>
  );
}