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
  
  if (id.includes('word')) return {
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    text: 'text-blue-600 dark:text-blue-400',
    glow: 'group-hover:shadow-blue-500/25'
  };
  if (id.includes('excel')) return {
    bg: 'bg-green-50 dark:bg-green-950/50',
    text: 'text-green-600 dark:text-green-400',
    glow: 'group-hover:shadow-green-500/25'
  };
  if (id.includes('pptx')) return {
    bg: 'bg-orange-50 dark:bg-orange-950/50',
    text: 'text-orange-600 dark:text-orange-400',
    glow: 'group-hover:shadow-orange-500/25'
  };
  if (id.includes('jpg') || id.includes('png') || id.includes('webp')) {
    return {
      bg: 'bg-purple-50 dark:bg-purple-950/50',
      text: 'text-purple-600 dark:text-purple-400',
      glow: 'group-hover:shadow-purple-500/25'
    };
  }
  if (id.includes('sign') || id.includes('fill')) {
    return {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      text: 'text-gray-600 dark:text-gray-300',
      glow: 'group-hover:shadow-gray-500/25'
    };
  }
  // Default red for general PDF tools
  return {
    bg: 'bg-red-50 dark:bg-red-950/50',
    text: 'text-red-600 dark:text-red-400',
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
        "hover:shadow-xl hover:scale-105",
        "flex flex-col items-center justify-center text-center gap-3",
        `${getToolColors(tool).bg} dark:bg-opacity-75 backdrop-blur-sm`,
        "bg-gradient-to-br from-white/80 dark:from-white/5",
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
      <div className="text-sm font-medium dark:text-gray-200">
        {tool.title}
      </div>
    </Link>
  );
}