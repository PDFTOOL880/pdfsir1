'use client';

import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-left" dir="ltr">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-8">Last updated: April 10, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="mb-4">
            We grant you a limited, non-exclusive, non-transferable, revocable license to use our service for your personal or business use in accordance with these Terms.
          </p>
          <p className="mb-4">This license does not include:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Modifying or copying our materials</li>
            <li>Using materials for commercial purposes</li>
            <li>Attempting to decompile or reverse engineer any software</li>
            <li>Removing any copyright or proprietary notations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Your Account</h2>
          <p className="mb-4">
            When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Service Usage</h2>
          <p className="mb-4">You agree not to use the service:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>In any way that violates any applicable laws</li>
            <li>To transmit harmful or malicious code</li>
            <li>To impersonate or attempt to impersonate the Company or others</li>
            <li>To interfere with or disrupt the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
          <p className="mb-4">
            Some features of our service require payment. You agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate billing information</li>
            <li>Pay all charges at the prices in effect</li>
            <li>Pay any applicable taxes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="mb-4">
            The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from your use of the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p className="mb-4">
            For any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>By email: <a href="mailto:pdftool37@gmail.com" className="text-blue-500 hover:text-blue-600">pdftool37@gmail.com</a></li>
            <li>By visiting our contact page in the Help Center</li>
          </ul>
        </section>
      </div>
    </div>
  );
}