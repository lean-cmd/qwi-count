/**
 * settings/page.tsx
 *
 * Settings screen: sound, haptics, theme toggles.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { useSettingsStore } from '@/stores/settingsStore';
import { Volume2, VolumeX, Vibrate, Sun, Moon } from 'lucide-react';

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors relative ${
        enabled ? 'bg-primary' : 'bg-foreground/20'
      }`}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-5.5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { soundEnabled, hapticsEnabled, theme, toggleSound, toggleHaptics, setTheme } =
    useSettingsStore();

  return (
    <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
      <h1 className="text-3xl font-extrabold mb-6">Settings</h1>

      <div className="space-y-4">
        {/* Sound */}
        <div className="flex items-center justify-between bg-foreground/5 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <div>
              <p className="font-bold">Sound Effects</p>
              <p className="text-sm opacity-60">Score chimes and celebrations</p>
            </div>
          </div>
          <Toggle enabled={soundEnabled} onToggle={toggleSound} />
        </div>

        {/* Haptics */}
        <div className="flex items-center justify-between bg-foreground/5 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Vibrate size={20} />
            <div>
              <p className="font-bold">Haptic Feedback</p>
              <p className="text-sm opacity-60">Vibration on native devices</p>
            </div>
          </div>
          <Toggle enabled={hapticsEnabled} onToggle={toggleHaptics} />
        </div>

        {/* Theme */}
        <div className="bg-foreground/5 rounded-2xl p-4 space-y-3">
          <p className="font-bold">Theme</p>
          <div className="flex gap-2">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 py-3 rounded-xl font-bold capitalize flex items-center justify-center gap-2 transition-colors ${
                  theme === t ? 'bg-primary text-white' : 'bg-foreground/10'
                }`}
              >
                {t === 'light' && <Sun size={16} />}
                {t === 'dark' && <Moon size={16} />}
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-sm opacity-40 mt-12">Qwi Count v0.1</p>
    </main>
  );
}
