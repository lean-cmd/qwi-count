/**
 * settingsStore.ts
 *
 * Zustand store for user preferences: sound, haptics, theme, celebration style.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — added celebration style
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, CelebrationStyle } from '@/types';

interface SettingsStore extends AppSettings {
  toggleSound: () => void;
  toggleHaptics: () => void;
  setTheme: (theme: AppSettings['theme']) => void;
  setCelebration: (style: CelebrationStyle) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      hapticsEnabled: true,
      theme: 'system',
      celebration: 'confetti',

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleHaptics: () => set((s) => ({ hapticsEnabled: !s.hapticsEnabled })),
      setTheme: (theme) => set({ theme }),
      setCelebration: (celebration) => set({ celebration }),
    }),
    {
      name: 'qwi-count-settings',
    }
  )
);
