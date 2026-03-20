/**
 * GameOverSummary.tsx
 *
 * Final scores ranked with stats and action buttons.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { useRouter } from 'next/navigation';
import { Trophy, Home, RotateCcw, Star } from 'lucide-react';

export default function GameOverSummary() {
  const players = useGameStore((s) => s.players);
  const resetGame = useGameStore((s) => s.resetGame);
  const router = useRouter();

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  const handleNewGame = () => {
    resetGame();
    router.push('/');
  };

  const handleHome = () => {
    resetGame();
    router.push('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto space-y-6 p-4"
    >
      {/* Winner */}
      <div className="text-center space-y-2">
        <Trophy size={48} className="mx-auto" style={{ color: winner.color }} />
        <h1 className="text-3xl font-extrabold" style={{ color: winner.color }}>
          {winner.name} wins!
        </h1>
        <p className="text-5xl font-bold tabular-nums">{winner.score}</p>
      </div>

      {/* Rankings */}
      <div className="space-y-2">
        {sorted.map((player, index) => {
          const highestTurn = player.turnScores.length > 0
            ? Math.max(...player.turnScores)
            : 0;

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 bg-foreground/5 rounded-2xl p-4"
            >
              <span className="text-2xl font-bold w-8 text-center opacity-40">
                {index + 1}
              </span>
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: player.color }}
              />
              <div className="flex-1">
                <p className="font-bold text-lg">{player.name}</p>
                <div className="flex gap-3 text-sm opacity-60">
                  <span>Best turn: {highestTurn}</span>
                  {player.bonusCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Star size={12} fill={player.color} stroke={player.color} />
                      {player.bonusCount} perfect line{player.bonusCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-2xl font-bold tabular-nums">{player.score}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleHome}
          className="flex-1 py-4 rounded-2xl bg-foreground/10 font-bold text-lg flex items-center justify-center gap-2"
        >
          <Home size={20} />
          Home
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNewGame}
          className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
        >
          <RotateCcw size={20} />
          New Game
        </motion.button>
      </div>
    </motion.div>
  );
}
