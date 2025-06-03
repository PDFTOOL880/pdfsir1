"use client";

import { useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { ProcessingCard } from "../../../components/ui/processing-card"

interface ToolProcessorProps {
  toolId: string
  toolTitle: string
}

interface ConversionSettings {
  format?: "docx" | "doc"
  quality: "high" | "medium" | "low"
  preserveFormatting?: boolean
}

const PDF_ACCEPT = ['.pdf']
const WORD_ACCEPT = ['.doc', '.docx']

export default function ToolProcessor({ toolId, toolTitle }: ToolProcessorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<ConversionSettings>({
    format: "docx",
    quality: "high",
    preserveFormatting: true
  })

  const handleFileChange = (newFile: File) => {
    setError(null)
    setFile(newFile)
  }

  const handleSettingsChange = <T extends ConversionSettings[keyof ConversionSettings]>(
    key: keyof ConversionSettings,
    value: T
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const getFileType = () => {
    switch (toolId) {
      case "pdf-to-word":
        return "PDF file"
      case "word-to-pdf":
        return "Word document"
      case "excel-to-pdf":
        return "Excel file"
      case "webp-to-jpg":
        return "WebP image"
      default:
        return "file"
    }
  }

  const handleConvert = async () => {
    if (!file) {
      setError(`Please select a ${getFileType()} to convert`)
      return
    }

    setConverting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("settings", JSON.stringify(settings))

      const response = await fetch("/api/pdf/convert", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          throw new Error("Failed to convert file")
        }
        throw new Error(errorData.error || errorData.details || "Failed to convert file")
      }

      // Get conversion result with URL and filename
      const result = await response.json()
      
      // Download the file directly from ConvertAPI URL
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = result.url
      a.download = result.filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

    } catch (err) {
      console.error("Conversion error:", err)
      setError(err instanceof Error ? err.message : "Failed to convert file")
    } finally {
      setConverting(false)
    }
  }

  const getToolConfig = () => {
    switch (toolId) {
      case "pdf-to-word":
        return {
          formats: PDF_ACCEPT,
          description: "Upload your PDF file to convert to Word format",
          fileTypes: ["docx", "doc"]
        }
      case "word-to-pdf":
        return {
          formats: WORD_ACCEPT,
          description: "Upload your Word document to convert to PDF",
          fileTypes: ["pdf"]
        }
      default:
        return {
          formats: [],
          description: "Upload your file to convert",
          fileTypes: []
        }
    }
  }

  const toolConfig = getToolConfig()

  return (
    <div className="space-y-6">
      <ProcessingCard
        title={toolTitle}
        onUpload={handleFileChange}
        onConvert={handleConvert}
        acceptedFormats={toolConfig.formats}
        fileTypeOptions={toolConfig.fileTypes}
        description={toolConfig.description}
        selectedFileType={settings.format}
        onFileTypeChange={(type: string) => handleSettingsChange("format", type as ConversionSettings["format"])}
        className="mx-auto"
      />

      {error && (
        <div className="flex items-start gap-2 text-destructive mt-4 bg-destructive/10 p-3 rounded-md max-w-md mx-auto">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {converting && (
        <div className="flex items-center justify-center gap-2 text-[#FF6A00]">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Converting...</span>
        </div>
      )}
    </div>
  )
}