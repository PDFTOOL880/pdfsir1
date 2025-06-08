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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-4 py-16 space-y-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white/90">
          Convert, Edit & Manage PDFs – Instantly
        </h1>
      </div>

      {/* Tools Sections */}
      <div className="space-y-16">
        {/* Document Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 dark:from-orange-500/20 dark:to-orange-600/30">
              <FileText className="w-6 h-6 text-blue-500 dark:text-white/80" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white/80">{categoryConfig.documents.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 dark:gap-4 transition-all duration-300">
            {documentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Image Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/20 dark:from-orange-500/20 dark:to-orange-600/30">
              <ImageIcon className="w-6 h-6 text-purple-500 dark:text-white/80" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white/80">{categoryConfig.images.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 dark:gap-4 transition-all duration-300">
            {imageTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* PDF Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/20 dark:from-orange-500/20 dark:to-orange-600/30">
              <FileUp className="w-6 h-6 text-red-500 dark:text-white/80" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white/80">{categoryConfig.pdf.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 dark:gap-4 transition-all duration-300">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* Custom Tool Section */}
      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white/90">Need a Custom Tool?</h2>
        <p className="text-gray-600 dark:text-white/70 mb-8">
          .Don't see the tool you need? Contact us to discuss custom solutions for your specific requirements
        </p>
        <a
          href="mailto:pdftool37@gmail.com"
          className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-orange-800/30 hover:shadow-orange-800/40"
        >
          Contact us
        </a>
      </div>
    </div>
  );
}