/**
 * game/page.tsx
 *
 * Active game screen: turn indicator, scoreboard, score input, bonus button,
 * undo/skip/end controls.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Undo2, SkipForward, Square } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import TurnIndicator from '@/components/TurnIndicator';
import ScoreBoard from '@/components/ScoreBoard';
import ScoreInput from '@/components/ScoreInput';
import BonusButton from '@/components/BonusButton';
import GameOverSummary from '@/components/GameOverSummary';
import { END_GAME_BONUS } from '@/lib/constants';
import { useGameSound } from '@/hooks/useGameSound';

function textForColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? '#1A1A2E' : '#FFFFFF';
}

export default function GamePage() {
  const router = useRouter();
  const { players, isFinished, undoStack, undo, skipTurn, endGame, id, pendingScore, currentPlayerIndex } = useGameStore();
  const { playClick } = useGameSound();
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // Redirect if no game
  if (!id) {
    return (
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium opacity-60">No active game</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-2xl bg-primary text-white font-bold"
          >
            Start a new game
          </motion.button>
        </div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <GameOverSummary />
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col px-4 py-4 max-w-md mx-auto w-full gap-4">
      <TurnIndicator />
      <ScoreBoard />
      <ScoreInput />
      <BonusButton />

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { playClick(); undo(); }}
          disabled={undoStack.length === 0}
          className="flex-1 h-12 rounded-xl bg-surface font-bold flex items-center justify-center gap-2 disabled:opacity-30"
        >
          <Undo2 size={16} />
          Undo
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { playClick(); skipTurn(); }}
          className="flex-1 h-12 rounded-xl bg-surface font-bold flex items-center justify-center gap-2"
        >
          <SkipForward size={16} />
          Skip
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEndConfirm(true)}
          className="flex-1 h-12 rounded-xl bg-surface font-bold flex items-center justify-center gap-2 text-red-500"
        >
          <Square size={16} />
          End
        </motion.button>
      </div>

      {/* End Game Confirmation Modal */}
      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setShowEndConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-3xl p-6 w-full max-w-sm space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-center">End Game?</h3>
              {pendingScore > 0 && (
                <div className="bg-secondary/15 rounded-xl p-3 text-center text-sm font-medium">
                  <span className="font-bold" style={{ color: players[currentPlayerIndex]?.color }}>
                    {players[currentPlayerIndex]?.name}
                  </span>
                  {' '}has <span className="font-bold">+{pendingScore} pts</span> pending — these will be added automatically.
                </div>
              )}
              <p className="text-center opacity-60 text-sm">
                Award +{END_GAME_BONUS} end-game bonus to a player, or end without bonus.
              </p>
              <div className="space-y-2">
                {players.map((player) => (
                  <motion.button
                    key={player.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      endGame(player.id);
                      setShowEndConfirm(false);
                    }}
                    className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    style={{ backgroundColor: player.color, color: textForColor(player.color) }}
                  >
                    +{END_GAME_BONUS} to {player.name}
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowEndConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-surface font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    endGame();
                    setShowEndConfirm(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold"
                >
                  End (no bonus)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
