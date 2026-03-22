/**
 * settings/page.tsx
 *
 * Settings screen: sound, haptics, theme, and celebration style picker
 * with a "Test" button to preview each animation.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — added celebration style picker with preview
 */

'use client';

import { useSettingsStore } from '@/stores/settingsStore';
import { Volume2, VolumeX, Vibrate, Sun, Moon, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import { playCelebration, CELEBRATION_OPTIONS } from '@/lib/celebrations';
import { useGameSound } from '@/hooks/useGameSound';

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
        enabled ? 'bg-primary' : 'bg-surface-hover'
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
  const { soundEnabled, hapticsEnabled, theme, celebration, toggleSound, toggleHaptics, setTheme, setCelebration } =
    useSettingsStore();
  const { playFanfare } = useGameSound();

  const handleTestCelebration = (style: typeof celebration) => {
    playCelebration(style);
    playFanfare();
  };

  return (
    <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
      <h1 className="text-3xl font-extrabold mb-6">Settings</h1>

      <div className="space-y-4">
        {/* Sound */}
        <div className="flex items-center justify-between bg-surface rounded-2xl p-4">
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
        <div className="flex items-center justify-between bg-surface rounded-2xl p-4">
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
        <div className="bg-surface rounded-2xl p-4 space-y-3">
          <p className="font-bold">Theme</p>
          <div className="flex gap-2">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 py-3 rounded-xl font-bold capitalize flex items-center justify-center gap-2 transition-colors ${
                  theme === t ? 'bg-primary text-white' : 'bg-surface-hover'
                }`}
              >
                {t === 'light' && <Sun size={16} />}
                {t === 'dark' && <Moon size={16} />}
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Celebration Style */}
        <div className="bg-surface rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <PartyPopper size={20} />
            <p className="font-bold">Celebration Style</p>
          </div>
          <p className="text-sm opacity-60">Choose the animation for Perfect Line</p>

          <div className="space-y-2">
            {CELEBRATION_OPTIONS.map((opt) => {
              const isSelected = celebration === opt.value;
              return (
                <div key={opt.value} className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCelebration(opt.value)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-surface-hover'
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span>{opt.label}</span>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-sm opacity-80"
                      >
                        Active
                      </motion.span>
                    )}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleTestCelebration(opt.value)}
                    className="h-12 w-12 rounded-xl bg-surface-hover flex items-center justify-center shrink-0 font-bold text-sm"
                    title={`Test ${opt.label}`}
                  >
                    <span className="text-lg">▶</span>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-center text-sm opacity-40 mt-12">Qwi Count v0.2</p>
    </main>
  );
}
