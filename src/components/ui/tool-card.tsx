"use client";

import { Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ToolIcon } from "./tool-icon";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const getCardStyles = (tool: Tool) => {
  return {
    light: {
      bg: tool.id.includes('word') ? 'bg-red-100' :
          tool.id.includes('excel') ? 'bg-green-100' :
          tool.id.includes('pptx') ? 'bg-orange-100' :
          tool.id.includes('jpg') || tool.id.includes('png') || tool.id.includes('image') ? 'bg-purple-100' :
          tool.id.includes('sign') || tool.id.includes('fill') ? 'bg-green-100' :
          'bg-green-100',
      text: tool.id.includes('word') ? 'text-blue-700' :
            tool.id.includes('excel') ? 'text-green-700' :
            tool.id.includes('pptx') ? 'text-orange-700' :
            tool.id.includes('jpg') || tool.id.includes('png') || tool.id.includes('image') ? 'text-purple-700' :
            tool.id.includes('sign') || tool.id.includes('fill') ? 'text-red-700' :
            'text-red-700',
      shadow: 'shadow-lg'
    },
    dark: {
      bg: tool.id.includes('word') ? 'bg-gradient-to-br from-blue-600 to-blue-800' :
          tool.id.includes('excel') ? 'bg-gradient-to-br from-green-600 to-green-800' :
          tool.id.includes('pptx') ? 'bg-gradient-to-br from-orange-600 to-orange-800' :
          tool.id.includes('jpg') || tool.id.includes('png') || tool.id.includes('image') ? 'bg-gradient-to-br from-purple-600 to-purple-800' :
          tool.id.includes('sign') || tool.id.includes('fill') ? 'bg-gradient-to-br from-gray-600 to-gray-800' :
          'bg-gradient-to-br from-red-600 to-red-800',
      text: 'text-white',
      shadow: 'shadow-xl shadow-black/40'
    }
  };
};


export function ToolCard({ tool, className }: ToolCardProps) {
  const styles = getCardStyles(tool);
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={tool.href}
        className={cn(
          "group w-64 h-64 rounded-2xl cursor-pointer",
          "transition-all duration-300 ease-in-out",
          "flex items-center justify-center",
          "backdrop-blur-sm",
          styles.light.bg,
          styles.light.shadow,
          "dark:bg-gradient-to-br dark:from-gray-400 dark:to-gray-100 dark:brightness-110 dark:saturate-150",
          "dark:shadow-xl dark:shadow-orange-800/40",
          "hover:shadow-2xl dark:hover:shadow-orange-800/60",
          "p-8",
          className
        )}
      >
        <ToolIcon name={tool.iconName} className="w-full h-full object-contain" />
      </Link>
    </motion.div>
  );
}