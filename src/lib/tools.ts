import { IconName } from "@/components/ui/tool-icon";

export interface Tool {
  id: string;
  title: string;
  description: string;
  iconName: IconName;
  href: string;
  category: 'documents' | 'images' | 'pdf';
}

// Document conversion tools
const documentTools: Tool[] = [
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF files to editable Word documents",
    iconName: "file-text",
    href: "/tools/pdf-to-word",
    category: 'documents'
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    iconName: "file",
    href: "/tools/word-to-pdf",
    category: 'documents'
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Convert PDF tables to Excel spreadsheets",
    iconName: "file-text",
    href: "/tools/pdf-to-excel",
    category: 'documents'
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format",
    iconName: "file",
    href: "/tools/excel-to-pdf",
    category: 'documents'
  },
  {
    id: "pdf-to-pptx",
    title: "PDF to PPTX",
    description: "Convert PDF to PowerPoint presentations",
    iconName: "file-text",
    href: "/tools/pdf-to-pptx",
    category: 'documents'
  },
  {
    id: "pptx-to-pdf",
    title: "PPTX to PDF",
    description: "Convert PowerPoint presentations to PDF",
    iconName: "file",
    href: "/tools/pptx-to-pdf",
    category: 'documents'
  }
];

// Image tools
const imageTools: Tool[] = [
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    iconName: "download",
    href: "/tools/pdf-to-jpg",
    category: 'images'
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF format",
    iconName: "upload",
    href: "/tools/jpg-to-pdf",
    category: 'images'
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images to PDF format",
    iconName: "upload",
    href: "/tools/png-to-pdf",
    category: 'images'
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description: "Convert PDF pages to PNG images",
    iconName: "download",
    href: "/tools/pdf-to-png",
    category: 'images'
  },
  {
    id: "webp-to-jpg",
    title: "WEBP to JPG",
    description: "Convert WEBP images to JPG format",
    iconName: "download",
    href: "/tools/webp-to-jpg",
    category: 'images'
  },
  {
    id: "merge-images-to-pdf",
    title: "Merge Images to PDF",
    description: "Combine multiple images into one PDF",
    iconName: "plus",
    href: "/tools/merge-images-to-pdf",
    category: 'images'
  }
];

// PDF editing tools
const pdfTools: Tool[] = [
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one",
    iconName: "plus",
    href: "/tools/merge-pdf",
    category: 'pdf'
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Split PDF into multiple documents",
    iconName: "edit",
    href: "/tools/split-pdf",
    category: 'pdf'
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    iconName: "file",
    href: "/tools/compress-pdf",
    category: 'pdf'
  },
  {
    id: "ocr-pdf",
    title: "OCR PDF",
    description: "Make scanned PDFs searchable with OCR",
    iconName: "search",
    href: "/tools/ocr-pdf",
    category: 'pdf'
  },
  {
    id: "fill-pdf",
    title: "Fill PDF",
    description: "Fill and sign PDF forms easily",
    iconName: "edit",
    href: "/tools/fill-pdf",
    category: 'pdf'
  },
  {
    id: "sign-pdf",
    title: "Sign PDF",
    description: "Add digital signatures to PDF documents",
    iconName: "edit",
    href: "/tools/sign-pdf",
    category: 'pdf'
  },
  {
    id: "translate-pdf",
    title: "Translate PDF",
    description: "Translate PDF documents to other languages",
    iconName: "file-text",
    href: "/tools/translate-pdf",
    category: 'pdf'
  }
];

export const tools: Tool[] = [
  ...documentTools,
  ...imageTools,
  ...pdfTools
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.id === slug);
}

export function getToolsByCategory(category: Tool['category']): Tool[] {
  return tools.filter(tool => tool.category === category);
}