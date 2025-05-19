'use client';

import { LocalGoogleAnalytics } from '@/components/analytics/LocalGoogleAnalytics';

export default function PdfToWordBlog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">PDF to Word Conversion Guide</h1>
      
      {/* Blog content will go here */}
      <div className="prose max-w-none">
        <p>Content coming soon...</p>
      </div>

      {/* Add page-specific analytics */}
      <LocalGoogleAnalytics trackingId="G-ZG88VLRXYL" />
    </div>
  );
}