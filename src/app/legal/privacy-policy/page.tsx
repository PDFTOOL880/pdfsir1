'use client';

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-left" dir="ltr">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-8">Last updated: April 10, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your personal data, your privacy rights, and how the law protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
          <p className="mb-4">We collect and process the following types of data:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Account information (name, email, password)</li>
            <li>Usage data (features used, file processing history)</li>
            <li>Technical data (IP address, browser type, device information)</li>
            <li>Payment information (processed securely through our payment providers)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
          <p className="mb-4">We use your data for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To improve our services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure data centers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">Under data protection laws, you have rights including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The right to access your personal data</li>
            <li>The right to correct your personal data</li>
            <li>The right to erase your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to object to processing of your personal data</li>
            <li>The right to data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
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