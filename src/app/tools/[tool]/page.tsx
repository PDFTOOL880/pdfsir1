import React from "react";
import ToolProcessor from "./tool-processor";
import type { Metadata } from "next";

const tools = {
  "pdf-to-word": {
    title: "PDF to Word Converter",
    description: "Convert PDF files to editable Word documents with high accuracy"
  },
  "webp-to-jpg": {
    title: "WEBP to JPG Converter",
    description: "Convert WEBP images to JPG format with optimal quality"
  }
} as const;

type ToolParams = {
  params: Promise<{ tool: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(
  { params }: ToolParams
): Promise<Metadata> {
  const { tool } = await params;
  const toolInfo = tools[tool as keyof typeof tools];
  
  if (!toolInfo) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool does not exist'
    };
  }

  return {
    title: toolInfo.title,
    description: toolInfo.description,
  };
}

export default async function ToolPage({ params }: ToolParams) {
  const { tool } = await params;
  const toolInfo = tools[tool as keyof typeof tools];

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        {!toolInfo ? (
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">Tool Not Found</h1>
            <p className="text-muted-foreground">
              The requested tool does not exist.
            </p>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">{toolInfo.title}</h1>
            <p className="text-muted-foreground">
              {toolInfo.description}
            </p>
          </div>
        )}

        <div className="mt-8">
          <ToolProcessor toolId={tool} toolTitle={toolInfo?.title || ""} />
        </div>
      </div>
    </div>
  );
}