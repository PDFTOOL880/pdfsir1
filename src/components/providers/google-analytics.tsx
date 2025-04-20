import Script from 'next/script';
import { GOOGLE_SERVICES } from '@/lib/google-services';

export function GoogleAnalytics() {
  const gaId = GOOGLE_SERVICES.analytics.measurementId;
  
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            transport_url: 'https://www.google-analytics.com/g/collect',
            first_party_collection: true
          });
        `}
      </Script>
    </>
  );
}