/**
 * GameStats.tsx
 *
 * End-game statistics: avg score per turn, biggest turn, most consistent,
 * lead changes, total rounds, etc.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — i18n support
 */

'use client';

import type { Player } from '@/types';
import { TrendingUp, Zap, Target, BarChart3, Hash } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface GameStatsProps {
  players: Player[];
  turnNumber: number;
}

export default function GameStats({ players, turnNumber }: GameStatsProps) {
  const t = useTranslation();

  if (players.length === 0) return null;

  const totalRounds = turnNumber - 1;

  const averages = players.map((p) => {
    const nonZero = p.turnScores.filter((s) => s > 0);
    return {
      name: p.name,
      color: p.color,
      avg: nonZero.length > 0 ? nonZero.reduce((a, b) => a + b, 0) / nonZero.length : 0,
    };
  });
  const highestAvg = averages.reduce((best, curr) => curr.avg > best.avg ? curr : best);

  const allTurns = players.flatMap((p) =>
    p.turnScores.map((score, i) => ({ player: p, score, round: i + 1 }))
  );
  const biggestTurn = allTurns.reduce(
    (best, curr) => curr.score > best.score ? curr : best,
    { player: players[0], score: 0, round: 0 }
  );

  const consistency = players.map((p) => {
    const scores = p.turnScores.filter((s) => s > 0);
    if (scores.length < 2) return { name: p.name, color: p.color, stdDev: Infinity };
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, s) => sum + (s - mean) ** 2, 0) / scores.length;
    return { name: p.name, color: p.color, stdDev: Math.sqrt(variance) };
  });
  const mostConsistent = consistency.reduce((best, curr) =>
    curr.stdDev < best.stdDev ? curr : best
  );

  const maxTurns = Math.max(...players.map((p) => p.turnScores.length));
  let leadChanges = 0;
  let lastLeaderId = '';
  for (let round = 0; round < maxTurns; round++) {
    let maxScore = -1;
    let leaderId = '';
    for (const p of players) {
      const cumulative = p.turnScores.slice(0, round + 1).reduce((a, b) => a + b, 0);
      if (cumulative > maxScore) {
        maxScore = cumulative;
        leaderId = p.id;
      }
    }
    if (lastLeaderId && leaderId !== lastLeaderId) {
      leadChanges++;
    }
    lastLeaderId = leaderId;
  }

  const totalPoints = players.reduce((sum, p) => sum + p.score, 0);

  const stats = [
    {
      icon: BarChart3,
      label: t.roundsPlayed,
      value: `${totalRounds}`,
      detail: `${totalPoints} ${t.totalPoints}`,
    },
    {
      icon: Zap,
      label: t.biggestTurn,
      value: `${biggestTurn.score} pts`,
      detail: `${biggestTurn.player.name} ${t.inRound} ${biggestTurn.round}`,
      color: biggestTurn.player.color,
    },
    {
      icon: TrendingUp,
      label: t.highestAverage,
      value: `${highestAvg.avg.toFixed(1)} ${t.ptsPerTurn}`,
      detail: highestAvg.name,
      color: highestAvg.color,
    },
    {
      icon: Target,
      label: t.mostConsistent,
      value: mostConsistent.stdDev === Infinity ? '-' : mostConsistent.name,
      detail: mostConsistent.stdDev === Infinity ? '' : `\u00B1${mostConsistent.stdDev.toFixed(1)} pts`,
      color: mostConsistent.color,
    },
    {
      icon: Hash,
      label: t.leadChanges,
      value: `${leadChanges}`,
      detail: leadChanges === 0 ? t.dominantVictory : leadChanges >= 4 ? t.neckAndNeck : t.competitiveGame,
    },
  ];

  return (
    <div className="w-full bg-surface rounded-2xl p-4 space-y-3">
      <p className="text-sm font-bold opacity-60">{t.gameStats}</p>
      <div className="space-y-2.5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0">
              <stat.icon size={16} style={stat.color ? { color: stat.color } : undefined} className={stat.color ? '' : 'opacity-50'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs opacity-50">{stat.label}</p>
              <p className="font-bold text-sm leading-tight">{stat.value}</p>
            </div>
            {stat.detail && (
              <p className="text-xs opacity-40 text-right shrink-0">{stat.detail}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
