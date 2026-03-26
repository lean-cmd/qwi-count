/**
 * settingsStore.ts
 *
 * Zustand store for user preferences: sound, haptics, theme, language.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — replaced celebration with language
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, Language } from '@/types';

const SUPPORTED_LANGS: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'ar', 'hi'];

function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  for (const pref of navigator.languages ?? [navigator.language]) {
    const code = pref.split('-')[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(code as Language)) return code as Language;
  }
  return 'en';
}

interface SettingsStore extends AppSettings {
  _langDetected: boolean;
  toggleSound: () => void;
  toggleHaptics: () => void;
  setTheme: (theme: AppSettings['theme']) => void;
  setLanguage: (language: Language) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      hapticsEnabled: true,
      theme: 'system',
      language: 'en',
      _langDetected: false,

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleHaptics: () => set((s) => ({ hapticsEnabled: !s.hapticsEnabled })),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'qwi-count-settings',
      onRehydrateStorage: () => {
        return (rehydrated) => {
          if (rehydrated && !rehydrated._langDetected) {
            const detected = detectBrowserLanguage();
            // Persist the detection so it only happens once
            useSettingsStore.setState({ language: detected, _langDetected: true });
          }
        };
      },
    }
  )
);
