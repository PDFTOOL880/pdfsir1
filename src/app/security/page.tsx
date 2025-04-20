'use client';

import React from "react";

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Security</h1>
      
      <div className="space-y-12">
        {/* Data Protection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Data Protection</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We employ industry-leading encryption standards to protect your data. All files are encrypted using AES-256 
            encryption during transfer and storage. Your files are automatically deleted from our servers after processing.
          </p>
        </section>

        {/* Infrastructure Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Infrastructure Security</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our infrastructure is hosted on secure cloud platforms with SOC 2 Type II certification. We implement 
            multiple layers of security controls, including firewalls, intrusion detection, and regular security audits.
          </p>
        </section>

        {/* Privacy Compliance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Privacy Compliance</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We are fully compliant with GDPR, CCPA, and other major privacy regulations. We do not store or sell your 
            personal data. You have complete control over your data and can request deletion at any time.
          </p>
        </section>

        {/* Security Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Two-Factor Authentication</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add an extra layer of security to your account with 2FA support for multiple authenticator apps.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Secure File Transfer</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All file transfers are protected with TLS 1.3 encryption for maximum security.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Access Controls</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Granular access controls let you decide who can access your files and what they can do with them.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Activity Monitoring</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track all activity related to your files with detailed audit logs and real-time alerts.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">ISO 27001</div>
            <div className="p-4 border rounded-lg text-center">SOC 2 Type II</div>
            <div className="p-4 border rounded-lg text-center">HIPAA</div>
            <div className="p-4 border rounded-lg text-center">GDPR</div>
          </div>
        </section>
      </div>
    </div>
  );
}