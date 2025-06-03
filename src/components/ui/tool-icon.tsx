import {
  FileText,
  File,
  FileType,
  FileImage,
  Table2,
  Presentation,
  ImageIcon,
  Files,
  Scissors,
  Minimize2,
  ScanLine,
  PenSquare,
  Languages,
  type LucideIcon
} from "lucide-react";

export type IconName =
  // Document Tools
  | "pdf-to-word"
  | "word-to-pdf"
  | "pdf-to-excel"
  | "excel-to-pdf"
  | "pdf-to-pptx"
  | "pptx-to-pdf"
  // Image Tools
  | "pdf-to-jpg"
  | "jpg-to-pdf"
  | "png-to-pdf"
  | "pdf-to-png"
  | "webp-to-jpg"
  | "merge-images-to-pdf"
  // PDF Tools
  | "merge-pdf"
  | "split-pdf"
  | "compress-pdf"
  | "ocr-pdf"
  | "fill-pdf"
  | "sign-pdf"
  | "translate-pdf";

const iconMap: Record<IconName, LucideIcon> = {
  // Document conversion tools
  "pdf-to-word": FileText,
  "word-to-pdf": File,
  "pdf-to-excel": Table2,
  "excel-to-pdf": File,
  "pdf-to-pptx": Presentation,
  "pptx-to-pdf": File,

  // Image tools
  "pdf-to-jpg": FileImage,
  "jpg-to-pdf": FileType,
  "png-to-pdf": FileType,
  "pdf-to-png": FileImage,
  "webp-to-jpg": ImageIcon,
  "merge-images-to-pdf": Files,

  // PDF editing tools
  "merge-pdf": Files,
  "split-pdf": Scissors,
  "compress-pdf": Minimize2,
  "ocr-pdf": ScanLine,
  "fill-pdf": FileText,
  "sign-pdf": PenSquare,
  "translate-pdf": Languages
};

interface ToolIconProps {
  name: IconName;
  className?: string;
}

export function ToolIcon({ name, className }: ToolIconProps) {
  const Icon = iconMap[name];
  return Icon ? <Icon className={className} /> : null;
}