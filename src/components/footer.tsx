import { Facebook, Linkedin, Mail, Video, Github, Twitter } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

const footerLinks = {
  tools: [
    { title: "All Tools", href: "/tools" },
    { title: "PDF Tools", href: "/tools#pdf" },
    { title: "Image Tools", href: "/tools#image" },
    { title: "Document Tools", href: "/tools#document" },
  ],
  company: [
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Help Center", href: "/help-center" },
    { title: "Documentation", href: "/documentation" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/legal/privacy-policy" },
    { title: "Terms of Service", href: "/legal/terms-of-service" },
    { title: "Cookie Policy", href: "/legal/cookie-policy" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/@ToolPdf", label: "Twitter" },
  { icon: Github, href: "https://github.com/PDFTOOL880", label: "GitHub" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61574153198350", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/pdf-sir-9183a5356", label: "LinkedIn" },
  { icon: Mail, href: "mailto:pdftool37@gmail.com", label: "Email" },
  { icon: Video, href: "https://www.tiktok.com/@pdfsir", label: "TikTok" },
]

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600" />
              <span className="text-xl font-bold">PDFsir</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional PDF tools made simple and secure. Convert, edit, and transform your documents with ease.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground/60 hover:text-orange-500 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PDFsir. All rights reserved.
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
