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
  // In dark mode, use orange theme for all tools
  if (typeof window !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return {
      bg: 'bg-gradient-to-br from-orange-600 to-orange-700',
      text: 'text-white',
      glow: 'group-hover:shadow-orange-500/50'
    };
  }

  // Light mode - keep existing color scheme
  const id = tool.id.toLowerCase();
  
  if (id.includes('word')) return {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    glow: 'group-hover:shadow-blue-500/25'
  };
  if (id.includes('excel')) return {
    bg: 'bg-green-50',
    text: 'text-green-600',
    glow: 'group-hover:shadow-green-500/25'
  };
  if (id.includes('pptx')) return {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    glow: 'group-hover:shadow-orange-500/25'
  };
  if (id.includes('jpg') || id.includes('png') || id.includes('webp')) {
    return {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      glow: 'group-hover:shadow-purple-500/25'
    };
  }
  if (id.includes('sign') || id.includes('fill')) {
    return {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      glow: 'group-hover:shadow-gray-500/25'
    };
  }
  return {
    bg: 'bg-red-50',
    text: 'text-red-600',
    glow: 'group-hover:shadow-red-500/25'
  };
};

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className={cn(
        "group rounded-2xl p-6 cursor-pointer",
        "shadow-sm transition-all duration-300 ease-in-out",
        "hover:shadow-2xl hover:scale-105",
        "flex flex-col items-center justify-center text-center gap-3",
        getToolColors(tool).bg,
        "backdrop-blur-sm",
        getToolColors(tool).glow,
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
      <div className="text-sm font-semibold text-gray-800 dark:text-orange-100">
        {tool.title}
      </div>
    </Link>
  );
}