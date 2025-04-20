"use client";

import { useState } from "react";
import { EnhancedDropZone } from "@/components/ui/enhanced-drop-zone";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch("/api/pdf/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || errorData?.details || "Failed to merge PDFs"
        );
      }

      // Check if the response is empty
      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("Received empty response from server");
      }
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Clear files after successful merge
      setFiles([]);

    } catch (err) {
      console.error("Merge error:", err);
      setError(err instanceof Error ? err.message : "Failed to merge PDFs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <EnhancedDropZone
        files={files}
        onFilesChange={setFiles}
        accept={{
          "application/pdf": [".pdf"],
        }}
        maxSize={20 * 1024 * 1024} // 20MB
        maxFiles={10}
        className={cn(
          "border-muted-foreground/20",
          error && "border-destructive"
        )}
      />

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleMerge}
          disabled={isLoading || files.length < 2}
          className="min-w-[200px]"
        >
          {isLoading ? "Merging..." : "Merge PDFs"}
        </Button>
      </div>
    </div>
  );
}