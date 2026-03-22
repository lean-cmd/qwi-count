/**
 * ScoreInput.tsx
 *
 * Grid of large tap-friendly score buttons (+1 to +6) plus custom input.
 * Points accumulate during a turn; player presses "Next" to commit.
 * Custom and Next/pending always share the same row to avoid layout shift.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — fixed layout shift, custom + next in same row
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { SCORE_BUTTONS } from '@/lib/constants';
import { Hash, ChevronRight, Minus, X } from 'lucide-react';
import { useGameSound } from '@/hooks/useGameSound';

/** Returns true if the color is light enough to need dark text */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Perceived brightness formula
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

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
  const currentColor = currentPlayer?.color ?? '#E8192C';
  const textOnColor = isLightColor(currentColor) ? '#1A1A2E' : '#FFFFFF';

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
            className="h-16 rounded-2xl text-2xl font-bold shadow-md active:shadow-sm transition-shadow"
            style={{ backgroundColor: currentColor, color: textOnColor }}
          >
            +{points}
          </motion.button>
        ))}
      </div>

      {/* Bottom row: always present, switches between Custom input and Pending/Next */}
      <div className="flex items-center gap-2 h-14">
        <AnimatePresence mode="wait" initial={false}>
          {showCustom ? (
            <motion.div
              key="custom-input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 flex-1"
            >
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={99}
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                placeholder="Pts"
                autoFocus
                className="flex-1 h-14 rounded-2xl bg-surface text-center text-xl font-bold outline-none min-w-0"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCustomSubmit}
                className="h-14 px-5 rounded-2xl font-bold text-lg shrink-0"
                style={{ backgroundColor: currentColor, color: textOnColor }}
              >
                Add
              </motion.button>
              <button
                onClick={() => { setShowCustom(false); setCustomValue(''); }}
                className="h-14 w-14 rounded-2xl bg-surface font-bold flex items-center justify-center shrink-0"
              >
                <X size={18} />
              </button>
            </motion.div>
          ) : pendingScore > 0 ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 flex-1"
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
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleCommit}
                className="h-14 px-8 rounded-2xl font-extrabold text-lg flex items-center gap-1.5 shadow-lg shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${currentColor}, ${currentColor}CC)`,
                  color: textOnColor,
                  boxShadow: `0 4px 14px ${currentColor}50`,
                }}
              >
                Next
                <ChevronRight size={22} strokeWidth={3} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="custom-toggle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCustom(true)}
              className="flex-1 h-14 rounded-2xl bg-surface font-bold text-lg flex items-center justify-center gap-2"
            >
              <Hash size={18} />
              Custom
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
