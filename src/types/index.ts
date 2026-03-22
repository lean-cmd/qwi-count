/**
 * types/index.ts
 *
 * Shared TypeScript interfaces for the Qwi Count app.
 *
 * @author claude — 2026-03-20
 */

export type TileShape = 'circle' | 'star4' | 'diamond' | 'square' | 'clover' | 'starburst';

export interface Player {
  id: string;
  name: string;
  color: string;
  shape: TileShape;
  score: number;
  bonusCount: number;
  turnScores: number[];
}

export interface GameState {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
  turnNumber: number;
  isFinished: boolean;
  startedAt: string;
  finishedAt?: string;
  endGameBonusPlayerId?: string;
}

export type GameActionType = 'ADD_SCORE' | 'PERFECT_LINE' | 'SKIP' | 'END_GAME_BONUS' | 'UNDO';

export interface GameAction {
  type: GameActionType;
  playerId: string;
  points: number;
  timestamp: string;
}

export interface UndoEntry {
  action: GameAction;
  previousState: {
    playerScore: number;
    playerBonusCount: number;
    playerTurnScores: number[];
    currentPlayerIndex: number;
    turnNumber: number;
    /** The committed score — restored as pending so the user can correct it */
    committedScore: number;
    committedBonusCount: number;
  };
}

export interface GameRecord {
  id: string;
  players: { name: string; color: string; score: number; bonusCount: number }[];
  winnerName: string;
  startedAt: string;
  finishedAt: string;
  turnCount: number;
  actions: GameAction[];
}

export interface AppSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
}
