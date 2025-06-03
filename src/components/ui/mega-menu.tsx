"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ToolIcon } from "./tool-icon"
import { getToolsByCategory } from "@/lib/tools"
import type { Tool } from "@/lib/tools"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const documentTools = getToolsByCategory("documents")
  const imageTools = getToolsByCategory("images")
  const pdfTools = getToolsByCategory("pdf")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const ToolCard = ({ tool }: { tool: Tool }) => (
    <button
      onClick={() => {
        onClose()
        router.push(tool.href)
      }}
      className="flex items-center w-full gap-3 px-4 py-2 hover:bg-accent/50 transition-colors"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded bg-gradient-to-br from-orange-400/10 to-orange-600/10">
        <ToolIcon
          name={tool.iconName}
          className="h-4 w-4 text-orange-500"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm truncate">
          {tool.title}
        </span>
      </div>
    </button>
  )

  const MenuSection = ({ title, tools }: { title: string; tools: Tool[] }) => (
    <div>
      <div className="px-4 py-1.5 bg-muted/50">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div
        ref={menuRef}
        className="fixed left-1/2 -translate-x-1/2 top-16 z-50 bg-background shadow-lg border w-[400px] h-[600px]"
      >
        <div 
          className={`
            h-full overflow-y-auto overscroll-contain
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-orange-500/20
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:border-2
            [&::-webkit-scrollbar-thumb]:border-transparent
            [&::-webkit-scrollbar-thumb]:bg-clip-padding
            [&::-webkit-scrollbar-thumb]:hover:bg-orange-500/40
          `}
        >
          <div>
            <div className="py-3 px-4">
              <h2 className="text-base font-medium">Choose a Tool</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Convert, edit, and transform your files
              </p>
            </div>

            <div className="space-y-2 pb-4">
              <MenuSection title="Document Tools" tools={documentTools} />
              <MenuSection title="Image Tools" tools={imageTools} />
              <MenuSection title="PDF Tools" tools={pdfTools} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}