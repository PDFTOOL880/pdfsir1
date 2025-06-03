"use client";

import ToolProcessor from "../[tool]/tool-processor";

export default function WordToPdfPage() {
  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-3xl font-bold">Convert Word to PDF</h1>
          <p className="text-muted-foreground">
            Transform Word documents into high-quality PDF files while preserving formatting.
          </p>
        </div>

        <ToolProcessor
          toolId="word-to-pdf"
          toolTitle="Word to PDF"
        />
      </div>
    </div>
  );
}