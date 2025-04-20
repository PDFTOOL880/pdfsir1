'use client';

import React from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { getToolsByCategory } from "@/lib/tools";
import { FileText, Image as ImageIcon, FileUp } from "lucide-react";

const categoryIcons = {
  documents: FileText,
  images: ImageIcon,
  pdf: FileUp
};

const categoryConfig = {
  documents: {
    title: 'Document Tools',
    color: 'from-blue-500/20 to-blue-600/30',
    iconColor: 'text-blue-500'
  },
  images: {
    title: 'Image Tools',
    color: 'from-purple-500/20 to-purple-600/30',
    iconColor: 'text-purple-500'
  },
  pdf: {
    title: 'PDF Tools',
    color: 'from-red-500/20 to-red-600/30',
    iconColor: 'text-red-500'
  }
};

export default function ToolsPage() {
  const documentTools = getToolsByCategory('documents');
  const imageTools = getToolsByCategory('images');
  const pdfTools = getToolsByCategory('pdf');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Tools</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A comprehensive suite of tools to handle all your document and image processing needs
        </p>
      </div>

      {/* Tools Sections */}
      <div className="space-y-20">
        {/* Document Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryConfig.documents.color}`}>
              <FileText className={`w-6 h-6 ${categoryConfig.documents.iconColor}`} />
            </div>
            <h2 className="text-2xl font-semibold">{categoryConfig.documents.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Image Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryConfig.images.color}`}>
              <ImageIcon className={`w-6 h-6 ${categoryConfig.images.iconColor}`} />
            </div>
            <h2 className="text-2xl font-semibold">{categoryConfig.images.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* PDF Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryConfig.pdf.color}`}>
              <FileUp className={`w-6 h-6 ${categoryConfig.pdf.iconColor}`} />
            </div>
            <h2 className="text-2xl font-semibold">{categoryConfig.pdf.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Tool Section */}
      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">?Need a Custom Tool</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          .Don't see the tool you need? Contact us to discuss custom solutions for your specific requirements
        </p>
        <a
          href="mailto:pdftool37@gmail.com"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Contact us
        </a>
      </div>
    </div>
  );
}