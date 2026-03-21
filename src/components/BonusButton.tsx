/**
 * BonusButton.tsx
 *
 * Big celebration button that awards 12 points for a perfect line,
 * triggers epic confetti + sound + smiley face overlay.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-20 — enhanced confetti, added smiley overlay
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/stores/gameStore';
import { Sparkles } from 'lucide-react';
import { useGameSound } from '@/hooks/useGameSound';

const CONFETTI_COLORS = ['#E63946', '#F4A261', '#E9C46A', '#2A9D8F', '#264653', '#7B2CBF'];

function triggerBonusConfetti() {
  // Initial big burst from center
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: CONFETTI_COLORS,
    startVelocity: 45,
    gravity: 0.8,
    ticks: 200,
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: CONFETTI_COLORS,
      startVelocity: 55,
    });
  }, 150);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: CONFETTI_COLORS,
      startVelocity: 55,
    });
  }, 300);

  // Shower from top
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 160,
      origin: { x: 0.5, y: -0.1 },
      colors: CONFETTI_COLORS,
      startVelocity: 25,
      gravity: 1.2,
      ticks: 250,
    });
  }, 500);

  // Final sparkle burst
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 360,
      origin: { x: 0.5, y: 0.4 },
      colors: CONFETTI_COLORS,
      startVelocity: 30,
      gravity: 0.5,
      scalar: 0.8,
      ticks: 150,
    });
  }, 800);
}

export default function BonusButton() {
  const addPerfectLine = useGameStore((s) => s.addPerfectLine);
  const { playFanfare } = useGameSound();
  const [showSmiley, setShowSmiley] = useState(false);

  const handleBonus = () => {
    triggerBonusConfetti();
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
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
              className="text-center"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: 2,
                  ease: 'easeInOut',
                }}
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
