'use client';

import { LocalGoogleAnalytics } from '@/components/analytics/LocalGoogleAnalytics';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Pricing Plans</h1>
      
      {/* Pricing table will go here */}
      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-bold">Basic</h2>
          <p>Coming soon...</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-bold">Pro</h2>
          <p>Coming soon...</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-bold">Enterprise</h2>
          <p>Coming soon...</p>
        </div>
      </div>

      {/* Add page-specific analytics */}
      <LocalGoogleAnalytics trackingId="G-ZG88VLRXYL" />
    </div>
  );
}