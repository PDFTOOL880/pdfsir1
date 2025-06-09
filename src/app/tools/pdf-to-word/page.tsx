import { Metadata } from "next"
import ToolProcessor from "@/app/tools/[tool]/tool-processor"

export const metadata: Metadata = {
  title: "Convert PDF to Word - Free Online PDF to DOCX Converter",
  description: "Convert PDF documents to editable Word files (DOCX) online. Free, fast and easy to use. Preserve formatting and layout.",
}

export default function PDFToWord() {
  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="text-center text-orange-500">
          <h1 className="text-3xl font-bold mb-1">
            Convert PDF to Word
          </h1>
          <p className="text-muted-foreground">
            .Transform your PDF documents into editable Word files while preserving all formatting
          </p>
        </div>

        <ToolProcessor 
          toolId="pdf-to-word"
          toolTitle=" PDF to Word Converter"
        />

        <div className="space-y-6 text-sm text-muted-foreground">
          <div>
            <h2 className="text-base font-medium text-foreground mb-2">
              About PDF to Word Conversion
            </h2>
            <p>
              Our PDF to Word converter transforms your PDF documents into fully editable Microsoft Word files. 
              The conversion process maintains the original formatting, including text, images, tables, and layout elements.
            </p>
          </div>

          <div>
            <h2 className="text-base font-medium text-foreground mb-2">
              How to Convert PDF to Word
            </h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>Upload your PDF file (up to 10MB)</li>
              <li>Select your preferred output format (DOCX or DOC)</li>
              <li>Click "Convert to Word" and wait for the conversion</li>
              <li>Download your converted Word document</li>
            </ol>
          </div>

          <div>
            <h2 className="text-base font-medium text-foreground mb-2">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>High-quality conversion with preserved formatting</li>
              <li>Support for text, images, tables, and layouts</li>
              <li>Fast processing with cloud-based conversion</li>
              <li>100% secure and private file handling</li>
              <li>Free to use with no registration required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}