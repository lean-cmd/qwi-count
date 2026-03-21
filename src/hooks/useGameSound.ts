/**
 * useGameSound.ts
 *
 * Synthesized sound effects using the Web Audio API — no external sound files needed.
 * Plays a chime on score, fanfare on perfect line, and click on button taps.
 * All sounds are gated by the soundEnabled setting.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { useCallback, useRef } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  // Reuse a single AudioContext
  const w = window as unknown as { _qwiAudioCtx?: AudioContext };
  if (!w._qwiAudioCtx) {
    w._qwiAudioCtx = new AudioContext();
  }
  return w._qwiAudioCtx;
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  volume: number = 0.3,
  type: OscillatorType = 'sine',
  startTime: number = 0
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

export function useGameSound() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const lastPlayRef = useRef(0);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Soft tick sound
    playTone(ctx, 800, 0.06, 0.15, 'sine');
  }, [soundEnabled]);

  const playChime = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Debounce rapid chimes
    const now = Date.now();
    if (now - lastPlayRef.current < 80) return;
    lastPlayRef.current = now;

    // Pleasant two-note chime (major third)
    playTone(ctx, 523.25, 0.15, 0.2, 'sine');       // C5
    playTone(ctx, 659.25, 0.2, 0.2, 'sine', 0.08);  // E5
  }, [soundEnabled]);

  const playFanfare = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Celebratory ascending fanfare
    const notes = [
      { freq: 523.25, time: 0,    dur: 0.15 },  // C5
      { freq: 659.25, time: 0.1,  dur: 0.15 },  // E5
      { freq: 783.99, time: 0.2,  dur: 0.15 },  // G5
      { freq: 1046.5, time: 0.35, dur: 0.4 },   // C6 (long)
    ];

    notes.forEach(({ freq, time, dur }) => {
      playTone(ctx, freq, dur, 0.25, 'sine', time);
      // Add a subtle triangle layer for richness
      playTone(ctx, freq * 1.002, dur, 0.1, 'triangle', time);
    });
  }, [soundEnabled]);

  return { playClick, playChime, playFanfare };
}
