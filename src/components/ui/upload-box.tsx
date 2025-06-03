"use client";

import { FileUp } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onUpload?: (files: FileList) => void;
  acceptedFormats?: string[];
  multiple?: boolean;
  toolName: string;
  description: string;
  icon?: React.ElementType;
  className?: string;
}

export function UploadBox({
  onUpload,
  acceptedFormats,
  multiple = false,
  toolName,
  description,
  icon: Icon = FileUp,
  className
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onUpload?.(e.dataTransfer.files);
    }
  };

  return (
    <div 
      className={cn(
        // Container
        "w-full h-[240px] max-w-[500px] mx-auto",
        className
      )}
    >
      {/* Upload Area */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          // Base styles
          "h-full w-full p-8",
          "flex flex-col items-center justify-center",
          "rounded-2xl border-2 border-dashed",
          "bg-[#fff7f0] cursor-pointer",
          // Border colors
          isDragging ? "border-[#f97316]" : "border-gray-200",
          // Hover & Focus states
          "hover:border-[#f97316]",
          "focus:outline-none focus:ring-2 focus:ring-[#f97316]/20",
          // Transition
          "transition-all duration-200"
        )}
        aria-label={`Click to upload or drag and drop ${multiple ? 'files' : 'a file'}`}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={acceptedFormats?.join(',')}
          onChange={(e) => e.target.files && onUpload?.(e.target.files)}
          aria-hidden="true"
        />

        {/* Icon */}
        <Icon
          className={cn(
            "w-8 h-8 mb-4",
            isDragging ? "text-[#f97316]" : "text-[#f97316]"
          )}
        />

        {/* Text Content */}
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
  );
}