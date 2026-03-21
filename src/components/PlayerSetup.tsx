/**
 * PlayerSetup.tsx
 *
 * Modal/inline component for setting up 2-4 players with names, colors, and shapes.
 * Each player gets a random tile shape assigned on mount.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-20 — added random tile shape assignment
 */

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Play } from 'lucide-react';
import { PLAYER_COLORS, MIN_PLAYERS, MAX_PLAYERS, TILE_SHAPES } from '@/lib/constants';
import { useGameStore } from '@/stores/gameStore';
import { useRouter } from 'next/navigation';
import type { TileShape } from '@/types';
import TileShapeIcon from '@/components/TileShapeIcon';

interface PlayerConfig {
  name: string;
  color: string;
  shape: TileShape;
}

export default function PlayerSetup({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const startGame = useGameStore((s) => s.startGame);
  const [playerCount, setPlayerCount] = useState(2);

  // Shuffle shapes once on mount so each player gets a unique random shape
  const shuffledShapes = useMemo(() => {
    return [...TILE_SHAPES].sort(() => Math.random() - 0.5);
  }, []);

  const [players, setPlayers] = useState<PlayerConfig[]>(
    Array.from({ length: MAX_PLAYERS }, (_, i) => ({
      name: '',
      color: PLAYER_COLORS[i].hex,
      shape: shuffledShapes[i % shuffledShapes.length],
    }))
  );

  const updatePlayer = (index: number, updates: Partial<PlayerConfig>) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...updates } : p))
    );
  };

  const usedColors = players.slice(0, playerCount).map((p) => p.color);

  const handleStart = () => {
    const activePlayers = players.slice(0, playerCount).map((p, i) => ({
      ...p,
      name: p.name.trim() || `Player ${i + 1}`,
    }));
    startGame(activePlayers);
    router.push('/game');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto space-y-6"
    >
      {/* Player count selector */}
      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold">How many players?</h2>
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setPlayerCount((c) => Math.max(MIN_PLAYERS, c - 1))}
            disabled={playerCount <= MIN_PLAYERS}
            className="w-12 h-12 rounded-full bg-surface flex items-center justify-center disabled:opacity-30"
          >
            <Minus size={20} />
          </motion.button>
          <span className="text-5xl font-bold w-16 text-center tabular-nums">
            {playerCount}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setPlayerCount((c) => Math.min(MAX_PLAYERS, c + 1))}
            disabled={playerCount >= MAX_PLAYERS}
            className="w-12 h-12 rounded-full bg-surface flex items-center justify-center disabled:opacity-30"
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>

      {/* Player name + shape + color inputs */}
      <div className="space-y-3">
        {Array.from({ length: playerCount }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 bg-surface rounded-2xl p-3"
          >
            <TileShapeIcon
              shape={players[i].shape}
              color={players[i].color}
              size={40}
              className="shrink-0"
            />
            <input
              type="text"
              value={players[i].name}
              onChange={(e) => updatePlayer(i, { name: e.target.value })}
              onFocus={(e) => e.target.select()}
              autoFocus={i === 0}
              className="flex-1 bg-transparent text-lg font-semibold outline-none placeholder:text-foreground/30 min-w-0"
              placeholder={`Player ${i + 1}`}
              maxLength={16}
              enterKeyHint="next"
            />
            <div className="flex gap-1.5 shrink-0">
              {PLAYER_COLORS.map((c) => {
                const isUsed = usedColors.includes(c.hex) && players[i].color !== c.hex;
                return (
                  <button
                    key={c.hex}
                    onClick={() => updatePlayer(i, { color: c.hex })}
                    disabled={isUsed}
                    className="w-6 h-6 rounded-full transition-all disabled:opacity-20"
                    style={{
                      backgroundColor: c.hex,
                      outline: players[i].color === c.hex ? '2px solid' : 'none',
                      outlineColor: c.hex,
                      outlineOffset: '2px',
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 py-4 rounded-2xl bg-surface font-bold text-lg"
          >
            Cancel
          </button>
        )}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
        >
          <Play size={20} fill="white" />
          Start Game
        </motion.button>
      </div>
    </motion.div>
  );
}
