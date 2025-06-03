"use client";

import { cn } from "@/lib/utils";
import { EnhancedUploadBox } from "./enhanced-upload-box";

interface ProcessingCardProps {
  title: string;
  onUpload: (file: File) => void;
  onConvert: () => void;
  acceptedFormats?: string[];
  fileTypeOptions?: string[];
  selectedFileType?: string;
  onFileTypeChange?: (type: string) => void;
  className?: string;
  description?: string;
}

const DEFAULT_DESCRIPTION = "Drag and drop your file here or click to browse";

export function ProcessingCard({
  title,
  onUpload,
  onConvert,
  acceptedFormats = [],
  fileTypeOptions,
  selectedFileType,
  onFileTypeChange,
  className,
  description = DEFAULT_DESCRIPTION
}: ProcessingCardProps) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto space-y-6", className)}>
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        {title}
      </h2>

      {/* Enhanced Upload Box */}
      <EnhancedUploadBox
        onUpload={onUpload}
        acceptedFormats={acceptedFormats}
        toolName={title}
        description={description}
      />

      {/* File Type Options */}
      {fileTypeOptions && fileTypeOptions.length > 0 && (
        <select
          value={selectedFileType}
          onChange={(e) => onFileTypeChange?.(e.target.value)}
          className="w-full max-w-[500px] mx-auto block rounded-xl 
                    border border-gray-200 p-3 text-gray-600
                    focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316]
                    outline-none transition-all"
        >
          {fileTypeOptions.map(type => (
            <option key={type} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
      )}

      {/* Convert Button */}
      <button
        onClick={onConvert}
        className="w-full max-w-[500px] mx-auto block bg-[#f97316]
                  hover:bg-[#f97316]/90 text-white font-semibold
                  py-3 px-6 rounded-xl transition-all shadow-sm
                  hover:shadow focus:ring-2 focus:ring-[#f97316]/20
                  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Convert Now
      </button>
    </div>
  );
}