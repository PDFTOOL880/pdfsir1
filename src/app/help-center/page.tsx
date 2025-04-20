'use client';

import React from "react";
import { Button } from "@/components/ui/button";

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-left" dir="ltr">
      <div className="max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-center mb-4">How can we help you?</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="absolute right-2 top-2">
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">How to create an account</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Upload your first file</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Understanding file compression</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Basic troubleshooting</a>
            </li>
          </ul>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Account & Billing</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Manage subscription</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Payment methods</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Billing history</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Cancel subscription</a>
            </li>
          </ul>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">API documentation</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Integration guides</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">Error messages</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">System requirements</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">What file formats do you support?</h3>
            <p className="text-gray-300 dark:text-gray-400">
              We support a wide range of file formats including PDF, DOCX, XLSX, JPG, PNG, and many more. Check our documentation for a complete list.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">How secure are my files?</h3>
            <p className="text-gray-300 dark:text-gray-400">
              Your files are encrypted during transfer and storage. We use industry-standard security measures and automatically delete files after processing.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">What are the file size limits?</h3>
            <p className="text-gray-300 dark:text-gray-400">
              Free users can upload files up to 100MB. Premium users can upload files up to 2GB. Enterprise users have custom limits.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">How do I cancel my subscription?</h3>
            <p className="text-gray-300 dark:text-gray-400">
              You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-gray-300 dark:text-gray-400 mb-6">
          Our support team is available 24/7 to assist you with any questions.
        </p>
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="mailto:pdftool37@gmail.com">Contact us</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://wa.me/966546791712" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
          <p className="text-gray-300 dark:text-gray-400">
            Or email us directly at:{" "}
            <a href="mailto:pdftool37@gmail.com" className="text-blue-500 hover:text-blue-600">
            Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}