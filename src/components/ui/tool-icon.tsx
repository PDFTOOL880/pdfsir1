import { 
  FileText, 
  File, 
  Download, 
  Upload, 
  Plus, 
  Edit, 
  Search,
  type LucideIcon 
} from "lucide-react";

export type IconName = 
  | "file-text"
  | "file"
  | "download"
  | "upload"
  | "plus"
  | "edit"
  | "search";

const iconMap: Record<IconName, LucideIcon> = {
  "file-text": FileText,
  "file": File,
  "download": Download,
  "upload": Upload,
  "plus": Plus,
  "edit": Edit,
  "search": Search
};

interface ToolIconProps {
  name: IconName;
  className?: string;
}

export function ToolIcon({ name, className }: ToolIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}