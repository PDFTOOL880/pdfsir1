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
        "flex h-32 w-full cursor-pointer rounded-lg",
        "border-2 border-dashed border-orange-200",
        "bg-orange-50 shadow-sm hover:shadow-md",
        "transition-all duration-300",
        isDragActive && "border-orange-300 bg-orange-100",
        error && "border-destructive bg-red-50",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <Upload
          className={cn(
            "w-10 h-10 transition-transform",
            error ? "text-destructive" : "text-orange-400 hover:scale-105",
          )}
        />
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <span className="font-bold">Click to upload</span>
            <span className="text-gray-600">or drag and drop</span>
          </div>
          <p className="text-sm text-gray-400">
            Maximum file size: {maxSize / 1024 / 1024}MB
          </p>
        </div>
        <input {...getInputProps()} />
        <Button
          variant={error ? "destructive" : "outline"}
          size="sm"
          className={cn(
            "mt-2",
            !error && "text-orange-600 hover:text-orange-700 border-orange-200 hover:bg-orange-50"
          )}
        >
          Select File
        </Button>
      </div>
    </div>
  );
}