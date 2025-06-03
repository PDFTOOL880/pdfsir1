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
    iconName: "pdf-to-word",
    href: "/tools/pdf-to-word",
    category: 'documents'
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    iconName: "word-to-pdf",
    href: "/tools/word-to-pdf",
    category: 'documents'
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Convert PDF tables to Excel spreadsheets",
    iconName: "pdf-to-excel",
    href: "/tools/pdf-to-excel",
    category: 'documents'
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format",
    iconName: "excel-to-pdf",
    href: "/tools/excel-to-pdf",
    category: 'documents'
  },
  {
    id: "pdf-to-pptx",
    title: "PDF to PPTX",
    description: "Convert PDF to PowerPoint presentations",
    iconName: "pdf-to-pptx",
    href: "/tools/pdf-to-pptx",
    category: 'documents'
  },
  {
    id: "pptx-to-pdf",
    title: "PPTX to PDF",
    description: "Convert PowerPoint presentations to PDF",
    iconName: "pptx-to-pdf",
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
    iconName: "pdf-to-jpg",
    href: "/tools/pdf-to-jpg",
    category: 'images'
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF format",
    iconName: "jpg-to-pdf",
    href: "/tools/jpg-to-pdf",
    category: 'images'
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images to PDF format",
    iconName: "png-to-pdf",
    href: "/tools/png-to-pdf",
    category: 'images'
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description: "Convert PDF pages to PNG images",
    iconName: "pdf-to-png",
    href: "/tools/pdf-to-png",
    category: 'images'
  },
  {
    id: "webp-to-jpg",
    title: "WEBP to JPG",
    description: "Convert WEBP images to JPG format",
    iconName: "webp-to-jpg",
    href: "/tools/webp-to-jpg",
    category: 'images'
  },
  {
    id: "merge-images-to-pdf",
    title: "Merge Images to PDF",
    description: "Combine multiple images into one PDF",
    iconName: "merge-images-to-pdf",
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
    iconName: "merge-pdf",
    href: "/tools/merge-pdf",
    category: 'pdf'
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Split PDF into multiple documents",
    iconName: "split-pdf",
    href: "/tools/split-pdf",
    category: 'pdf'
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    iconName: "compress-pdf",
    href: "/tools/compress-pdf",
    category: 'pdf'
  },
  {
    id: "ocr-pdf",
    title: "OCR PDF",
    description: "Make scanned PDFs searchable with OCR",
    iconName: "ocr-pdf",
    href: "/tools/ocr-pdf",
    category: 'pdf'
  },
  {
    id: "fill-pdf",
    title: "Fill PDF",
    description: "Fill and sign PDF forms easily",
    iconName: "fill-pdf",
    href: "/tools/fill-pdf",
    category: 'pdf'
  },
  {
    id: "sign-pdf",
    title: "Sign PDF",
    description: "Add digital signatures to PDF documents",
    iconName: "sign-pdf",
    href: "/tools/sign-pdf",
    category: 'pdf'
  },
  {
    id: "translate-pdf",
    title: "Translate PDF",
    description: "Translate PDF documents to other languages",
    iconName: "translate-pdf",
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