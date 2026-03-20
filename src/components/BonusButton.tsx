/**
 * BonusButton.tsx
 *
 * Big celebration button that awards 12 points for a perfect line,
 * triggers confetti + animation.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/stores/gameStore';
import { Sparkles } from 'lucide-react';

function triggerBonusConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#E63946', '#F4A261', '#E9C46A', '#2A9D8F', '#264653', '#7B2CBF'],
  });
}

export default function BonusButton() {
  const addPerfectLine = useGameStore((s) => s.addPerfectLine);

  const handleBonus = () => {
    triggerBonusConfetti();
    addPerfectLine();
  };

  return (
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
  );
}
