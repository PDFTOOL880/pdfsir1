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

interface ToolIconProps {
  name: IconName;
  className?: string;
}

export function ToolIcon({ name, className = "w-24 h-24 mx-auto" }: ToolIconProps) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={name}
      className={className}
      onError={(e) => {
        e.currentTarget.src = '/icons/default.svg';
      }}
    />
  );
}