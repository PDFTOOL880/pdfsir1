import React from "react";

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">PDF Compression</h3>
          <p className="text-gray-300 dark:text-gray-400">
            Reduce PDF file size while maintaining quality. Perfect for sharing and storing documents.
          </p>
        </div>

        <div className="p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Image Optimization</h3>
          <p className="text-gray-300 dark:text-gray-400">
            Optimize images with advanced compression algorithms. Support for multiple formats.
          </p>
        </div>

        <div className="p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Digital Signatures</h3>
          <p className="text-gray-300 dark:text-gray-400">
            Securely sign PDF documents with digital signatures. Legal and binding.
          </p>
        </div>

        <div className="p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">File Conversion</h3>
          <p className="text-gray-300 dark:text-gray-400">
            Convert between different file formats easily. Maintain formatting and quality.
          </p>
        </div>

        <div className="p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Cloud Storage</h3>
          <p className="text-gray-300 dark:text-gray-400">
            Secure cloud storage for all your documents. Access from anywhere.
          </p>
        </div>

        <div className="p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Collaboration Tools</h3>
          <p className="text-gray-300 dark:text-gray-400">
            Work together with team members. Real-time updates and comments.
          </p>
        </div>
      </div>
    </div>
  );
}