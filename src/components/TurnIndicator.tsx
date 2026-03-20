/**
 * TurnIndicator.tsx
 *
 * Shows whose turn it is with their name and color.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

export default function TurnIndicator() {
  const players = useGameStore((s) => s.players);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const turnNumber = useGameStore((s) => s.turnNumber);

  const currentPlayer = players[currentPlayerIndex];
  if (!currentPlayer) return null;

  return (
    <div className="text-center space-y-1">
      <p className="text-sm font-medium opacity-60">Round {turnNumber}</p>
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentPlayer.id + '-' + turnNumber}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-2xl font-bold"
          style={{ color: currentPlayer.color }}
        >
          {currentPlayer.name}&apos;s turn
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
