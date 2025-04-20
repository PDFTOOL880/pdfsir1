import { FileText, Image as LucideImage, FileUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/ui/tool-card"
import { getToolsByCategory } from "@/lib/tools"

export default function Home() {
  // Get tools by category
  const documentTools = getToolsByCategory('documents')
  const imageTools = getToolsByCategory('images')
  const pdfTools = getToolsByCategory('pdf')

  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/20" />
      
      <div className="relative w-full flex flex-col items-center">
        {/* Hero Section */}
        <div className="w-full max-w-7xl mx-auto px-4 pt-4 md:pt-6 lg:pt-12">
          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-foreground">
            Process your files with ease
            <br />
            Professional tools made simple
          </h1>
          <p className="mx-auto max-w-[790px] text-center text-xl sm:text-2xl font-semibold text-primary tracking-wide font-mono backdrop-blur-simple [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)]">
            Convert, edit, and transform your files quickly. Free tools for PDF, images,
            and documents with built-in privacy and security
          </p>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button asChild size="lg">
              <Link href="/tools">Get Started</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Tool Categories */}
        <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-20 lg:py-24 space-y-16">
          {/* Document Tools */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Document Tools</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {documentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          {/* Image Tools */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <LucideImage className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Image Tools</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {imageTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          {/* PDF Tools */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <FileUp className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">PDF Tools</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pdfTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
