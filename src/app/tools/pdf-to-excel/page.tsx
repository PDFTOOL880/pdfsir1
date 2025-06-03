"use client";

import { useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { EnhancedDropZone } from "@/components/ui/enhanced-drop-zone"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { QualitySchema, type Quality } from "@/lib/conversion-utils"
import type { CheckedState } from "@radix-ui/react-checkbox"

interface ErrorResponse {
  error: string;
  details: string;
}

export default function PDFToExcelPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState<Quality>("high");
  const [format, setFormat] = useState<"xlsx" | "xls">("xlsx");
  const [extractAllTables, setExtractAllTables] = useState(true);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleConversion = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    const toastId = toast.loading("Converting PDF to Excel...");

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("settings", JSON.stringify({
        quality,
        format,
        extractAllTables,
        preserveFormatting: true
      }));

      const response = await fetch("/api/pdf/pdf-to-excel", {
        method: "POST",
        body: formData
      });

      const contentType = response.headers.get("content-type");
      
      if (!response.ok) {
        // Try to parse error as JSON
        if (contentType?.includes("application/json")) {
          const errorData: ErrorResponse = await response.json();
          throw new Error(errorData.details || errorData.error);
        }
        // Fallback to text error
        const errorText = await response.text();
        throw new Error(errorText || "Conversion failed");
      }

      // If response is JSON, it means we got an error even with 200 status
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        if (data.error) {
          throw new Error(data.details || data.error);
        }
      }

      // Handle file download
      let blob;
      try {
        blob = await response.blob();
        if (blob.size === 0) {
          throw new Error("Received empty file");
        }
      } catch (e) {
        throw new Error("Failed to process the converted file");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = files[0].name.replace(".pdf", `.${format}`);
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Conversion completed successfully!", { id: toastId });
      setFiles([]); // Clear the file after successful conversion
    } catch (error) {
      console.error("Conversion error:", error);
      const errorMessage = error instanceof Error ? error.message : "Conversion failed";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mt-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <span role="img" aria-label="PDF to Excel">📄➡📊</span>
              Convert PDF to Excel
            </h1>
            <p className="text-muted-foreground">
              Convert PDF files containing tables into Excel spreadsheets easily.
            </p>
          </div>

          <div className="space-y-6">
            <EnhancedDropZone 
              files={files}
              onFilesChange={handleFilesChange}
              accept={{
                'application/pdf': ['.pdf']
              }}
              maxFiles={1}
              maxSize={10 * 1024 * 1024} // 10MB
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quality">Quality</Label>
                <Select 
                  value={quality} 
                  onValueChange={(value) => setQuality(value as Quality)}
                >
                  <SelectTrigger id="quality">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Select 
                  value={format} 
                  onValueChange={(value) => setFormat(value as "xlsx" | "xls")}
                >
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                    <SelectItem value="xls">XLS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="extractAllTables" 
                checked={extractAllTables} 
                onCheckedChange={(checked: CheckedState) => setExtractAllTables(checked as boolean)}
              />
              <Label htmlFor="extractAllTables">Extract all tables from document</Label>
            </div>

            <div className="mt-6 text-center">
              <Button 
                size="lg"
                className="w-full max-w-sm"
                disabled={files.length === 0 || isConverting}
                onClick={handleConversion}
              >
                {isConverting ? "Converting..." : "Start Conversion"}
              </Button>
            </div>

            <div className="mt-8 text-sm text-muted-foreground text-center">
              <p>Maximum file size: 10MB. Supported format: PDF</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  )
}