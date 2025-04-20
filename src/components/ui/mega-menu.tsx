"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ToolIcon } from "./tool-icon"
import { getToolsByCategory } from "@/lib/tools"
import type { Tool } from "@/lib/tools"

export function MegaMenu() {
  // Close menu when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const menu = document.querySelector('[data-mega-menu]');
        menu?.classList.remove('opacity-100', 'visible');
        menu?.classList.add('opacity-0', 'invisible');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  const documentTools = getToolsByCategory("documents")
  const imageTools = getToolsByCategory("images")
  const pdfTools = getToolsByCategory("pdf")

  const MenuSection = ({ title, tools }: { title: string; tools: Tool[] }) => (
    <div className="flex flex-col">
      <h3 className="mb-3 px-4 text-sm font-semibold text-primary">{title}</h3>
      <div className="grid grid-cols-2 gap-1">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="flex items-center gap-2 px-4 py-2 hover:bg-accent transition-colors rounded-md group outline-none focus-visible:ring-2 focus-visible:ring-primary"
            role="menuitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = tool.href;
              }
            }}
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary">
              <ToolIcon
                name={tool.iconName}
                className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{tool.title}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {tool.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <div
      data-mega-menu
      className="absolute top-full left-0 w-[600px] p-4 bg-popover rounded-lg border shadow-lg grid grid-cols-1 gap-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-x-1/4 sm:grid-cols-1 md:grid-cols-1 lg:-translate-x-1/4"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="tools-menu-button"
    >
      <MenuSection title="Document Tools" tools={documentTools} />
      <MenuSection title="Image Tools" tools={imageTools} />
      <MenuSection title="PDF Tools" tools={pdfTools} />
    </div>
  )
}