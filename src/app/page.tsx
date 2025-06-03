import { FileText, Image as LucideImage, FileUp, Globe, Zap, Gift, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/ui/tool-card"
import { getToolsByCategory } from "@/lib/tools"

export default function Home() {
  const documentTools = getToolsByCategory('documents')
  const imageTools = getToolsByCategory('images')
  const pdfTools = getToolsByCategory('pdf')

  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Hero Section with Orange Gradient */}
      <div className="relative w-full bg-gradient-to-br from-orange-400/10 to-orange-600/10 pb-16">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative w-full max-w-7xl mx-auto px-4 pt-16 md:pt-20 lg:pt-24">
          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-foreground">
            Transform Your Documents
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              With Powerful PDF Tools
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[790px] text-center text-lg sm:text-xl text-muted-foreground">
            Convert, edit, and transform your files quickly. Free tools for PDF, images,
            and documents with built-in privacy and security.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
            >
              <Link href="/tools">Start Converting</Link>
            </Button>
            <Button variant="secondary" size="lg">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Document Tools */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400/20 to-orange-600/20">
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold">Document Tools</h2>
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
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400/20 to-orange-600/20">
              <LucideImage className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold">Image Tools</h2>
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
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400/20 to-orange-600/20">
              <FileUp className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold">PDF Tools</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-br from-orange-400/5 to-orange-600/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">? Why Choose PDFsir</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-xl bg-background/80 backdrop-blur-sm">
              <Globe className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compatible with all devices</h3>
              <p className="text-muted-foreground">Access our tools from any device - desktop,tablet,or mobile</p>
            </div>
            <div className="p-6 rounded-xl bg-background/80 backdrop-blur-sm">
              <Zap className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
              <p className="text-muted-foreground">Convert and process your files in seconds with our optimized tools</p>
            </div>
            <div className="p-6 rounded-xl bg-background/80 backdrop-blur-sm">
              <Gift className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free to use</h3>
              <p className="text-muted-foreground">Access essential PDF tools without any cost or hidden fees</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">About PDFsir</h2>
            <p className="text-lg text-muted-foreground mb-6">
              PDFsir is your trusted companion for all document conversion needs. We combine powerful 
              technology with a simple interface to make document processing accessible to everyone. 
              Our secure platform ensures your files are handled with utmost privacy and care
            </p>
            <Button variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <Info className="h-48 w-48 text-orange-500/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
