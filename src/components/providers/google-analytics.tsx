'use client';

import Script from 'next/script';
import { GOOGLE_SERVICES } from '@/lib/google-services';

// Only log in development
const debug = process.env.NODE_ENV === 'development';

interface GoogleAnalyticsProps {
  gaId?: string;
}

export function GoogleAnalytics({ gaId = GOOGLE_SERVICES.analytics.measurementId }: GoogleAnalyticsProps) {
  
  if (!gaId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics Measurement ID is not set. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to your .env.local file.');
    }
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onError={(e) => {
          if (debug) {
            console.error('Error loading Google Analytics:', e);
          }
        }}
        onLoad={() => {
          if (debug) {
            console.log('Google Analytics script loaded successfully');
          }
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onError={(e) => {
          if (debug) {
            console.error('Error initializing Google Analytics:', e);
          }
        }}
        onLoad={() => {
          if (debug) {
            console.log('Google Analytics initialized successfully');
          }
        }}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            send_page_view: true,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}