/**
 * ScoreChart.tsx
 *
 * Pure SVG line chart showing cumulative score progression per round.
 * Each player gets a colored line. Highlights the leader at each round.
 *
 * @author claude — 2026-03-20
 */

'use client';

import { useMemo } from 'react';
import type { Player } from '@/types';

interface ScoreChartProps {
  players: Player[];
}

export default function ScoreChart({ players }: ScoreChartProps) {
  const chartData = useMemo(() => {
    if (players.length === 0) return null;

    // Find the max number of turns any player had
    const maxTurns = Math.max(...players.map((p) => p.turnScores.length));
    if (maxTurns === 0) return null;

    // Build cumulative scores per round for each player
    const lines = players.map((player) => {
      const cumulative: number[] = [0]; // start at 0
      let total = 0;
      for (let i = 0; i < maxTurns; i++) {
        total += player.turnScores[i] ?? 0;
        cumulative.push(total);
      }
      return {
        id: player.id,
        name: player.name,
        color: player.color,
        points: cumulative,
        finalScore: total,
      };
    });

    // Find max score for Y axis
    const maxScore = Math.max(...lines.map((l) => l.finalScore), 1);
    const totalPoints = maxTurns + 1; // including start at 0

    return { lines, maxScore, totalPoints, maxTurns };
  }, [players]);

  if (!chartData) return null;

  const { lines, maxScore, totalPoints, maxTurns } = chartData;

  // Chart dimensions
  const width = 360;
  const height = 180;
  const padLeft = 36;
  const padRight = 12;
  const padTop = 12;
  const padBottom = 28;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const xScale = (i: number) => padLeft + (i / (totalPoints - 1)) * chartW;
  const yScale = (v: number) => padTop + chartH - (v / maxScore) * chartH;

  // Y-axis grid lines (4 lines)
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((maxScore / 4) * i));

  // X-axis labels — show every few rounds
  const xStep = maxTurns <= 8 ? 1 : maxTurns <= 16 ? 2 : Math.ceil(maxTurns / 8);
  const xTicks: number[] = [];
  for (let i = 0; i <= maxTurns; i += xStep) {
    xTicks.push(i);
  }
  if (xTicks[xTicks.length - 1] !== maxTurns) xTicks.push(maxTurns);

  return (
    <div className="w-full bg-surface rounded-2xl p-3 space-y-2">
      <p className="text-sm font-bold opacity-60 px-1">Score Progression</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {yTicks.map((tick) => (
          <g key={`y-${tick}`}>
            <line
              x1={padLeft}
              x2={width - padRight}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
            <text
              x={padLeft - 6}
              y={yScale(tick) + 3.5}
              textAnchor="end"
              fontSize={9}
              fill="currentColor"
              fillOpacity={0.35}
              fontFamily="sans-serif"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {xTicks.map((tick) => (
          <text
            key={`x-${tick}`}
            x={xScale(tick)}
            y={height - 6}
            textAnchor="middle"
            fontSize={9}
            fill="currentColor"
            fillOpacity={0.35}
            fontFamily="sans-serif"
          >
            {tick === 0 ? '' : `R${tick}`}
          </text>
        ))}

        {/* Player lines */}
        {lines.map((line) => {
          const pathD = line.points
            .map((val, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(val)}`)
            .join(' ');

          return (
            <g key={line.id}>
              <path
                d={pathD}
                fill="none"
                stroke={line.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={0.85}
              />
              {/* End dot */}
              <circle
                cx={xScale(line.points.length - 1)}
                cy={yScale(line.finalScore)}
                r={4}
                fill={line.color}
              />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-1">
        {lines.map((line) => (
          <div key={line.id} className="flex items-center gap-1.5 text-xs font-medium opacity-70">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: line.color }}
            />
            {line.name}
          </div>
        ))}
      </div>
    </div>
  );
}
