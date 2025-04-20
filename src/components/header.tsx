"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, FileIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MegaMenu } from "@/components/ui/mega-menu"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Sign In Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <Link
              href="/tools"
              id="tools-menu-button"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary group-hover:text-primary"
              aria-haspopup="true"
              aria-expanded="false"
              role="button"
            >
              <span>Tools</span>
            </Link>
            <MegaMenu />
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Blog
          </Link>
        </nav>

        {/* Logo and Project Name */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3 15 2 2 4-4"/></svg>
          </div>
          <span className="text-lg font-bold">PDFSir</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            className="p-2 text-muted-foreground hover:text-primary"
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
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  href="/tools"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tools
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}