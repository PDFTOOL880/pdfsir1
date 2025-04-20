"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { EnhancedDropZone } from "@/components/ui/enhanced-drop-zone";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileOutput, Loader2, Settings2 } from "lucide-react";

interface ToolProcessorProps {
  toolId: string;
  toolTitle: string;
}

interface ConversionSettings {
  format?: "docx" | "doc";
  quality: "high" | "medium" | "low";
  preserveFormatting?: boolean;
}

type AcceptType = Record<string, string[]>;

const PDF_ACCEPT: AcceptType = {
  "application/pdf": [".pdf"]
};

const WORD_ACCEPT: AcceptType = {
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
};

const EXCEL_ACCEPT: AcceptType = {
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
};

const WEBP_ACCEPT: AcceptType = {
  "image/webp": [".webp"]
};

export default function ToolProcessor({ toolId, toolTitle }: ToolProcessorProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings] = useState<ConversionSettings>({
    quality: "high",
    preserveFormatting: true
  });

  const handleFilesChange = (newFiles: File[]) => {
    setError(null);
    setFiles(newFiles);
  };

  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  const getFileType = () => {
    switch (toolId) {
      case "word-to-pdf":
        return "Word document";
      case "excel-to-pdf":
        return "Excel file";
      default:
        return "PDF file";
    }
  };

  const getApiEndpoint = () => {
    switch (toolId) {
      case "word-to-pdf":
        return "/api/pdf/word-to-pdf";
      case "excel-to-pdf":
        return "/api/pdf/excel-to-pdf";
      case "webp-to-jpg":
        return "/api/image/webp-to-jpg";
      default:
        return "/api/pdf/convert";
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError(`Please select a ${getFileType()} to convert`);
      return;
    }

    setConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("settings", JSON.stringify(settings));

      const response = await fetch(getApiEndpoint(), {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      console.log("Response content type:", contentType);

      // Handle error responses
      if (!response.ok) {
        let errorMessage = "Conversion failed";
        
        try {
          if (contentType?.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.details || errorData.error || errorMessage;
          } else {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          }
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        
        throw new Error(errorMessage);
      }

      // Handle JSON responses (usually errors)
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        throw new Error(data.error || "Unexpected response format");
      }

      // Get original filename and new extension
      const originalName = files[0].name;
      const newExtension = toolId === "webp-to-jpg" ? ".jpg" :
                         toolId.endsWith("-to-pdf") ? ".pdf" :
                         `.${settings.format || 'docx'}`;
      const newFileName = originalName.replace(/\.[^/.]+$/, newExtension);

      // Download the converted file
      const blob = await response.blob();
      downloadBlob(blob, newFileName);

    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to convert the file. Please try again."
      );
    } finally {
      setConverting(false);
    }
  };

  if (!["pdf-to-word", "word-to-pdf", "excel-to-pdf", "webp-to-jpg"].includes(toolId)) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">
          Tool "{toolId}" not found or is currently under development.
        </p>
      </Card>
    );
  }

  const getToolDescription = () => {
    switch (toolId) {
      case "pdf-to-word":
        return "Transform your PDF documents into editable Word files while preserving formatting";
      case "word-to-pdf":
        return "Convert Word documents to PDF format with high-quality results";
      case "excel-to-pdf":
        return "Transform Excel spreadsheets into professional PDF documents";
      case "webp-to-jpg":
        return "Convert WEBP images to JPG format while maintaining image quality";
      default:
        return "";
    }
  };

  const getAcceptedTypes = () => {
    switch (toolId) {
      case "pdf-to-word":
        return PDF_ACCEPT;
      case "word-to-pdf":
        return WORD_ACCEPT;
      case "excel-to-pdf":
        return EXCEL_ACCEPT;
      case "webp-to-jpg":
        return WEBP_ACCEPT;
      default:
        return {};
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{toolTitle}</h2>
          <p className="text-muted-foreground">
            {getToolDescription()}
          </p>
        </div>

        <EnhancedDropZone
          files={files}
          onFilesChange={handleFilesChange}
          accept={getAcceptedTypes()}
          maxSize={10 * 1024 * 1024} // 10MB
          maxFiles={1}
        />

        {error && (
          <div className="flex items-start gap-2 text-destructive mt-4 bg-destructive/10 p-3 rounded-md">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm whitespace-pre-wrap break-words">{error}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Settings2 className="h-4 w-4" />
            <span className="text-sm">
              Quality: {settings.quality}
              {toolId === "pdf-to-word" && settings.format && ` | Format: ${settings.format.toUpperCase()}`}
            </span>
          </div>

          <Button
            onClick={handleConvert}
            disabled={files.length === 0 || converting}
            className="w-full sm:w-auto"
          >
            {converting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <FileOutput className="mr-2 h-4 w-4" />
                Convert to {toolId === "webp-to-jpg" ? "JPG" :
                          toolId.endsWith("-to-pdf") ? "PDF" : "Word"}
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}