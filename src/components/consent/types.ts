export type ConsentStatus = 'granted' | 'denied' | undefined;

export interface ConsentState {
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
}

export interface ConsentBannerProps {
  className?: string;
}

export interface UseConsentReturn {
  consentState: ConsentState;
  hasInteracted: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  isVisible: boolean;
}

export const CONSENT_STORAGE_KEY = 'user-consent-choice';