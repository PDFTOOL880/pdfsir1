'use client';

import React from "react";

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-left" dir="ltr">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Getting Started</h3>
              <ul className="space-y-2">
                <li><a href="#introduction" className="text-blue-500 hover:text-blue-600">Introduction</a></li>
                <li><a href="#quickstart" className="text-blue-500 hover:text-blue-600">Quick Start Guide</a></li>
                <li><a href="#installation" className="text-blue-500 hover:text-blue-600">Installation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Core Features</h3>
              <ul className="space-y-2">
                <li><a href="#file-compression" className="text-blue-500 hover:text-blue-600">File Compression</a></li>
                <li><a href="#image-optimization" className="text-blue-500 hover:text-blue-600">Image Optimization</a></li>
                <li><a href="#pdf-tools" className="text-blue-500 hover:text-blue-600">PDF Tools</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Advanced Usage</h3>
              <ul className="space-y-2">
                <li><a href="#api" className="text-blue-500 hover:text-blue-600">API Reference</a></li>
                <li><a href="#sdk" className="text-blue-500 hover:text-blue-600">SDK Integration</a></li>
                <li><a href="#automation" className="text-blue-500 hover:text-blue-600">Automation</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          <section className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Have questions about our documentation? Contact us at:
            </p>
            <a href="mailto:pdftool37@gmail.com" className="text-blue-500 hover:text-blue-600">
              pdftool37@gmail.com
            </a>
          </section>
          <section id="introduction">
            <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Welcome to our comprehensive documentation. Here you'll find everything you need to know about using our platform
              effectively. Whether you're just getting started or looking for advanced features, we've got you covered.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Prerequisites</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Basic understanding of file formats</li>
                <li>Account creation and verification</li>
                <li>Basic knowledge of web technologies</li>
              </ul>
            </div>
          </section>

          <section id="quickstart">
            <h2 className="text-3xl font-semibold mb-4">Quick Start Guide</h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">1. Create an Account</h3>
                <p className="text-gray-300 dark:text-gray-400">
                  Sign up for a free account to get started with basic features.
                </p>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">2. Upload Your First File</h3>
                <p className="text-gray-300 dark:text-gray-400">
                  Drag and drop or select files to begin processing.
                </p>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">3. Process and Download</h3>
                <p className="text-gray-300 dark:text-gray-400">
                  Choose your desired options and download the processed file.
                </p>
              </div>
            </div>
          </section>

          <section id="installation">
            <h2 className="text-3xl font-semibold mb-4">Installation</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">NPM Installation</h4>
                <pre className="bg-black text-white p-3 rounded">npm install @our-package/core</pre>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Yarn Installation</h4>
                <pre className="bg-black text-white p-3 rounded">yarn add @our-package/core</pre>
              </div>
            </div>
          </section>

          <section id="file-compression">
            <h2 className="text-3xl font-semibold mb-4">File Compression</h2>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Learn how to effectively compress files while maintaining quality.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Code Example</h4>
              <pre className="bg-black text-white p-3 rounded">
{`import { compress } from '@our-package/core'

await compress({
  input: './file.pdf',
  output: './compressed.pdf',
  quality: 'high'
})`}
              </pre>
            </div>
          </section>

          <section id="image-optimization">
            <h2 className="text-3xl font-semibold mb-4">Image Optimization</h2>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Optimize images for web and mobile applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Supported Formats</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300 dark:text-gray-400">
                  <li>JPEG/JPG</li>
                  <li>PNG</li>
                  <li>WebP</li>
                  <li>AVIF</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300 dark:text-gray-400">
                  <li>Lossy compression</li>
                  <li>Lossless compression</li>
                  <li>Metadata stripping</li>
                  <li>Format conversion</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}