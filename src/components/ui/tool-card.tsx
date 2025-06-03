"use client";

import { Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ToolIcon } from "./tool-icon";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

const getToolColors = (tool: Tool) => {
  const id = tool.id.toLowerCase();
  
  if (id.includes('word')) return { bg: 'bg-blue-50', text: 'text-blue-600' };
  if (id.includes('excel')) return { bg: 'bg-green-50', text: 'text-green-600' };
  if (id.includes('pptx')) return { bg: 'bg-orange-50', text: 'text-orange-600' };
  if (id.includes('jpg') || id.includes('png') || id.includes('webp')) {
    return { bg: 'bg-purple-50', text: 'text-purple-600' };
  }
  if (id.includes('sign') || id.includes('fill')) {
    return { bg: 'bg-gray-50', text: 'text-gray-600' };
  }
  // Default red for general PDF tools
  return { bg: 'bg-red-50', text: 'text-red-600' };
};

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className={cn(
        "rounded-2xl p-6 cursor-pointer",
        "shadow-sm transition-all duration-200 ease-in-out",
        "hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5",
        "flex flex-col items-center justify-center text-center gap-3",
        `${getToolColors(tool).bg} bg-gradient-to-br from-white/80`,
        className
      )}
    >
      {/* Icon */}
      <div className={cn(
        "text-4xl",
        getToolColors(tool).text
      )}>
        <ToolIcon name={tool.iconName} />
      </div>

      {/* Title */}
      <div className="text-sm font-medium">
        {tool.title}
      </div>
    </Link>
  );
}