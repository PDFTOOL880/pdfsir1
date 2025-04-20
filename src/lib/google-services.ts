// Google Services Configuration
export const GOOGLE_SERVICES = {
  analytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    // Add this to your .env.local:
    // NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  },
  searchConsole: {
    verificationToken: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    // Add this to your .env.local:
    // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-token
  },
  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    // Add this to your .env.local:
    // NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
    // RECAPTCHA_SECRET_KEY=your-secret-key
  },
};

// Google Analytics Event Types
export type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

// Google Analytics
export const gtag = {
  pageview: (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GOOGLE_SERVICES.analytics.measurementId, {
        page_path: url,
      });
    }
  },
  event: ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  },
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}