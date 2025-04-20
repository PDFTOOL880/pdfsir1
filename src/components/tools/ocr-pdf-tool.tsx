"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropZone } from "@/components/ui/drop-zone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Language = "ara,eng" | "ara" | "eng";

export function OcrPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [language, setLanguage] = useState<Language>("ara,eng");

  const handleFileSelect = async (files: File[]) => {
    setError("");
    const pdfFile = files[0];

    if (!pdfFile) return;

    if (pdfFile.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    // 50MB file size limit
    if (pdfFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    setFile(pdfFile);
    const url = URL.createObjectURL(pdfFile);
    setPreviewUrl(url);
  };

  const handleOcr = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError("");

      console.log('Starting OCR process with language:', language);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      // Make the request with proper headers
      const response = await fetch("/api/pdf/ocr", {
        method: "POST",
        headers: {
          'Accept': 'text/plain, application/json',
        },
        body: formData,
      });

      // Log detailed response information
      console.log('Response status:', response.status);
      console.log('Response type:', response.headers.get('content-type'));

      // Check for error responses
      if (!response.ok) {
        let errorMessage = "Failed to process PDF";
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Process the response
      console.log('Processing response...');
      const blob = await response.blob();
      console.log('Blob type:', blob.type);
      const url = URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `ocr_${file.name.replace('.pdf', '.txt')}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('File download initiated');

    } catch (err) {
      console.error("OCR error:", err);
      setError(err instanceof Error ? err.message : "Failed to process PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6">
      <div className="space-y-4">
        <DropZone
          onFileSelect={handleFileSelect}
          accept={{
            "application/pdf": [".pdf"],
          }}
          maxFiles={1}
        />

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        {file && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <p className="text-sm">
                File: <span className="font-medium">{file.name}</span>
              </p>
              <p className="text-sm">
                Size: <span className="font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ara,eng">Arabic and English</SelectItem>
                  <SelectItem value="ara">Arabic Only</SelectItem>
                  <SelectItem value="eng">English Only</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={handleOcr}
                disabled={isProcessing || !file}
              >
                {isProcessing ? "Processing..." : "Extract Text"}
              </Button>
            </div>

            {previewUrl && (
              <div className="mt-4">
                <iframe
                  src={previewUrl}
                  className="w-full h-[500px] border rounded"
                  title="PDF preview"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}