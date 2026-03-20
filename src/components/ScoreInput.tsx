/**
 * ScoreInput.tsx
 *
 * Grid of large tap-friendly score buttons (+1 to +6) plus custom input.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { SCORE_BUTTONS } from '@/lib/constants';
import { Hash } from 'lucide-react';

export default function ScoreInput() {
  const addScore = useGameStore((s) => s.addScore);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const players = useGameStore((s) => s.players);
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const currentColor = players[currentPlayerIndex]?.color ?? '#FF6B6B';

  const handleScorePress = (points: number) => {
    addScore(points);
  };

  const handleCustomSubmit = () => {
    const val = parseInt(customValue);
    if (val > 0 && val <= 99) {
      addScore(val);
      setCustomValue('');
      setShowCustom(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {SCORE_BUTTONS.map((points) => (
          <motion.button
            key={points}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleScorePress(points)}
            className="h-16 rounded-2xl text-2xl font-bold text-white shadow-md active:shadow-sm transition-shadow"
            style={{ backgroundColor: currentColor }}
          >
            +{points}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showCustom ? (
          <motion.div
            key="custom-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2"
          >
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={99}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="Points..."
              autoFocus
              className="flex-1 h-14 rounded-2xl bg-foreground/10 text-center text-xl font-bold outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCustomSubmit}
              className="h-14 px-6 rounded-2xl text-white font-bold text-lg"
              style={{ backgroundColor: currentColor }}
            >
              Add
            </motion.button>
            <button
              onClick={() => { setShowCustom(false); setCustomValue(''); }}
              className="h-14 px-4 rounded-2xl bg-foreground/10 font-bold"
            >
              ✕
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="custom-toggle"
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustom(true)}
            className="w-full h-14 rounded-2xl bg-foreground/10 font-bold text-lg flex items-center justify-center gap-2"
          >
            <Hash size={18} />
            Custom
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
