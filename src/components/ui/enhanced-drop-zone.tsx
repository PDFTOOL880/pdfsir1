"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "./button";
import { FileList } from "./file-list";
import { cn } from "@/lib/utils";

export interface EnhancedDropZoneProps {
  onFilesChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
  files: File[];
  onFileAccepted?: (file: File) => void;
}

export function EnhancedDropZone({
  onFilesChange,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 1,
  className,
  files,
  onFileAccepted,
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
          "flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors",
          isDragActive && "border-primary bg-primary/5",
          error && "border-destructive",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className={cn("h-8 w-8", error ? "text-destructive" : "text-muted-foreground")} />
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm">{error || "Drag & drop or click to upload"}</p>
            <p className="text-xs text-muted-foreground">
              Maximum file size: {maxSize / 1024 / 1024}MB
            </p>
            {maxFiles > 1 && (
              <p className="text-xs text-muted-foreground">
                {files.length} of {maxFiles} files selected
              </p>
            )}
          </div>
          <input {...getInputProps()} />
          <Button variant={error ? "destructive" : "default"} size="sm">
            Select File{maxFiles > 1 ? "s" : ""}
          </Button>
        </div>
      </div>
      <FileList files={files} onRemove={handleRemoveFile} />
    </div>
  );
}