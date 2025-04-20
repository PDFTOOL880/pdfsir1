'use client';

import React from "react";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-left" dir="ltr">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-8">Last updated: April 10, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work more efficiently and provide a better user experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p className="mb-4">We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Enable enhanced functionality and personalization.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Track visitors across websites to display relevant advertisements.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
              <p className="text-gray-300 dark:text-gray-400">
                These cookies are necessary for the website to function properly. They include cookies for:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>User authentication</li>
                <li>Session management</li>
                <li>Security features</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
              <p className="text-gray-300 dark:text-gray-400">
                These cookies help us understand how visitors interact with our website by:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Collecting analytics data</li>
                <li>Measuring page load times</li>
                <li>Tracking user behavior</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Functionality Cookies</h3>
              <p className="text-gray-300 dark:text-gray-400">
                These cookies enable enhanced functionality by:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Remembering user preferences</li>
                <li>Storing language settings</li>
                <li>Customizing user interface</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
          <p className="mb-4">
            Most web browsers allow you to control cookies through their settings. You can:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>View cookies stored on your computer</li>
            <li>Delete all or specific cookies</li>
            <li>Block cookies from being set</li>
            <li>Allow or block cookies from specific sites</li>
          </ul>
          <p className="mb-4">
            Please note that blocking cookies may affect the functionality of our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
          <p className="mb-4">
            We use services from third parties that may set cookies on your device. These services include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Google Analytics for website analytics</li>
            <li>Social media plugins for sharing content</li>
            <li>Payment processors for handling transactions</li>
            <li>Advertisement networks for displaying relevant ads</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new 
            policy on this page and updating the "Last updated" date at the top.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our Cookie Policy, please contact us:
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