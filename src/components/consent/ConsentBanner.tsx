'use client';

import { useConsent } from './hooks/useConsent';
import { ConsentBannerProps } from './types';
import { cn } from '@/lib/utils';

export function ConsentBanner({ className }: ConsentBannerProps) {
  const { isVisible, acceptAll, rejectAll } = useConsent();

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        // Base styles
        'fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in',
        // Responsive padding and max-width
        'md:px-6 md:pb-6',
        className
      )}
    >
      <div className={cn(
        // Container styles
        'mx-auto max-w-4xl bg-background/80 backdrop-blur',
        // Border and shadow
        'border border-border rounded-2xl shadow-lg',
        // Dark mode support
        'dark:bg-background/90 dark:border-border/50',
        // Padding
        'p-4 md:p-6'
      )}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span role="img" aria-label="privacy lock">🔒</span>
              We value your privacy
            </h2>
          </div>

          {/* Content */}
          <div className="text-sm text-muted-foreground">
            <p>
              We use cookies to enhance your browsing experience and analyze site traffic.
              By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-4">
            <button
              onClick={rejectAll}
              className={cn(
                'px-6 py-2 rounded-lg text-sm font-medium transition-colors',
                'border border-border hover:bg-accent',
                'dark:border-border/50'
              )}
            >
              Reject All
            </button>
            <button
              onClick={acceptAll}
              className={cn(
                'px-6 py-2 rounded-lg text-sm font-medium transition-colors',
                'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}