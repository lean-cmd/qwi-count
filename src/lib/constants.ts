/**
 * constants.ts
 *
 * App-wide constants: player colors, limits, and design tokens.
 *
 * @author claude — 2026-03-20
 */

export const PLAYER_COLORS = [
  { name: 'Red', hex: '#E8192C' },
  { name: 'Orange', hex: '#F58220' },
  { name: 'Yellow', hex: '#FFD100' },
  { name: 'Green', hex: '#00A651' },
  { name: 'Blue', hex: '#0054A6' },
  { name: 'Purple', hex: '#7B2D8E' },
] as const;

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;

export const PERFECT_LINE_POINTS = 12;
export const END_GAME_BONUS = 6;
export const MAX_LINE_LENGTH = 6;

export const SCORE_BUTTONS = [1, 2, 3, 4, 5, 6] as const;

export const TILE_SHAPES = ['circle', 'star4', 'diamond', 'square', 'clover', 'starburst'] as const;
