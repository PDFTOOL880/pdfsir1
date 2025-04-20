'use client';

import React from "react";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tutorials Section */}
        <div className="p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Tutorials</h2>
          <ul className="space-y-4">
            <li>
              <a href="/tutorials/getting-started" className="text-blue-500 hover:text-blue-600">
                Getting Started Guide
              </a>
            </li>
            <li>
              <a href="/tutorials/file-compression" className="text-blue-500 hover:text-blue-600">
                File Compression Best Practices
              </a>
            </li>
            <li>
              <a href="/tutorials/image-optimization" className="text-blue-500 hover:text-blue-600">
                Image Optimization Guide
              </a>
            </li>
            <li>
              <a href="/tutorials/pdf-signing" className="text-blue-500 hover:text-blue-600">
                Digital Signatures Tutorial
              </a>
            </li>
          </ul>
          <Button className="mt-6 w-full">View All Tutorials</Button>
        </div>

        {/* Case Studies */}
        <div className="p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
          <ul className="space-y-4">
            <li>
              <a href="/case-studies/enterprise" className="text-blue-500 hover:text-blue-600">
                Enterprise Success Stories
              </a>
            </li>
            <li>
              <a href="/case-studies/startup" className="text-blue-500 hover:text-blue-600">
                Startup Case Studies
              </a>
            </li>
            <li>
              <a href="/case-studies/education" className="text-blue-500 hover:text-blue-600">
                Education Sector Impact
              </a>
            </li>
            <li>
              <a href="/case-studies/healthcare" className="text-blue-500 hover:text-blue-600">
                Healthcare Solutions
              </a>
            </li>
          </ul>
          <Button className="mt-6 w-full">Explore Case Studies</Button>
        </div>

        {/* API Documentation */}
        <div className="p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
          <ul className="space-y-4">
            <li>
              <a href="/api/introduction" className="text-blue-500 hover:text-blue-600">
                API Introduction
              </a>
            </li>
            <li>
              <a href="/api/authentication" className="text-blue-500 hover:text-blue-600">
                Authentication Guide
              </a>
            </li>
            <li>
              <a href="/api/endpoints" className="text-blue-500 hover:text-blue-600">
                API Endpoints
              </a>
            </li>
            <li>
              <a href="/api/examples" className="text-blue-500 hover:text-blue-600">
                Code Examples
              </a>
            </li>
          </ul>
          <Button className="mt-6 w-full">View API Docs</Button>
        </div>

        {/* Tools and SDKs */}
        <div className="p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Tools & SDKs</h2>
          <ul className="space-y-4">
            <li>
              <a href="/tools/desktop-app" className="text-blue-500 hover:text-blue-600">
                Desktop Application
              </a>
            </li>
            <li>
              <a href="/tools/mobile-sdk" className="text-blue-500 hover:text-blue-600">
                Mobile SDK
              </a>
            </li>
            <li>
              <a href="/tools/cli" className="text-blue-500 hover:text-blue-600">
                Command Line Interface
              </a>
            </li>
            <li>
              <a href="/tools/plugins" className="text-blue-500 hover:text-blue-600">
                Browser Plugins
              </a>
            </li>
          </ul>
          <Button className="mt-6 w-full">Download Tools</Button>
        </div>

        {/* Community */}
        <div className="p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Community</h2>
          <ul className="space-y-4">
            <li>
              <a href="/community/forum" className="text-blue-500 hover:text-blue-600">
                Community Forum
              </a>
            </li>
            <li>
              <a href="/community/discord" className="text-blue-500 hover:text-blue-600">
                Discord Server
              </a>
            </li>
            <li>
              <a href="/community/github" className="text-blue-500 hover:text-blue-600">
                GitHub Projects
              </a>
            </li>
            <li>
              <a href="/community/events" className="text-blue-500 hover:text-blue-600">
                Upcoming Events
              </a>
            </li>
          </ul>
          <Button className="mt-6 w-full">Join Community</Button>
        </div>

        {/* Support */}
        <div className="p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Support</h2>
          <ul className="space-y-4">
            <li>
              <a href="/support/faq" className="text-blue-500 hover:text-blue-600">
                FAQ
              </a>
            </li>
            <li>
              <a href="/support/contact" className="text-blue-500 hover:text-blue-600">
                Contact Support
              </a>
            </li>
            <li>
              <a href="/support/knowledge-base" className="text-blue-500 hover:text-blue-600">
                Knowledge Base
              </a>
            </li>
            <li>
              <a href="/support/status" className="text-blue-500 hover:text-blue-600">
                System Status
              </a>
            </li>
          </ul>
          <Button className="mt-6 w-full">Get Support</Button>
        </div>
      </div>
    </div>
  );
}