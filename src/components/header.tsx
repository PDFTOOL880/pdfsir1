"use client"

import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getToolsByCategory, type Tool } from "@/lib/tools"
import { ToolIcon } from "@/components/ui/tool-icon"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, User, LayoutDashboard, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MegaMenu } from "@/components/ui/mega-menu"
import { useSession, signIn, signOut } from "next-auth/react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const documentTools = getToolsByCategory("documents")
  const imageTools = getToolsByCategory("images")
  const pdfTools = getToolsByCategory("pdf")

  const MenuSection = ({ title, tools }: { title: string; tools: Tool[] }) => (
    <div>
      <div className="px-4 py-1.5 bg-muted/50">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setIsToolsOpen(false)
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
        ))}
      </div>
    </div>
  )

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMenus = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background shadow-sm z-[99]">
      <div className="container h-full flex items-center justify-between">
        {/* Logo and Project Name */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenus}>
          <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3 15 2 2 4-4"/></svg>
          </div>
          <span className="text-lg font-bold">PDFSir</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu open={isToolsOpen} onOpenChange={setIsToolsOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none"
              >
                <span>Tools</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px] p-0" align="start">
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
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          {session && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth Button */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => signOut()}>
              <User className="h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => signIn("google")}>
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 text-muted-foreground hover:text-primary md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container py-4 flex flex-col gap-4">
              <Link
                href="/tools"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={closeMenus}
              >
                Tools
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={closeMenus}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={closeMenus}
              >
                About
              </Link>
              {session ? (
                <button
                  onClick={() => {
                    signOut()
                    closeMenus()
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn("google")
                    closeMenus()
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
              )}
            </nav>
          </div>
        )}

      </div>
    </header>
  )
}