/**
 * page.tsx (Home)
 *
 * Home screen: New Game, Resume Game, links to rules.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Play, RotateCcw, BookOpen, Sparkles } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import PlayerSetup from '@/components/PlayerSetup';

export default function HomePage() {
  const router = useRouter();
  const hasActiveGame = useGameStore((s) => s.hasActiveGame);
  const [showSetup, setShowSetup] = useState(false);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <AnimatePresence mode="wait">
        {showSetup ? (
          <PlayerSetup key="setup" onCancel={() => setShowSetup(false)} />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm space-y-8 text-center"
          >
            {/* Logo / Title */}
            <div className="space-y-2">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="flex items-center justify-center gap-2"
              >
                <Sparkles size={32} className="text-primary" />
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Qwi
                  <span className="text-primary"> Count</span>
                </h1>
                <Sparkles size={32} className="text-secondary" />
              </motion.div>
              <p className="text-foreground/50 font-medium">
                Track scores for your tile games
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSetup(true)}
                className="w-full py-5 rounded-2xl bg-primary text-white font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/25"
              >
                <Play size={24} fill="white" />
                New Game
              </motion.button>

              {hasActiveGame() && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/game')}
                  className="w-full py-4 rounded-2xl bg-surface font-bold text-lg flex items-center justify-center gap-3"
                >
                  <RotateCcw size={20} />
                  Resume Game
                </motion.button>
              )}
            </div>

            {/* Links */}
            <div className="flex justify-center gap-6 pt-4">
              <button
                onClick={() => router.push('/rules')}
                className="flex items-center gap-2 text-foreground/50 font-medium"
              >
                <BookOpen size={18} />
                Rules
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
