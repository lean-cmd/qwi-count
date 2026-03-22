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

interface SettingsStore extends AppSettings {
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

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleHaptics: () => set((s) => ({ hapticsEnabled: !s.hapticsEnabled })),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'qwi-count-settings',
    }
  )
);
