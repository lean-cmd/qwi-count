/**
 * GameOverSummary.tsx
 *
 * Final scores ranked with score progression chart, game stats,
 * celebration effects, and WhatsApp share button.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-20 — added chart, stats, fixed WhatsApp share
 */

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useRouter } from 'next/navigation';
import { Trophy, Home, RotateCcw, Star } from 'lucide-react';
import TileShapeIcon from '@/components/TileShapeIcon';
import ScoreChart from '@/components/ScoreChart';
import GameStats from '@/components/GameStats';
import { useGameSound } from '@/hooks/useGameSound';
import { playCelebration } from '@/lib/celebrations';
import type { Player } from '@/types';

const APP_URL = 'https://qwi-count.vercel.app';

function buildShareText(sorted: Player[]): string {
  const lines: string[] = [];

  lines.push('*Qwi Count - Final Scores*');
  lines.push('');

  sorted.forEach((player, i) => {
    const prefix = i === 0 ? '1st' : i === 1 ? '2nd' : i === 2 ? '3rd' : `${i + 1}th`;
    const stars = player.bonusCount > 0 ? ` (${'*'.repeat(player.bonusCount)} perfect)` : '';
    lines.push(`${prefix}  ${player.name}: *${player.score} pts*${stars}`);
  });

  lines.push('');
  lines.push(`Winner: ${sorted[0].name}!`);
  lines.push('');
  lines.push(`Play at ${APP_URL}`);

  return lines.join('\n');
}

export default function GameOverSummary() {
  const players = useGameStore((s) => s.players);
  const turnNumber = useGameStore((s) => s.turnNumber);
  const resetGame = useGameStore((s) => s.resetGame);
  const router = useRouter();
  const celebration = useSettingsStore((s) => s.celebration);
  const { playVictory } = useGameSound();
  const hasPlayed = useRef(false);

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;
    // Play the user's chosen celebration style
    playCelebration(celebration);
    // Plus a delayed second wave for the victory
    setTimeout(() => playCelebration(celebration), 1500);
    playVictory();
  }, [playVictory, celebration]);

  const handleNewGame = () => {
    resetGame();
    router.push('/');
  };

  const handleHome = () => {
    resetGame();
    router.push('/');
  };

  const handleShare = () => {
    const text = buildShareText(sorted);

    // Try native share first (better on mobile), fall back to WhatsApp URL
    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto space-y-5 p-4"
    >
      {/* Winner celebration */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
        >
          <Trophy size={56} className="mx-auto" style={{ color: winner.color }} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-extrabold"
          style={{ color: winner.color }}
        >
          {winner.name} wins!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-5xl font-bold tabular-nums"
        >
          {winner.score}
        </motion.p>
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
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-3 bg-surface rounded-2xl p-4"
            >
              <span className="text-lg font-bold w-7 text-center opacity-50">
                {index + 1}
              </span>
              <TileShapeIcon shape={player.shape} color={player.color} size={32} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg truncate">{player.name}</p>
                <div className="flex gap-3 text-sm opacity-60">
                  <span>Best: {highestTurn}</span>
                  {player.bonusCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Star size={12} fill={player.color} stroke={player.color} />
                      {player.bonusCount}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-2xl font-bold tabular-nums">{player.score}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Score Progression Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <ScoreChart players={players} />
      </motion.div>

      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <GameStats players={players} turnNumber={turnNumber} />
      </motion.div>

      {/* Share */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/25"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Share Scores
      </motion.button>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="flex gap-3"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleHome}
          className="flex-1 py-4 rounded-2xl bg-surface font-bold text-lg flex items-center justify-center gap-2"
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
      </motion.div>
    </motion.div>
  );
}
