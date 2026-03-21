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

    // Fun celebratory fanfare — ascending arpeggio with harmonics
    const notes = [
      { freq: 523.25, time: 0,    dur: 0.18 },  // C5
      { freq: 659.25, time: 0.09, dur: 0.18 },  // E5
      { freq: 783.99, time: 0.18, dur: 0.18 },  // G5
      { freq: 1046.5, time: 0.30, dur: 0.18 },  // C6
      { freq: 1318.5, time: 0.42, dur: 0.25 },  // E6
      { freq: 1568.0, time: 0.55, dur: 0.5 },   // G6 (long, triumphant)
    ];

    notes.forEach(({ freq, time, dur }) => {
      playTone(ctx, freq, dur, 0.22, 'sine', time);
      playTone(ctx, freq * 1.002, dur, 0.08, 'triangle', time);
      // Octave shimmer on the last two notes
      if (freq > 1200) {
        playTone(ctx, freq * 2, dur * 0.6, 0.04, 'sine', time + 0.02);
      }
    });

    // Sparkly descending tail
    const sparkle = [
      { freq: 2093, time: 0.75, dur: 0.1 },
      { freq: 1760, time: 0.82, dur: 0.1 },
      { freq: 2349, time: 0.88, dur: 0.15 },
    ];
    sparkle.forEach(({ freq, time, dur }) => {
      playTone(ctx, freq, dur, 0.06, 'sine', time);
    });
  }, [soundEnabled]);

  return { playClick, playChime, playFanfare };
}
