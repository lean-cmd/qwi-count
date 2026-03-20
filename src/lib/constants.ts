/**
 * constants.ts
 *
 * App-wide constants: player colors, limits, and design tokens.
 *
 * @author claude — 2026-03-20
 */

export const PLAYER_COLORS = [
  { name: 'Red', hex: '#E63946' },
  { name: 'Orange', hex: '#F4A261' },
  { name: 'Green', hex: '#2A9D8F' },
  { name: 'Blue', hex: '#264653' },
  { name: 'Purple', hex: '#7B2CBF' },
  { name: 'Yellow', hex: '#E9C46A' },
] as const;

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;

export const PERFECT_LINE_POINTS = 12;
export const END_GAME_BONUS = 6;
export const MAX_LINE_LENGTH = 6;

export const SCORE_BUTTONS = [1, 2, 3, 4, 5, 6] as const;
