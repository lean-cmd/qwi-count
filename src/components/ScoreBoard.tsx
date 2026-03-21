/**
 * ScoreBoard.tsx
 *
 * Displays all players with their scores and bonus line counts.
 * Active player is highlighted.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Star } from 'lucide-react';
import TileShapeIcon from '@/components/TileShapeIcon';

export default function ScoreBoard() {
  const players = useGameStore((s) => s.players);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const isFinished = useGameStore((s) => s.isFinished);

  return (
    <div className="space-y-2 w-full">
      {players.map((player, index) => {
        const isActive = index === currentPlayerIndex && !isFinished;
        return (
          <motion.div
            key={player.id}
            layout
            className="relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all"
            style={{
              backgroundColor: isActive ? `${player.color}18` : 'transparent',
              borderLeft: isActive ? `4px solid ${player.color}` : '4px solid transparent',
            }}
          >
            <TileShapeIcon shape={player.shape} color={player.color} size={32} className="shrink-0" />
            <span className="font-bold text-lg flex-1 truncate">{player.name}</span>
            <div className="flex items-center gap-1 mr-1">
              {Array.from({ length: player.bonusCount }, (_, i) => (
                <Star key={i} size={14} fill={player.color} stroke={player.color} />
              ))}
            </div>
            <motion.span
              key={player.score}
              initial={{ scale: 1.3, color: player.color }}
              animate={{ scale: 1, color: 'inherit' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-2xl font-bold tabular-nums min-w-[3ch] text-right"
            >
              {player.score}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
