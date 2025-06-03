"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FileUp, X } from "lucide-react"
import { formatBytes, cn } from "@/lib/utils"

interface EnhancedDropZoneProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
  className?: string
}

export function EnhancedDropZone({
  files,
  onFilesChange,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 1,
  className
}: EnhancedDropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesChange(acceptedFiles)
    },
    [onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1
  })

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    onFilesChange(newFiles)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8",
          "flex flex-col items-center justify-center",
          "cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted hover:border-primary/50 hover:bg-accent",
          className
        )}
      >
        <input {...getInputProps()} />
        <FileUp className="h-8 w-8 mb-4 text-muted-foreground" />
        <div className="text-center space-y-2">
          <p className="text-sm">
            {isDragActive ? (
              <span className="text-primary font-medium">Drop your file here</span>
            ) : (
              <>
                <span className="font-medium">Click to upload</span> or drag and drop
              </>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum file size: {formatBytes(maxSize)}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-accent rounded-lg"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-background rounded transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}