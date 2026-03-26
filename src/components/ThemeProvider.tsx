/**
 * ThemeProvider.tsx
 *
 * Applies the user's theme preference (light/dark/system) to the <html> element.
 * Also sets lang and dir attributes for i18n/RTL support.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-26 — add RTL + lang attribute support
 */

'use client';

import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

const RTL_LANGUAGES = new Set(['ar']);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSettingsStore((s) => s.theme);
  const language = useSettingsStore((s) => s.language);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'dark') {
      applyTheme(true);
    } else if (theme === 'light') {
      applyTheme(false);
    } else {
      // System preference
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mq.matches);

      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';
  }, [language]);

  return <>{children}</>;
}
