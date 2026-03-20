/**
 * settingsStore.ts
 *
 * Zustand store for user preferences: sound, haptics, theme.
 *
 * @author claude — 2026-03-20
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings } from '@/types';

interface SettingsStore extends AppSettings {
  toggleSound: () => void;
  toggleHaptics: () => void;
  setTheme: (theme: AppSettings['theme']) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      hapticsEnabled: true,
      theme: 'system',

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleHaptics: () => set((s) => ({ hapticsEnabled: !s.hapticsEnabled })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'qwi-count-settings',
    }
  )
);
