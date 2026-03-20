/**
 * gameStore.ts
 *
 * Zustand store managing all game state: players, scores, turns, and undo history.
 * Persists active game to localStorage so it survives page refreshes.
 *
 * @author claude — 2026-03-20
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Player, GameAction, UndoEntry } from '@/types';
import { PERFECT_LINE_POINTS } from '@/lib/constants';

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

  // Actions
  startGame: (playerSetups: { name: string; color: string }[]) => void;
  addScore: (points: number) => void;
  addPerfectLine: () => void;
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

      hasActiveGame: () => {
        const state = get();
        return state.id !== null && !state.isFinished;
      },

      startGame: (playerSetups) => {
        const players: Player[] = playerSetups.map((p) => ({
          id: uuid(),
          name: p.name,
          color: p.color,
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
        });
      },

      addScore: (points) => {
        const state = get();
        if (state.isFinished || state.players.length === 0) return;

        const player = state.players[state.currentPlayerIndex];
        const action: GameAction = {
          type: 'ADD_SCORE',
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
              ? { ...p, score: p.score + points, turnScores: [...p.turnScores, points] }
              : p
          ),
          currentPlayerIndex: nextPlayerIndex,
          turnNumber: nextTurn,
          actions: [...state.actions, action],
          undoStack: [...state.undoStack, undoEntry],
        });
      },

      addPerfectLine: () => {
        const state = get();
        if (state.isFinished || state.players.length === 0) return;

        const player = state.players[state.currentPlayerIndex];
        const action: GameAction = {
          type: 'PERFECT_LINE',
          playerId: player.id,
          points: PERFECT_LINE_POINTS,
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
                  score: p.score + PERFECT_LINE_POINTS,
                  bonusCount: p.bonusCount + 1,
                  turnScores: [...p.turnScores, PERFECT_LINE_POINTS],
                }
              : p
          ),
          currentPlayerIndex: nextPlayerIndex,
          turnNumber: nextTurn,
          actions: [...state.actions, action],
          undoStack: [...state.undoStack, undoEntry],
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
        });
      },

      endGame: (bonusPlayerId) => {
        const state = get();
        if (state.isFinished) return;

        const now = new Date().toISOString();
        const updates: Partial<GameStore> = {
          isFinished: true,
          finishedAt: now,
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
        });
      },
    }),
    {
      name: 'qwi-count-game',
    }
  )
);
