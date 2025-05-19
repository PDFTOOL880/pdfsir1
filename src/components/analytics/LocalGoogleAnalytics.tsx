'use client';

import Script from 'next/script';
import { useConsent } from '@/components/consent/hooks/useConsent';

interface LocalGoogleAnalyticsProps {
  trackingId: string;
}

const debug = process.env.NODE_ENV === 'development';

export function LocalGoogleAnalytics({ trackingId }: LocalGoogleAnalyticsProps) {
  const { consentState } = useConsent();

  if (!trackingId) {
    if (debug) {
      console.warn('Google Analytics Measurement ID is required for LocalGoogleAnalytics component');
    }
    return null;
  }

  // Debug logging for consent state
  if (debug) {
    console.log('Local GA Consent State:', consentState);
  }

  return (
    <>
      {/* Load the gtag.js script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
        onError={(e) => {
          if (debug) {
            console.error('Error loading Google Analytics script:', e);
          }
        }}
        onLoad={() => {
          if (debug) {
            console.log('Local Google Analytics script loaded successfully');
          }
        }}
      />

      {/* Initialize gtag with the provided tracking ID */}
      <Script
        id={`google-analytics-${trackingId}`}
        strategy="afterInteractive"
        onError={(e) => {
          if (debug) {
            console.error('Error initializing Google Analytics:', e);
          }
        }}
        onLoad={() => {
          if (debug) {
            console.log('Local Google Analytics initialized successfully');
          }
        }}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Update consent state
          gtag('consent', 'default', {
            'analytics_storage': '${consentState.analytics_storage || 'denied'}',
            'ad_storage': '${consentState.ad_storage || 'denied'}'
          });

          gtag('config', '${trackingId}', {
            page_path: window.location.pathname,
            send_page_view: true,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}