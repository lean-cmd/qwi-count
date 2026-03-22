/**
 * settings/page.tsx
 *
 * Settings screen: sound, haptics, theme, and language picker.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — replaced celebration picker with language picker
 */

'use client';

import { useSettingsStore } from '@/stores/settingsStore';
import { Volume2, VolumeX, Vibrate, Sun, Moon, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { LANGUAGE_OPTIONS } from '@/lib/i18n';
import type { Language } from '@/types';

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
  const { soundEnabled, hapticsEnabled, theme, language, toggleSound, toggleHaptics, setTheme, setLanguage } =
    useSettingsStore();
  const t = useTranslation();

  return (
    <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
      <h1 className="text-3xl font-extrabold mb-6">{t.settings}</h1>

      <div className="space-y-4">
        {/* Sound */}
        <div className="flex items-center justify-between bg-surface rounded-2xl p-4">
          <div className="flex items-center gap-3">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <div>
              <p className="font-bold">{t.soundEffects}</p>
              <p className="text-sm opacity-60">{t.soundDesc}</p>
            </div>
          </div>
          <Toggle enabled={soundEnabled} onToggle={toggleSound} />
        </div>

        {/* Haptics */}
        <div className="flex items-center justify-between bg-surface rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Vibrate size={20} />
            <div>
              <p className="font-bold">{t.hapticFeedback}</p>
              <p className="text-sm opacity-60">{t.hapticDesc}</p>
            </div>
          </div>
          <Toggle enabled={hapticsEnabled} onToggle={toggleHaptics} />
        </div>

        {/* Theme */}
        <div className="bg-surface rounded-2xl p-4 space-y-3">
          <p className="font-bold">{t.theme}</p>
          <div className="flex gap-2">
            {(['system', 'light', 'dark'] as const).map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => setTheme(themeOption)}
                className={`flex-1 py-3 rounded-xl font-bold capitalize flex items-center justify-center gap-2 transition-colors ${
                  theme === themeOption ? 'bg-primary text-white' : 'bg-surface-hover'
                }`}
              >
                {themeOption === 'light' && <Sun size={16} />}
                {themeOption === 'dark' && <Moon size={16} />}
                {themeOption === 'system' ? t.system : themeOption === 'light' ? t.light : t.dark}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="bg-surface rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Globe size={20} />
            <div>
              <p className="font-bold">{t.language}</p>
              <p className="text-sm opacity-60">{t.languageDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = language === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setLanguage(opt.value as Language)}
                  className={`py-3 px-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface-hover'
                  }`}
                >
                  <span className="flex-1 text-left">{opt.native}</span>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs opacity-80"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-center text-sm opacity-40 mt-12">Qwi Count v0.3</p>
    </main>
  );
}
