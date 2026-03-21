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

  const playVictory = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Grand victory fanfare — triumphant brass-like chord progression
    // Opening chord (C major)
    playTone(ctx, 261.63, 0.4, 0.18, 'sine', 0);      // C4
    playTone(ctx, 329.63, 0.4, 0.18, 'sine', 0);      // E4
    playTone(ctx, 392.00, 0.4, 0.18, 'triangle', 0);   // G4

    // Rising to F major
    playTone(ctx, 349.23, 0.4, 0.18, 'sine', 0.35);    // F4
    playTone(ctx, 440.00, 0.4, 0.18, 'sine', 0.35);    // A4
    playTone(ctx, 523.25, 0.4, 0.18, 'triangle', 0.35); // C5

    // Triumphant G major
    playTone(ctx, 392.00, 0.4, 0.2, 'sine', 0.7);      // G4
    playTone(ctx, 493.88, 0.4, 0.2, 'sine', 0.7);      // B4
    playTone(ctx, 587.33, 0.4, 0.2, 'triangle', 0.7);   // D5

    // Final grand C major (high) — held long
    playTone(ctx, 523.25, 0.8, 0.22, 'sine', 1.05);     // C5
    playTone(ctx, 659.25, 0.8, 0.22, 'sine', 1.05);     // E5
    playTone(ctx, 783.99, 0.8, 0.18, 'triangle', 1.05);  // G5
    playTone(ctx, 1046.5, 0.8, 0.15, 'sine', 1.05);     // C6

    // Clapping rhythm — noise bursts that sound like applause
    const clapTimes = [1.6, 1.75, 1.9, 2.05, 2.15, 2.25, 2.35, 2.5, 2.6, 2.7, 2.85, 3.0];
    clapTimes.forEach((t) => {
      // White noise burst simulating a clap
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Band-pass filter to shape the clap
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200 + Math.random() * 600;
      filter.Q.value = 0.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25 + Math.random() * 0.1, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.06);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(ctx.currentTime + t);
      noise.stop(ctx.currentTime + t + 0.06);
    });
  }, [soundEnabled]);

  return { playClick, playChime, playFanfare, playVictory };
}
