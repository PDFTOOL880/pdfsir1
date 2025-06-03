"use client";

import { FileUp, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EnhancedUploadBoxProps {
  onUpload?: (file: File) => void;
  acceptedFormats?: string[];
  toolName: string;
  description: string;
  icon?: React.ElementType;
  className?: string;
}

interface FilePreview {
  file: File;
  preview: string | null;
}

export function EnhancedUploadBox({
  onUpload,
  acceptedFormats,
  toolName,
  description,
  icon: Icon = FileUp,
  className
}: EnhancedUploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup function for object URLs
  useEffect(() => {
    return () => {
      if (selectedFile?.preview) {
        URL.revokeObjectURL(selectedFile.preview);
      }
    };
  }, [selectedFile]);

  const handleFile = (file: File) => {
    // Create preview URL for images
    const isImage = file.type.startsWith('image/');
    const preview = isImage ? URL.createObjectURL(file) : null;
    
    // Clean up previous preview URL
    if (selectedFile?.preview) {
      URL.revokeObjectURL(selectedFile.preview);
    }

    setSelectedFile({ file, preview });
    onUpload?.(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    if (selectedFile?.preview) {
      URL.revokeObjectURL(selectedFile.preview);
    }
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Upload Area */}
      <div 
        className={cn(
          "w-full h-[240px] max-w-[500px] mx-auto",
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "h-full w-full p-8",
            "flex flex-col items-center justify-center",
            "rounded-2xl border-2 border-dashed",
            "bg-[#fff7f0] cursor-pointer",
            isDragging ? "border-[#f97316]" : "border-gray-200",
            "hover:border-[#f97316]",
            "focus:outline-none focus:ring-2 focus:ring-[#f97316]/20",
            "transition-all duration-200"
          )}
          aria-label="Click to upload or drag and drop a file"
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedFormats?.join(',')}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            aria-hidden="true"
          />

          <Icon
            className={cn(
              "w-8 h-8 mb-4",
              isDragging ? "text-[#f97316]" : "text-[#f97316]"
            )}
          />

          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {toolName}
            </h3>
            <p className="text-sm text-gray-600">
              {description}
            </p>
            {acceptedFormats && acceptedFormats.length > 0 && (
              <p className="text-xs text-gray-500 mt-4">
                Supported formats: {acceptedFormats.map(format =>
                  format.replace(/^\./, '').toUpperCase()
                ).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* File Preview */}
      {selectedFile && (
        <div className="w-full max-w-[500px] mx-auto p-4 bg-white rounded-lg border border-gray-200 relative">
          <button
            onClick={clearFile}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
            aria-label="Remove file"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
          
          <div className="flex items-start space-x-4">
            {selectedFile.preview ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={selectedFile.preview}
                  alt="File preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-50 flex items-center justify-center">
                <FileUp className="w-8 h-8 text-gray-400" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}