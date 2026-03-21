/**
 * ScoreInput.tsx
 *
 * Grid of large tap-friendly score buttons (+1 to +6) plus custom input.
 * Points accumulate during a turn; player presses "Next" to commit.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-20 — added sound effects
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { SCORE_BUTTONS } from '@/lib/constants';
import { Hash, ChevronRight, Minus } from 'lucide-react';
import { useGameSound } from '@/hooks/useGameSound';

export default function ScoreInput() {
  const addPoints = useGameStore((s) => s.addPoints);
  const pendingScore = useGameStore((s) => s.pendingScore);
  const commitTurn = useGameStore((s) => s.commitTurn);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const players = useGameStore((s) => s.players);
  const subtractPoints = useGameStore((s) => s.subtractPoints);
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const { playClick, playChime } = useGameSound();

  const currentPlayer = players[currentPlayerIndex];
  const currentColor = currentPlayer?.color ?? '#E63946';

  const handleAddPoints = (points: number) => {
    playClick();
    addPoints(points);
  };

  const handleCommit = () => {
    playChime();
    commitTurn();
  };

  const handleCustomSubmit = () => {
    const val = parseInt(customValue);
    if (val > 0 && val <= 99) {
      playClick();
      addPoints(val);
      setCustomValue('');
      setShowCustom(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Score buttons grid */}
      <div className="grid grid-cols-3 gap-3">
        {SCORE_BUTTONS.map((points) => (
          <motion.button
            key={points}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAddPoints(points)}
            className="h-16 rounded-2xl text-2xl font-bold text-white shadow-md active:shadow-sm transition-shadow"
            style={{ backgroundColor: currentColor }}
          >
            +{points}
          </motion.button>
        ))}
      </div>

      {/* Custom input */}
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
              className="flex-1 h-14 rounded-2xl bg-surface text-center text-xl font-bold outline-none"
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
              className="h-14 px-4 rounded-2xl bg-surface font-bold"
            >
              ✕
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="custom-toggle"
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustom(true)}
            className="w-full h-14 rounded-2xl bg-surface font-bold text-lg flex items-center justify-center gap-2"
          >
            <Hash size={18} />
            Custom
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pending score display + Next button */}
      <AnimatePresence>
        {pendingScore > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { playClick(); subtractPoints(1); }}
              className="h-14 w-14 rounded-2xl bg-surface flex items-center justify-center shrink-0"
            >
              <Minus size={18} />
            </motion.button>
            <div className="flex-1 h-14 rounded-2xl bg-surface flex items-center justify-center">
              <motion.span
                key={pendingScore}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-extrabold tabular-nums"
                style={{ color: currentColor }}
              >
                +{pendingScore}
              </motion.span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCommit}
              className="h-14 px-6 rounded-2xl text-white font-bold text-lg flex items-center gap-2 shadow-md shrink-0"
              style={{ backgroundColor: currentColor }}
            >
              Next
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
