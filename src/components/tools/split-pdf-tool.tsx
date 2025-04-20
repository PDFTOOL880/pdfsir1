"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { DropZone } from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// Import PDF.js in a way that works with Next.js
const PDFjs = typeof window !== 'undefined'
  ? require('pdfjs-dist/legacy/build/pdf')
  : null;

if (typeof window !== 'undefined' && PDFjs) {
  PDFjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

interface PageThumbnail {
  pageNumber: number;
  selected: boolean;
  outputName: string;
}

export function SplitPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumbnail[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const pdfInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const renderThumbnail = useCallback(async (pageNumber: number, canvas: HTMLCanvasElement) => {
    if (!pdfInstanceRef.current || !canvas) return;

    try {
      const page = await pdfInstanceRef.current.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 0.3 });
      const context = canvas.getContext('2d');
      
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (error) {
      console.error(`Error rendering thumbnail for page ${pageNumber}:`, error);
    }
  }, []);

  const handleFileDrop = useCallback(async (files: File[]) => {
    if (!PDFjs || files.length === 0) return;
    
    const pdfFile = files[0];
    if (pdfFile.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setFile(pdfFile);
    const url = URL.createObjectURL(pdfFile);
    setPreviewUrl(url);
    setIsLoading(true);

    try {
      const pdf = await PDFjs.getDocument(url).promise;
      pdfInstanceRef.current = pdf;
      
      const numPages = pdf.numPages;
      const newPages: PageThumbnail[] = Array.from({ length: numPages }, (_, i) => ({
        pageNumber: i + 1,
        selected: true,
        outputName: `split_${i + 1}`
      }));
      setPages(newPages);
    } catch (error) {
      console.error("Error loading PDF:", error);
      alert("Error loading PDF file");
      setFile(null);
      setPreviewUrl("");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSplit = useCallback(async () => {
    if (!file || pages.length === 0) return;
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pages", JSON.stringify(pages.filter(p => p.selected)));

      const response = await fetch("/api/pdf/split", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Split failed");
      
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "split_pdfs.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Error splitting PDF file");
    } finally {
      setIsProcessing(false);
    }
  }, [file, pages]);

  const cleanup = useCallback(() => {
    if (pdfInstanceRef.current) {
      pdfInstanceRef.current.destroy();
      pdfInstanceRef.current = null;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPages([]);
    setPreviewUrl("");
  }, [previewUrl]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  if (!file) {
    return (
      <div className="space-y-6">
        <DropZone
          onFileSelect={handleFileDrop}
          accept={{
            'application/pdf': ['.pdf']
          }}
          maxFiles={1}
          maxSize={100 * 1024 * 1024} // 100MB
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {pages.map((page) => (
              <Card key={page.pageNumber} className="p-4 relative">
                <div className="aspect-[3/4] relative mb-2">
                  <canvas
                    className="w-full h-full object-contain"
                    ref={(canvas) => {
                      if (canvas) {
                        renderThumbnail(page.pageNumber, canvas);
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`page-${page.pageNumber}-name`}>
                    Output name:
                  </Label>
                  <input
                    type="text"
                    id={`page-${page.pageNumber}-name`}
                    value={page.outputName}
                    onChange={(e) => {
                      const newPages = [...pages];
                      newPages[page.pageNumber - 1].outputName = e.target.value;
                      setPages(newPages);
                    }}
                    className="w-full px-2 py-1 border rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setPages(pages.filter((p) => p.pageNumber !== page.pageNumber));
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={cleanup}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSplit}
              disabled={isProcessing || pages.length === 0}
            >
              {isProcessing ? "Processing..." : "Split PDF"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}