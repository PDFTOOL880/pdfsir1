"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropZone } from "@/components/ui/drop-zone";
import * as pdfjsLib from "pdfjs-dist";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

type CompressionLevel = "high" | "medium" | "low";

export function CompressPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");

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

  const handleCompression = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError("");

      console.log('Starting compression with level:', compressionLevel);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("compressionLevel", compressionLevel);

      // Make the request
      const response = await fetch("/api/pdf/compress", {
        method: "POST",
        body: formData,
      });

      // Log the response status
      console.log('Response status:', response.status);

      // Check for error responses
      if (!response.ok) {
        let errorMessage = "Failed to compress PDF";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If parsing JSON fails, use the status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Verify response type
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/pdf")) {
        console.error('Invalid content type:', contentType);
        throw new Error("Server returned invalid file format");
      }

      // Process the response
      console.log('Processing response...');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('File download initiated');

    } catch (err) {
      console.error("Compression error:", err);
      setError(err instanceof Error ? err.message : "Failed to compress PDF");
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
              <Select value={compressionLevel} onValueChange={(value: CompressionLevel) => setCompressionLevel(value)}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select compression level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Quality (Minimal Compression)</SelectItem>
                  <SelectItem value="medium">Medium Quality (Balanced)</SelectItem>
                  <SelectItem value="low">Low Quality (Maximum Compression)</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={handleCompression}
                disabled={isProcessing || !file}
              >
                {isProcessing ? "Compressing..." : "Compress PDF"}
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