/**
 * BonusButton.tsx
 *
 * Big celebration button that awards 12 points for a perfect line.
 * Uses the user's chosen celebration style from settings.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — uses selectable celebration style
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Sparkles } from 'lucide-react';
import { useGameSound } from '@/hooks/useGameSound';
import { playCelebration } from '@/lib/celebrations';

export default function BonusButton() {
  const addPerfectLine = useGameStore((s) => s.addPerfectLine);
  const celebration = useSettingsStore((s) => s.celebration);
  const { playFanfare } = useGameSound();
  const [showSmiley, setShowSmiley] = useState(false);

  const handleBonus = () => {
    playCelebration(celebration);
    playFanfare();
    addPerfectLine();
    setShowSmiley(true);
    setTimeout(() => setShowSmiley(false), 2200);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleBonus}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-3"
      >
        <Sparkles size={24} />
        PERFECT LINE!
        <Sparkles size={24} />
      </motion.button>

      {/* Smiley face celebration overlay */}
      <AnimatePresence>
        {showSmiley && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, y: -80 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.8, repeat: 2, ease: 'easeInOut' }}
                className="text-[120px] leading-none drop-shadow-lg"
              >
                😄
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-extrabold text-primary drop-shadow-md mt-2"
              >
                PERFECT LINE!
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
