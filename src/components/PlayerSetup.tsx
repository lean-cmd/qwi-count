/**
 * PlayerSetup.tsx
 *
 * Two-step setup:
 *  Step 1 — Pick player count, enter names, choose colors.
 *           Drag handles to reorder players (turn order).
 *  Step 2 — "Who starts?" — tap a player to mark them as first.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — i18n support
 */

'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Play, GripVertical, ArrowRight, ArrowLeft } from 'lucide-react';
import { PLAYER_COLORS, MIN_PLAYERS, MAX_PLAYERS, TILE_SHAPES } from '@/lib/constants';
import { useGameStore } from '@/stores/gameStore';
import { useRouter } from 'next/navigation';
import type { TileShape } from '@/types';
import TileShapeIcon from '@/components/TileShapeIcon';
import { useTranslation } from '@/hooks/useTranslation';

interface PlayerConfig {
  name: string;
  color: string;
  shape: TileShape;
}

export default function PlayerSetup({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter();
  const startGame = useGameStore((s) => s.startGame);
  const [playerCount, setPlayerCount] = useState(2);
  const [step, setStep] = useState<'setup' | 'who-starts'>('setup');
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number | null>(null);
  const t = useTranslation();

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

  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const movePlayer = useCallback((from: number, to: number) => {
    if (from === to) return;
    setPlayers((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }, []);

  const handleTouchStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleTouchMove = (e: React.TouchEvent, playerAreaRef: React.RefObject<HTMLDivElement | null>) => {
    if (dragIndexRef.current === null || !playerAreaRef.current) return;
    const touch = e.touches[0];
    const children = playerAreaRef.current.children;
    for (let i = 0; i < Math.min(children.length, playerCount); i++) {
      const rect = children[i].getBoundingClientRect();
      if (touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        setDragOverIndex(i);
        return;
      }
    }
  };

  const handleTouchEnd = () => {
    if (dragIndexRef.current !== null && dragOverIndex !== null) {
      movePlayer(dragIndexRef.current, dragOverIndex);
    }
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  const usedColors = players.slice(0, playerCount).map((p) => p.color);

  const activePlayers = players.slice(0, playerCount).map((p, i) => ({
    ...p,
    name: p.name.trim() || `Player ${i + 1}`,
  }));

  const handleNext = () => {
    setStep('who-starts');
  };

  const handleStart = (firstIndex: number) => {
    const reordered = [
      ...activePlayers.slice(firstIndex),
      ...activePlayers.slice(0, firstIndex),
    ];
    startGame(reordered);
    router.push('/game');
  };

  const playerListRef = useRef<HTMLDivElement | null>(null);

  if (step === 'who-starts') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md mx-auto space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold">{t.whoStarts}</h2>
          <p className="text-sm opacity-50">
            {t.whoStartsDesc}
          </p>
        </div>

        <div className="space-y-3">
          {activePlayers.map((player, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setStartingPlayerIndex(i);
                handleStart(i);
              }}
              className="w-full flex items-center gap-3 rounded-2xl p-4 transition-all"
              style={{
                backgroundColor: startingPlayerIndex === i
                  ? `${player.color}20`
                  : 'var(--surface)',
                border: startingPlayerIndex === i
                  ? `2px solid ${player.color}`
                  : '2px solid transparent',
              }}
            >
              <TileShapeIcon shape={player.shape} color={player.color} size={40} className="shrink-0" />
              <span className="font-bold text-lg flex-1 text-left">{player.name}</span>
              <Play size={20} style={{ color: player.color }} fill={player.color} />
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => setStep('setup')}
          className="flex items-center gap-2 mx-auto text-foreground/50 font-medium"
        >
          <ArrowLeft size={16} />
          {t.back}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto space-y-6"
    >
      {/* Player count selector */}
      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold">{t.howManyPlayers}</h2>
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

      {/* Player name + shape + color inputs (draggable) */}
      <div>
        <p className="text-xs opacity-40 mb-2 text-center">{t.dragToReorder}</p>
        <div
          ref={playerListRef}
          className="space-y-3"
          onTouchEnd={handleTouchEnd}
        >
          {Array.from({ length: playerCount }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 bg-surface rounded-2xl p-3"
              style={{
                borderTop: dragOverIndex === i && dragIndexRef.current !== null && dragIndexRef.current !== i
                  ? '2px solid var(--primary)'
                  : '2px solid transparent',
              }}
              draggable
              onDragStart={() => { dragIndexRef.current = i; }}
              onDragOver={(e) => { e.preventDefault(); setDragOverIndex(i); }}
              onDragEnd={() => {
                if (dragIndexRef.current !== null && dragOverIndex !== null) {
                  movePlayer(dragIndexRef.current, dragOverIndex);
                }
                dragIndexRef.current = null;
                setDragOverIndex(null);
              }}
              onTouchStart={() => handleTouchStart(i)}
              onTouchMove={(e) => handleTouchMove(e, playerListRef)}
            >
              <div className="touch-none cursor-grab active:cursor-grabbing opacity-30 shrink-0">
                <GripVertical size={18} />
              </div>
              <TileShapeIcon
                shape={players[i].shape}
                color={players[i].color}
                size={36}
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
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 py-4 rounded-2xl bg-surface font-bold text-lg"
          >
            {t.cancel}
          </button>
        )}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
        >
          {t.next}
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}
