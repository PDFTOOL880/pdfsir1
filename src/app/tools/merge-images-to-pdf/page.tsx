"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedDropZone } from "@/components/ui/enhanced-drop-zone";
import { GripVertical } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
};

export default function MergeImagesToPDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesChange = (newFiles: File[]) => {
    setError(null);

    // Validate each file
    const invalidFiles = newFiles.filter(file => {
      // Check type
      if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
        return true;
      }
      // Check size
      if (file.size > MAX_FILE_SIZE) {
        return true;
      }
      return false;
    });

    if (invalidFiles.length > 0) {
      setError("All files must be images (JPG, PNG, or WEBP) and under 10MB each");
      return;
    }

    // Replace existing files instead of adding to them
    setFiles(newFiles);
  };

  const handleConversion = async () => {
    if (!files.length) return;

    try {
      setIsConverting(true);
      setError(null);

      const formData = new FormData();
      files.forEach((file, index) => {
        // Clean the file name to avoid issues
        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        const cleanName = `image${index + 1}.${extension}`;
        formData.append(`file${index}`, file, cleanName);
      });

      console.log('Starting conversion request...');
      const response = await fetch("/api/image/merge-images-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Conversion failed:', errorData);
        throw new Error(errorData.details || errorData.error || "Conversion failed. Please try again.");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/pdf")) {
        throw new Error("Invalid response format");
      }

      console.log('Converting response to blob...');
      const blob = await response.blob();
      console.log('Creating download URL...');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = files.length === 1 
        ? files[0].name.replace(/\.[^/.]+$/, ".pdf") 
        : `merged-images-${new Date().getTime()}.pdf`;
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
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Merge Images to PDF</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Upload multiple images (JPG, PNG, WEBP) and combine them into a single PDF file.
            </p>
          </div>

          <div className="space-y-4">
            <EnhancedDropZone
              onFilesChange={handleFilesChange}
              accept={ACCEPTED_TYPES}
              maxSize={MAX_FILE_SIZE}
              files={files}
              maxFiles={20}
            />

            {files.length > 1 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span>Drag files to reorder them in the PDF</span>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
              {error}
            </div>
          )}

          {files.length > 0 && (
            <Button
              onClick={handleConversion}
              disabled={isConverting}
              className="w-full"
            >
              {isConverting ? "Converting..." : `Merge ${files.length} ${files.length === 1 ? 'Image' : 'Images'} to PDF`}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}