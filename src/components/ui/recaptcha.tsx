'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { GOOGLE_SERVICES } from '@/lib/google-services';

interface ReCAPTCHAProps {
  onVerify: (token: string) => void;
  onError?: () => void;
}

export function ReCAPTCHA({ onVerify, onError }: ReCAPTCHAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteKey = GOOGLE_SERVICES.recaptcha.siteKey;

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window.grecaptcha !== 'undefined' && containerRef.current) {
        window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          'error-callback': onError,
        });
      }
    };

    if (window.grecaptcha) {
      loadRecaptcha();
    } else {
      // If grecaptcha isn't loaded yet, wait for it
      window.recaptchaCallback = loadRecaptcha;
    }

    return () => {
      delete window.recaptchaCallback;
    };
  }, [onVerify, onError, siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit`}
        strategy="lazyOnload"
      />
      <div ref={containerRef} />
    </>
  );
}

declare global {
  interface Window {
    grecaptcha: any;
    recaptchaCallback?: () => void;
  }
}