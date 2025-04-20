import { Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IconName, ToolIcon } from "./tool-icon";

// Brand colors for different file types
const brandColors = {
  'word': {
    bg: 'from-blue-500/10 to-blue-600/20',
    glow: 'shadow-blue-500/20',
    icon: 'text-blue-500',
    hover: 'hover:border-blue-500/50'
  },
  'excel': {
    bg: 'from-green-500/10 to-green-600/20',
    glow: 'shadow-green-500/20',
    icon: 'text-green-500',
    hover: 'hover:border-green-500/50'
  },
  'pdf': {
    bg: 'from-red-500/10 to-red-600/20',
    glow: 'shadow-red-500/20',
    icon: 'text-red-500',
    hover: 'hover:border-red-500/50'
  },
  'image': {
    bg: 'from-purple-500/10 to-purple-600/20',
    glow: 'shadow-purple-500/20',
    icon: 'text-purple-500',
    hover: 'hover:border-purple-500/50'
  }
};

interface ToolCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tool?: Tool;
  // Allow individual props as an alternative to passing the full tool object
  title?: string;
  description?: string;
  iconName?: IconName;
  href?: string;
}

export function ToolCard({ 
  tool,
  title: titleProp,
  description: descriptionProp,
  iconName: iconNameProp,
  href: hrefProp,
  className, 
  ...props 
}: ToolCardProps) {
  // Use either individual props or tool object properties
  const title = titleProp || tool?.title;
  const description = descriptionProp || tool?.description;
  const iconName = iconNameProp || tool?.iconName;
  const href = hrefProp || tool?.href;
  const id = tool?.id || title?.toLowerCase().replace(/\s+/g, '-');

  // Determine the brand color theme based on tool type
  const getTheme = () => {
    if (id?.includes('word')) return brandColors.word;
    if (id?.includes('excel')) return brandColors.excel;
    if (id?.includes('jpg') || id?.includes('png')) return brandColors.image;
    return brandColors.pdf;
  };

  const theme = getTheme();

  if (!title || !description || !iconName || !href) {
    return null;
  }

  return (
    <Link href={href}>
      <div
        className={cn(
          // Base card styles
          "relative group rounded-2xl p-6",
          "bg-gradient-to-br",
          theme.bg,
          "border border-white/5",
          theme.hover,
          // 3D effect and hover animation
          "transform transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-xl",
          className
        )}
        {...props}
      >
        {/* Icon container with glow effect */}
        <div className={cn(
          "mb-6 w-14 h-14",
          "rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-white/5 to-white/10",
          "shadow-lg", theme.glow,
          "transform transition-transform duration-300",
          "group-hover:scale-110"
        )}>
          <ToolIcon name={iconName} className={cn("w-6 h-6", theme.icon)} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-2 text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {description}
        </p>

        {/* Try Now button */}
        <div className="flex items-center text-sm font-medium text-white/80">
          Try Now
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}