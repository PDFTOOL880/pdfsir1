"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedDropZone } from "@/components/ui/enhanced-drop-zone";

export default function PDFToJPGPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesChange = (newFiles: File[]) => {
    setError(null);
    
    if (newFiles.length === 0) {
      return;
    }

    const file = newFiles[0];

    // Validate file type
    if (!file.type.includes("pdf")) {
      setError("Please upload a PDF file");
      setFiles([]);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      setFiles([]);
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
      formData.append("file", files[0]);

      const response = await fetch("/api/image/pdf-to-jpg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Conversion failed");
      }

      // Check if the response is actually a JPG file
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("image/jpeg")) {
        throw new Error("Invalid response format");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = files[0].name.replace(".pdf", ".jpg");
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Clear the file after successful conversion
      setFiles([]);
      
    } catch (err) {
      console.error("Conversion error:", err);
      setError(err instanceof Error ? err.message : "Error converting file. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Convert PDF to JPG</h1>
        
        <EnhancedDropZone
          onFilesChange={handleFilesChange}
          accept={{
            "application/pdf": [".pdf"],
          }}
          maxSize={10 * 1024 * 1024}
          files={files}
          maxFiles={1}
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
              {isConverting ? "Converting..." : "Convert to JPG"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}