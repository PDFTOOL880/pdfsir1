import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFileSelect: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
}

export function DropZone({
  onFileSelect,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 1,
  className,
}: DropZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      onFileSelect(acceptedFiles);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
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
        </div>
        <input {...getInputProps()} />
        <Button variant={error ? "destructive" : "default"} size="sm">
          Select File
        </Button>
      </div>
    </div>
  );
}