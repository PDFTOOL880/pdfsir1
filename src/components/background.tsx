'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 -z-10 h-full w-full ${
        theme === 'dark' ? 'bg-dot-white/[0.2]' : 'bg-dot-black/[0.2]'
      } bg-background`}
      style={{
        backgroundSize: '32px 32px',
      }}
    />
  );
}