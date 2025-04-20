export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export function getDirection(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
} as const;