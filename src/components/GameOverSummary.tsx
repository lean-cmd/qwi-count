/**
 * GameOverSummary.tsx
 *
 * Final scores ranked with stats, celebration effects (confetti, streamers,
 * party poppers, clapping sound), and WhatsApp share button.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-20 — added victory celebration + WhatsApp share
 */

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/stores/gameStore';
import { useRouter } from 'next/navigation';
import { Trophy, Home, RotateCcw, Star, Share2 } from 'lucide-react';
import TileShapeIcon from '@/components/TileShapeIcon';
import { useGameSound } from '@/hooks/useGameSound';

const PARTY_COLORS = ['#E63946', '#F4A261', '#E9C46A', '#2A9D8F', '#264653', '#7B2CBF', '#FF6B6B', '#FFD93D'];

function triggerVictoryConfetti() {
  // Wave 1: Big center burst (party popper)
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { x: 0.5, y: 0.6 },
    colors: PARTY_COLORS,
    startVelocity: 50,
    gravity: 0.7,
    ticks: 250,
  });

  // Wave 2: Left party popper
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.8 },
      colors: PARTY_COLORS,
      startVelocity: 60,
      ticks: 200,
    });
  }, 300);

  // Wave 3: Right party popper
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.8 },
      colors: PARTY_COLORS,
      startVelocity: 60,
      ticks: 200,
    });
  }, 500);

  // Wave 4: Streamers — long thin particles from top
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 180,
      origin: { x: 0.5, y: -0.1 },
      colors: PARTY_COLORS,
      startVelocity: 15,
      gravity: 0.4,
      ticks: 400,
      drift: 1,
      scalar: 1.5,
    });
  }, 700);

  // Wave 5: More streamers from sides
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 45,
      spread: 40,
      origin: { x: 0.1, y: 0 },
      colors: PARTY_COLORS,
      startVelocity: 20,
      gravity: 0.3,
      ticks: 350,
      drift: 0.5,
      scalar: 1.4,
    });
    confetti({
      particleCount: 50,
      angle: 135,
      spread: 40,
      origin: { x: 0.9, y: 0 },
      colors: PARTY_COLORS,
      startVelocity: 20,
      gravity: 0.3,
      ticks: 350,
      drift: -0.5,
      scalar: 1.4,
    });
  }, 1000);

  // Wave 6: Final sparkle shower
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 160,
      origin: { x: 0.5, y: -0.05 },
      colors: PARTY_COLORS,
      startVelocity: 30,
      gravity: 1,
      ticks: 300,
      scalar: 0.9,
    });
  }, 1500);

  // Wave 7: Delayed second burst (encore)
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.3, y: 0.5 },
      colors: PARTY_COLORS,
      startVelocity: 40,
    });
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.7, y: 0.5 },
      colors: PARTY_COLORS,
      startVelocity: 40,
    });
  }, 2200);
}

/** Build the WhatsApp share text from the final scoreboard. */
function buildShareText(sorted: ReturnType<typeof useGameStore.getState>['players'], appUrl: string): string {
  const trophy = '🏆';
  const medal = ['🥇', '🥈', '🥉'];

  let text = `${trophy} *Qwi Count — Final Scores* ${trophy}\n\n`;

  sorted.forEach((player, i) => {
    const icon = i < 3 ? medal[i] : '▪️';
    const stars = player.bonusCount > 0 ? ' ⭐'.repeat(player.bonusCount) : '';
    text += `${icon} ${player.name}: *${player.score}*${stars}\n`;
  });

  text += `\n🎉 ${sorted[0].name} wins!\n`;
  text += `\nTrack your games → ${appUrl}`;

  return text;
}

const APP_URL = 'https://qwi-count.vercel.app';

export default function GameOverSummary() {
  const players = useGameStore((s) => s.players);
  const resetGame = useGameStore((s) => s.resetGame);
  const router = useRouter();
  const { playVictory } = useGameSound();
  const hasPlayed = useRef(false);

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  // Trigger celebration once on mount
  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;
    triggerVictoryConfetti();
    playVictory();
  }, [playVictory]);

  const handleNewGame = () => {
    resetGame();
    router.push('/');
  };

  const handleHome = () => {
    resetGame();
    router.push('/');
  };

  const handleShare = () => {
    const text = buildShareText(sorted, APP_URL);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto space-y-6 p-4"
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.4 }}
          className="text-5xl"
        >
          🎉🥳🎉
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-extrabold"
          style={{ color: winner.color }}
        >
          {winner.name} wins!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
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
              transition={{ delay: 0.8 + index * 0.12 }}
              className="flex items-center gap-3 bg-surface rounded-2xl p-4"
            >
              <span className="text-2xl font-bold w-8 text-center opacity-40">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
              </span>
              <TileShapeIcon shape={player.shape} color={player.color} size={32} />
              <div className="flex-1">
                <p className="font-bold text-lg">{player.name}</p>
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

      {/* Share to WhatsApp */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/25"
      >
        <Share2 size={20} />
        Share to WhatsApp
      </motion.button>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
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
