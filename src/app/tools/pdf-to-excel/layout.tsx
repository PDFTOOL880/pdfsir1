import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Convert PDF to Excel - PDF Tools",
  description: "Convert PDF files containing tables into formatted Excel spreadsheets easily.",
}

export default function PDFToExcelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}