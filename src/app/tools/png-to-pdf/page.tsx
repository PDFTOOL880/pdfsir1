"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedDropZone } from "@/components/ui/enhanced-drop-zone";

export default function PNGToPDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesChange = (newFiles: File[]) => {
    setError(null);
    
    // Validate each file
    const invalidFiles = newFiles.filter(
      file => !file.type.includes("image/png")
    );

    if (invalidFiles.length > 0) {
      setError("Please upload only PNG files");
      return;
    }

    // Validate individual file sizes (10MB per file)
    const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError("Each file must be less than 10MB");
      return;
    }

    setFiles(newFiles);
  };

  const handleConversion = async () => {
    if (!files.length) return;

    try {
      setIsConverting(true);
      setError(null);

      const formData = new FormData();
      files.forEach(file => {
        formData.append("files", file);
      });

      const response = await fetch("/api/image/png-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Conversion failed");
      }

      // Check if the response is a PDF
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/pdf")) {
        throw new Error("Invalid response format");
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Clear files after successful conversion
      setFiles([]);
      
    } catch (err) {
      console.error("Conversion error:", err);
      setError(err instanceof Error ? err.message : "Error converting files. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mt-6 flex items-center justify-center gap-2">Convert PNG to PDF</h1>
        
        <EnhancedDropZone
          onFilesChange={handleFilesChange}
          accept={{
            "image/png": [".png"],
          }}
          maxSize={10 * 1024 * 1024}
          files={files}
          maxFiles={10}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-6">
            <Button
              onClick={handleConversion}
              disabled={isConverting}
              className="w-full"
            >
              {isConverting ? "Converting..." : `Convert ${files.length} file${files.length === 1 ? "" : "s"} to PDF`}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}