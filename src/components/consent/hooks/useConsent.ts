'use client';

import { useState, useEffect } from 'react';
import { ConsentState, UseConsentReturn, CONSENT_STORAGE_KEY } from '../types';

const defaultConsentState: ConsentState = {
  analytics_storage: undefined,
  ad_storage: undefined,
  ad_user_data: undefined,
  ad_personalization: undefined,
};

export function useConsent(): UseConsentReturn {
  const [consentState, setConsentState] = useState<ConsentState>(defaultConsentState);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent) as ConsentState;
        setConsentState(parsed);
        setHasInteracted(true);
        
        // Update Google consent mode with stored preferences
        window.gtag?.('consent', 'update', parsed);
      } catch (error) {
        console.error('Error parsing stored consent:', error);
        localStorage.removeItem(CONSENT_STORAGE_KEY);
      }
    }
  }, []);

  const updateConsent = (newState: ConsentState) => {
    setConsentState(newState);
    setHasInteracted(true);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newState));
    window.gtag?.('consent', 'update', newState);
  };

  const acceptAll = () => {
    updateConsent({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  };

  const rejectAll = () => {
    updateConsent({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  };

  return {
    consentState,
    hasInteracted,
    acceptAll,
    rejectAll,
    isVisible: !hasInteracted,
  };
}