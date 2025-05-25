"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload, CloudIcon, File, FileText, Image } from "lucide-react";
import { Button } from "./button";
import { FileList } from "./file-list";
import { cn } from "@/lib/utils";

// Add keyframe animations
const styles = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); opacity: 0.8; }
  70% { transform: scale(0.9); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const CloudProviders = () => (
  <div className="flex gap-4 mt-2">
    <button
      className="group relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Upload from Google Drive"
    >
      <CloudIcon className="h-5 w-5 text-blue-500 transform group-hover:scale-110 transition-transform duration-200" />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Google Drive
      </span>
    </button>
    <button
      className="group relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Upload from Dropbox"
    >
      <svg className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="#0061FE">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12 6.63 0 12-5.37 12-12C24 5.37 18.63 0 12 0zm0 22.5C6.21 22.5 1.5 17.79 1.5 12S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5zm-1-11.25L7.5 7.5l-1.5 1.5L10.5 12 6 16.5l1.5 1.5L12 13.5l4.5 4.5 1.5-1.5L13.5 12l4.5-4.5-1.5-1.5L12 10.5z"/>
      </svg>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Dropbox
      </span>
    </button>
    <button
      className="group relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Upload from OneDrive"
    >
      <svg className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="#0078D4">
        <path d="M11.5 8.9L6.4 2.3C6.3 2.1 6.1 2 5.9 2H2.1C1.8 2 1.6 2.2 1.6 2.5c0 0.1 0 0.2 0.1 0.3l5.1 6.6c0.1 0.2 0.3 0.2 0.5 0.2h3.8c0.3 0 0.5-0.2 0.5-0.5 0-0.1 0-0.1-0.1-0.2zM20.9 2h-3.8c-0.2 0-0.4 0.1-0.5 0.3l-5.1 6.6c-0.1 0.1-0.1 0.2-0.1 0.3 0 0.3 0.2 0.5 0.5 0.5h3.8c0.2 0 0.4-0.1 0.5-0.2l5.1-6.6c0.1-0.1 0.1-0.2 0.1-0.3 0-0.3-0.2-0.5-0.5-0.5z"/>
      </svg>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        OneDrive
      </span>
    </button>
  </div>
);

const FileTypeIcon = ({ type }: { type: string }) => {
  if (type.includes('pdf')) return <File className="h-6 w-6 text-red-500" />;
  if (type.includes('word') || type.includes('doc')) return <FileText className="h-6 w-6 text-blue-500" />;
  if (type.includes('image')) return <Image className="h-6 w-6 text-green-500" />;
  return <File className="h-6 w-6 text-gray-500" />;
};

export interface EnhancedDropZoneProps {
  onFilesChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
  files: File[];
  onFileAccepted?: (file: File) => void;
  isLoading?: boolean;
}

export function EnhancedDropZone({
  onFilesChange,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 1,
  className,
  files,
  onFileAccepted,
  isLoading = false,
}: EnhancedDropZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const newFiles = [...files, ...acceptedFiles];
      if (newFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} file${maxFiles === 1 ? "" : "s"} allowed`);
        return;
      }
      onFilesChange(newFiles);
      
      // Call onFileAccepted for each accepted file
      if (onFileAccepted) {
        acceptedFiles.forEach(onFileAccepted);
      }
    },
    [files, maxFiles, onFilesChange, onFileAccepted]
  );

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
    onDropRejected: (fileRejections: FileRejection[]) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize / 1024 / 1024}MB`);
      } else if (error?.code === "file-invalid-type") {
        setError("Invalid file type");
      } else if (error?.code === "too-many-files") {
        setError(`Maximum ${maxFiles} file${maxFiles === 1 ? "" : "s"} allowed`);
      } else {
        setError("Error uploading file");
      }
    },
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all",
          "bg-gradient-to-b from-white to-gray-50 shadow-[0_0_15px_rgba(0,0,0,0.1)]",
          "hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-primary/50",
          "dark:from-gray-900 dark:to-gray-950 dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
          isDragActive && "border-primary bg-primary/5 shadow-[0_0_25px_rgba(0,0,0,0.2)]",
          error && "border-destructive",
          "sm:min-h-[250px] md:min-h-[300px]",
          className
        )}
      >
        <div className="flex flex-col items-center gap-4 px-4">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className={cn(
              "transition-transform duration-300",
              isDragActive && "scale-110 rotate-3"
            )}>
              <FileTypeIcon type={Object.keys(accept || {})[0] || ''} />
            </div>
            <Upload
              className={cn(
                "h-6 w-6 transition-all duration-300",
                error ? "text-destructive" : "text-muted-foreground",
                isDragActive && "scale-110 -rotate-3"
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            {error ? (
              <div className="flex items-center gap-2 text-destructive animate-bounce-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-base font-medium">{error}</p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center gap-2 animate-fade-in">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-base font-medium">Processing your file...</p>
              </div>
            ) : (
              <>
                <p className="text-base font-medium">Drag & drop your files here</p>
                <p className="text-sm text-muted-foreground">
                  or use the options below
                </p>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {maxSize / 1024 / 1024}MB
                </p>
                {maxFiles > 1 && (
                  <p className="text-xs text-muted-foreground">
                    {files.length} of {maxFiles} files selected
                  </p>
                )}
              </>
            )}
          </div>
          <input {...getInputProps()} />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              variant={error ? "destructive" : "default"}
              size="sm"
              className={cn(
                "min-w-[120px] transition-all duration-200",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </span>
              ) : (
                `Select File${maxFiles > 1 ? "s" : ""}`
              )}
            </Button>
            <div className="h-px w-full bg-gray-200 sm:h-4 sm:w-px dark:bg-gray-800" />
            <CloudProviders />
          </div>
        </div>
      </div>
      <FileList files={files} onRemove={handleRemoveFile} />
    </div>
  );
}