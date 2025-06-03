'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { DropZone } from '@/components/ui/drop-zone';
import { FileList } from '@/components/ui/file-list';
import { toast } from 'sonner';

export default function PDFtoPNG() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (files: File[]) => {
    const pdf = files[0];
    
    if (!pdf) return;
    
    if (pdf.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB');
      return;
    }

    if (pdf.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setFile(pdf);
  };

  const handleRemove = () => {
    setFile(null);
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      setIsConverting(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/image/pdf-to-png', {
        method: 'POST',
        body: formData
      });

      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Conversion failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', contentType?.includes('zip') ? '.zip' : '.png');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Conversion completed!');

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to convert file');
      }
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mt-10 flex items-center justify-center gap-2">Convert PDF to PNG</h1>
      <div className="space-y-6">
        <div className="rounded-lg border p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Upload your PDF file</h2>
          <DropZone 
            onFileSelect={handleFileSelect}
            accept={{
              'application/pdf': ['.pdf']
            }}
            maxSize={10 * 1024 * 1024}
          />

          {file && (
            <div className="mt-6 space-y-4">
              <FileList 
                files={[file]} 
                onRemove={() => handleRemove()}
              />
              <Button
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full"
              >
                {isConverting ? 'Converting...' : 'Convert to PNG'}
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-lg border p-6 bg-card">
          <h2 className="text-xl font-semibold mb-2">About this converter</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Converts PDF files to high-quality PNG images</li>
            <li>Handles multi-page PDFs (downloads as ZIP)</li>
            <li>Maximum file size: 10MB</li>
            <li>Output resolution: 1920x1920 pixels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}