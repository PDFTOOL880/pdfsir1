'use client';

import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LegalPage() {
  const legalDocuments = [
    {
      title: "Privacy Policy",
      description: "Learn about how we collect, use, and protect your personal information.",
      path: "/legal/privacy-policy",
    },
    {
      title: "Terms of Service",
      description: "Understand the rules and regulations governing the use of our services.",
      path: "/legal/terms-of-service",
    },
    {
      title: "Cookie Policy",
      description: "Information about how we use cookies and similar technologies on our website.",
      path: "/legal/cookie-policy",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Legal Information</h1>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        We are committed to transparency and compliance with all applicable laws and regulations. 
        Below you'll find our legal documents and policies that govern the use of our services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {legalDocuments.map((doc) => (
          <Link href={doc.path} key={doc.path}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">{doc.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{doc.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <p className="mb-4">
            All our legal documents are regularly updated to reflect changes in our services and comply with the latest regulations.
          </p>
          
          <p className="mb-4">
            If you have any questions about our legal documents or policies, please contact our legal team at:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Email: legal@example.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Legal Street, Law City, ST 12345</li>
          </ul>
          
          <p>
            For urgent matters, please use our dedicated legal support line available Monday through Friday, 
            9 AM to 5 PM EST.
          </p>
        </div>
      </div>
    </div>
  );
}