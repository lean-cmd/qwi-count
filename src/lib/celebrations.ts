/**
 * celebrations.ts
 *
 * 5 distinct celebration animations using canvas-confetti:
 *   - confetti: Classic multi-wave party poppers
 *   - fireworks: Explosive bursts from different positions
 *   - sparkle: Gentle floating sparkles from center
 *   - glitter: Tiny shimmering particles raining down
 *   - party: Everything at once — the full works
 *
 * @author claude — 2026-03-22
 */

import confetti from 'canvas-confetti';
import type { CelebrationStyle } from '@/types';

const COLORS = ['#E8192C', '#F58220', '#FFD100', '#00A651', '#0054A6', '#7B2D8E'];
const GOLD = ['#FFD700', '#FFC107', '#FFEB3B', '#FFF176', '#FFFFFF'];

// ── Confetti (classic) ──────────────────────────────────────────────

function playConfetti() {
  confetti({
    particleCount: 200, spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: COLORS, startVelocity: 45, gravity: 0.8, ticks: 200,
  });
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors: COLORS, startVelocity: 55 });
  }, 150);
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: COLORS, startVelocity: 55 });
  }, 300);
  setTimeout(() => {
    confetti({ particleCount: 120, spread: 160, origin: { x: 0.5, y: -0.1 }, colors: COLORS, startVelocity: 25, gravity: 1.2, ticks: 250 });
  }, 500);
  setTimeout(() => {
    confetti({ particleCount: 60, spread: 360, origin: { x: 0.5, y: 0.4 }, colors: COLORS, startVelocity: 30, gravity: 0.5, scalar: 0.8, ticks: 150 });
  }, 800);
}

// ── Fireworks ────────────────────────────────────────────────────────

function playFireworks() {
  const positions = [
    { x: 0.25, y: 0.3 },
    { x: 0.75, y: 0.25 },
    { x: 0.5, y: 0.4 },
    { x: 0.15, y: 0.5 },
    { x: 0.85, y: 0.45 },
    { x: 0.5, y: 0.2 },
  ];

  positions.forEach((pos, i) => {
    setTimeout(() => {
      // Main burst
      confetti({
        particleCount: 80,
        spread: 360,
        origin: pos,
        colors: COLORS,
        startVelocity: 30 + Math.random() * 20,
        gravity: 1,
        ticks: 120,
        scalar: 0.9,
      });
      // Inner bright core
      confetti({
        particleCount: 20,
        spread: 360,
        origin: pos,
        colors: GOLD,
        startVelocity: 15,
        gravity: 0.8,
        ticks: 80,
        scalar: 0.5,
      });
    }, i * 350);
  });
}

// ── Sparkle ──────────────────────────────────────────────────────────

function playSparkle() {
  // Gentle waves of tiny sparkles floating up and out
  for (let wave = 0; wave < 5; wave++) {
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 120,
        origin: { x: 0.3 + Math.random() * 0.4, y: 0.5 + Math.random() * 0.2 },
        colors: GOLD,
        startVelocity: 15 + Math.random() * 10,
        gravity: 0.3,
        ticks: 200,
        scalar: 0.6,
        drift: (Math.random() - 0.5) * 2,
      });
    }, wave * 250);
  }

  // Central star burst
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 360,
      origin: { x: 0.5, y: 0.45 },
      colors: [...GOLD, '#FFFFFF'],
      startVelocity: 20,
      gravity: 0.2,
      ticks: 250,
      scalar: 0.5,
    });
  }, 400);
}

// ── Glitter ──────────────────────────────────────────────────────────

function playGlitter() {
  // Continuous tiny particles raining down like shimmer
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 160,
        origin: { x: Math.random(), y: -0.05 },
        colors: [...COLORS, ...GOLD],
        startVelocity: 5 + Math.random() * 10,
        gravity: 0.4 + Math.random() * 0.3,
        ticks: 300,
        scalar: 0.4 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 1.5,
      });
    }, i * 200);
  }

  // Shimmer accent bursts
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 180,
      origin: { x: 0.5, y: 0.3 },
      colors: GOLD,
      startVelocity: 8,
      gravity: 0.15,
      ticks: 350,
      scalar: 0.35,
    });
  }, 600);
}

// ── Party (everything at once!) ─────────────────────────────────────

function playParty() {
  // Big center burst
  confetti({
    particleCount: 150, spread: 120,
    origin: { x: 0.5, y: 0.5 },
    colors: COLORS, startVelocity: 50, gravity: 0.7, ticks: 250,
  });

  // Left & right cannons
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: COLORS, startVelocity: 60 });
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: COLORS, startVelocity: 60 });
  }, 200);

  // Firework pops
  setTimeout(() => {
    confetti({ particleCount: 60, spread: 360, origin: { x: 0.3, y: 0.3 }, colors: GOLD, startVelocity: 25, gravity: 0.8, scalar: 0.7, ticks: 120 });
    confetti({ particleCount: 60, spread: 360, origin: { x: 0.7, y: 0.25 }, colors: GOLD, startVelocity: 25, gravity: 0.8, scalar: 0.7, ticks: 120 });
  }, 500);

  // Glitter rain
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 25, spread: 160,
        origin: { x: Math.random(), y: -0.05 },
        colors: [...COLORS, ...GOLD],
        startVelocity: 8, gravity: 0.4, ticks: 300, scalar: 0.4,
        drift: (Math.random() - 0.5) * 2,
      });
    }, 700 + i * 180);
  }

  // Final sparkle shower
  setTimeout(() => {
    confetti({
      particleCount: 100, spread: 180,
      origin: { x: 0.5, y: -0.05 },
      colors: [...COLORS, ...GOLD, '#FFFFFF'],
      startVelocity: 20, gravity: 0.6, ticks: 300, scalar: 0.6,
    });
  }, 1400);

  // Encore double burst
  setTimeout(() => {
    confetti({ particleCount: 80, spread: 100, origin: { x: 0.35, y: 0.5 }, colors: COLORS, startVelocity: 40 });
    confetti({ particleCount: 80, spread: 100, origin: { x: 0.65, y: 0.5 }, colors: COLORS, startVelocity: 40 });
  }, 1800);
}

// ── Public API ───────────────────────────────────────────────────────

const celebrations: Record<CelebrationStyle, () => void> = {
  confetti: playConfetti,
  fireworks: playFireworks,
  sparkle: playSparkle,
  glitter: playGlitter,
  party: playParty,
};

export function playCelebration(style: CelebrationStyle) {
  celebrations[style]();
}

export const CELEBRATION_OPTIONS: { value: CelebrationStyle; label: string; emoji: string }[] = [
  { value: 'confetti', label: 'Confetti', emoji: '🎊' },
  { value: 'fireworks', label: 'Fireworks', emoji: '🎆' },
  { value: 'sparkle', label: 'Sparkle', emoji: '✨' },
  { value: 'glitter', label: 'Glitter', emoji: '💎' },
  { value: 'party', label: 'Party', emoji: '🥳' },
];
