import { Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container max-w-5xl py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="mb-8 p-4 rounded-full bg-gradient-to-br from-orange-400/10 to-orange-600/10">
          <Shield className="w-16 h-16 text-orange-500" />
        </div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          About PDFsir
        </h1>
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground">
          <p>
            PDFsir is a free, fast, and reliable online platform that helps users convert, edit, and manage PDF files with ease. 
            Our mission is to simplify digital document handling through powerful, privacy-first tools accessible to everyone.
          </p>
          <p>
            Built with modern technology and a focus on user experience, we provide a comprehensive suite of tools for working 
            with PDFs, images, and documents. Whether you need to convert files, compress PDFs, or extract content, 
            PDFsir offers intuitive solutions that respect your privacy and data security.
          </p>
        </div>
        <div className="mt-12">
          <Button 
            asChild
            className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
          >
            <Link href="/tools">
              Explore Our Tools
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-400/5 to-orange-600/5">
          <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
          <p className="text-muted-foreground">
            Your files are processed securely and never stored without your permission.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-400/5 to-orange-600/5">
          <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
          <p className="text-muted-foreground">
            Simple, intuitive interface designed for users of all technical levels.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-400/5 to-orange-600/5">
          <h3 className="text-xl font-semibold mb-3">Always Free</h3>
          <p className="text-muted-foreground">
            Access essential PDF tools without any cost or hidden fees.
          </p>
        </div>
      </div>
    </div>
  )
}