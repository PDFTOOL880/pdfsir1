"use client";

import ToolProcessor from "../[tool]/tool-processor";

export default function ExcelToPdfPage() {
  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-3xl font-bold">Convert Excel to PDF</h1>
          <p className="text-muted-foreground">
            Convert Excel spreadsheets to PDF format while maintaining all tables and formatting.
          </p>
        </div>

        <ToolProcessor
          toolId="excel-to-pdf"
          toolTitle="Excel to PDF"
        />
      </div>
    </div>
  );
}