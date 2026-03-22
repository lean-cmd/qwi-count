/**
 * BonusButton.tsx
 *
 * Big celebration button that awards 12 points for a perfect line.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — i18n support, direct confetti
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Sparkles } from 'lucide-react';
import { useGameSound } from '@/hooks/useGameSound';
import { useTranslation } from '@/hooks/useTranslation';
import confetti from 'canvas-confetti';

const COLORS = ['#E8192C', '#F58220', '#FFD100', '#00A651', '#0054A6', '#7B2D8E'];

function fireConfetti() {
  confetti({
    particleCount: 200, spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: COLORS, startVelocity: 45, gravity: 0.8, ticks: 200,
  });
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors: COLORS, startVelocity: 55 });
  }, 150);
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: COLORS, startVelocity: 55 });
  }, 300);
  setTimeout(() => {
    confetti({ particleCount: 120, spread: 160, origin: { x: 0.5, y: -0.1 }, colors: COLORS, startVelocity: 25, gravity: 1.2, ticks: 250 });
  }, 500);
}

export default function BonusButton() {
  const addPerfectLine = useGameStore((s) => s.addPerfectLine);
  const { playFanfare } = useGameSound();
  const [showSmiley, setShowSmiley] = useState(false);
  const t = useTranslation();

  const handleBonus = () => {
    fireConfetti();
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
        {t.perfectLine}
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
                {t.perfectLine}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
