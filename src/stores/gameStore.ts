/**
 * gameStore.ts
 *
 * Zustand store managing all game state: players, scores, turns, and undo history.
 * Scoring accumulates during a turn; the player presses "Next" to commit.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-20 — added pending score accumulation + commitTurn
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Player, GameAction, UndoEntry, TileShape } from '@/types';
import { PERFECT_LINE_POINTS, TILE_SHAPES } from '@/lib/constants';

interface GameStore {
  // Game state
  id: string | null;
  players: Player[];
  currentPlayerIndex: number;
  turnNumber: number;
  isFinished: boolean;
  startedAt: string | null;
  finishedAt: string | null;
  endGameBonusPlayerId: string | null;
  actions: GameAction[];
  undoStack: UndoEntry[];

  // Pending turn state (accumulated before committing)
  pendingScore: number;
  pendingBonusCount: number;

  // Actions
  startGame: (playerSetups: { name: string; color: string; shape?: TileShape }[]) => void;
  addPoints: (points: number) => void;
  addPerfectLine: () => void;
  subtractPoints: (points: number) => void;
  commitTurn: () => void;
  skipTurn: () => void;
  undo: () => void;
  endGame: (bonusPlayerId?: string) => void;
  resetGame: () => void;
  hasActiveGame: () => boolean;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      id: null,
      players: [],
      currentPlayerIndex: 0,
      turnNumber: 1,
      isFinished: false,
      startedAt: null,
      finishedAt: null,
      endGameBonusPlayerId: null,
      actions: [],
      undoStack: [],
      pendingScore: 0,
      pendingBonusCount: 0,

      hasActiveGame: () => {
        const state = get();
        return state.id !== null && !state.isFinished;
      },

      startGame: (playerSetups) => {
        // Shuffle shapes and assign one per player
        const shuffled = [...TILE_SHAPES].sort(() => Math.random() - 0.5);
        const players: Player[] = playerSetups.map((p, i) => ({
          id: uuid(),
          name: p.name,
          color: p.color,
          shape: p.shape ?? shuffled[i % shuffled.length],
          score: 0,
          bonusCount: 0,
          turnScores: [],
        }));

        set({
          id: uuid(),
          players,
          currentPlayerIndex: 0,
          turnNumber: 1,
          isFinished: false,
          startedAt: new Date().toISOString(),
          finishedAt: null,
          endGameBonusPlayerId: null,
          actions: [],
          undoStack: [],
          pendingScore: 0,
          pendingBonusCount: 0,
        });
      },

      addPoints: (points) => {
        const state = get();
        if (state.isFinished) return;
        set({ pendingScore: state.pendingScore + points });
      },

      addPerfectLine: () => {
        const state = get();
        if (state.isFinished) return;
        set({
          pendingScore: state.pendingScore + PERFECT_LINE_POINTS,
          pendingBonusCount: state.pendingBonusCount + 1,
        });
      },

      subtractPoints: (points) => {
        const state = get();
        if (state.isFinished) return;
        set({ pendingScore: Math.max(0, state.pendingScore - points) });
      },

      commitTurn: () => {
        const state = get();
        if (state.isFinished || state.players.length === 0) return;

        const player = state.players[state.currentPlayerIndex];
        const points = state.pendingScore;
        const bonuses = state.pendingBonusCount;

        const action: GameAction = {
          type: bonuses > 0 ? 'PERFECT_LINE' : 'ADD_SCORE',
          playerId: player.id,
          points,
          timestamp: new Date().toISOString(),
        };

        const undoEntry: UndoEntry = {
          action,
          previousState: {
            playerScore: player.score,
            playerBonusCount: player.bonusCount,
            playerTurnScores: [...player.turnScores],
            currentPlayerIndex: state.currentPlayerIndex,
            turnNumber: state.turnNumber,
          },
        };

        const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        const nextTurn = nextPlayerIndex === 0 ? state.turnNumber + 1 : state.turnNumber;

        set({
          players: state.players.map((p) =>
            p.id === player.id
              ? {
                  ...p,
                  score: p.score + points,
                  bonusCount: p.bonusCount + bonuses,
                  turnScores: [...p.turnScores, points],
                }
              : p
          ),
          currentPlayerIndex: nextPlayerIndex,
          turnNumber: nextTurn,
          actions: [...state.actions, action],
          undoStack: [...state.undoStack, undoEntry],
          pendingScore: 0,
          pendingBonusCount: 0,
        });
      },

      skipTurn: () => {
        const state = get();
        if (state.isFinished || state.players.length === 0) return;

        const player = state.players[state.currentPlayerIndex];
        const action: GameAction = {
          type: 'SKIP',
          playerId: player.id,
          points: 0,
          timestamp: new Date().toISOString(),
        };

        const undoEntry: UndoEntry = {
          action,
          previousState: {
            playerScore: player.score,
            playerBonusCount: player.bonusCount,
            playerTurnScores: [...player.turnScores],
            currentPlayerIndex: state.currentPlayerIndex,
            turnNumber: state.turnNumber,
          },
        };

        const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        const nextTurn = nextPlayerIndex === 0 ? state.turnNumber + 1 : state.turnNumber;

        set({
          players: state.players.map((p) =>
            p.id === player.id ? { ...p, turnScores: [...p.turnScores, 0] } : p
          ),
          currentPlayerIndex: nextPlayerIndex,
          turnNumber: nextTurn,
          actions: [...state.actions, action],
          undoStack: [...state.undoStack, undoEntry],
          pendingScore: 0,
          pendingBonusCount: 0,
        });
      },

      undo: () => {
        const state = get();
        if (state.undoStack.length === 0) return;

        const lastUndo = state.undoStack[state.undoStack.length - 1];
        const { action, previousState } = lastUndo;

        set({
          players: state.players.map((p) =>
            p.id === action.playerId
              ? {
                  ...p,
                  score: previousState.playerScore,
                  bonusCount: previousState.playerBonusCount,
                  turnScores: previousState.playerTurnScores,
                }
              : p
          ),
          currentPlayerIndex: previousState.currentPlayerIndex,
          turnNumber: previousState.turnNumber,
          actions: state.actions.slice(0, -1),
          undoStack: state.undoStack.slice(0, -1),
          pendingScore: 0,
          pendingBonusCount: 0,
        });
      },

      endGame: (bonusPlayerId) => {
        const state = get();
        if (state.isFinished) return;

        const now = new Date().toISOString();
        const updates: Partial<GameStore> = {
          isFinished: true,
          finishedAt: now,
          pendingScore: 0,
          pendingBonusCount: 0,
        };

        if (bonusPlayerId) {
          const bonusAction: GameAction = {
            type: 'END_GAME_BONUS',
            playerId: bonusPlayerId,
            points: 6,
            timestamp: now,
          };
          updates.endGameBonusPlayerId = bonusPlayerId;
          updates.actions = [...state.actions, bonusAction];
          updates.players = state.players.map((p) =>
            p.id === bonusPlayerId ? { ...p, score: p.score + 6 } : p
          );
        }

        set(updates as GameStore);
      },

      resetGame: () => {
        set({
          id: null,
          players: [],
          currentPlayerIndex: 0,
          turnNumber: 1,
          isFinished: false,
          startedAt: null,
          finishedAt: null,
          endGameBonusPlayerId: null,
          actions: [],
          undoStack: [],
          pendingScore: 0,
          pendingBonusCount: 0,
        });
      },
    }),
    {
      name: 'qwi-count-game',
    }
  )
);
