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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-orange-900 dark:via-orange-800 dark:to-orange-700">
      <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Convert, Edit & Manage PDFs – Instantly
        </h1>
      </div>

      {/* Tools Sections */}
      <div className="space-y-16">
        {/* Document Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${categoryConfig.documents.color} dark:from-orange-600/20 dark:to-orange-700/30`}>
              <FileText className={`w-6 h-6 ${categoryConfig.documents.iconColor}`} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{categoryConfig.documents.title}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {documentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Image Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${categoryConfig.images.color} dark:from-orange-600/20 dark:to-orange-700/30`}>
              <ImageIcon className={`w-6 h-6 ${categoryConfig.images.iconColor}`} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{categoryConfig.images.title}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {imageTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* PDF Tools Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${categoryConfig.pdf.color} dark:from-orange-600/20 dark:to-orange-700/30`}>
              <FileUp className={`w-6 h-6 ${categoryConfig.pdf.iconColor}`} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{categoryConfig.pdf.title}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* Custom Tool Section */}
      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Need a Custom Tool?</h2>
        <p className="text-gray-600 dark:text-orange-100 mb-8">
          .Don't see the tool you need? Contact us to discuss custom solutions for your specific requirements
        </p>
        <a
          href="mailto:pdftool37@gmail.com"
          className="inline-block bg-orange-600 dark:bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/25"
        >
          Contact us
        </a>
      </div>
    </div>
  );
}