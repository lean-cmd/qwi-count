/**
 * TileShapeIcon.tsx
 *
 * Renders one of the 6 tile game shapes as an SVG.
 * Shapes: circle, 4-point star, diamond, square, clover (4-leaf), 6-point starburst.
 *
 * @author claude — 2026-03-20
 */

import type { TileShape } from '@/types';

interface TileShapeIconProps {
  shape: TileShape;
  color: string;
  size?: number;
  className?: string;
}

export default function TileShapeIcon({ shape, color, size = 32, className = '' }: TileShapeIconProps) {
  const viewBox = '0 0 100 100';

  const shapeElement = (() => {
    switch (shape) {
      case 'circle':
        return <circle cx="50" cy="50" r="42" fill={color} />;

      case 'star4':
        // 4-point star
        return (
          <polygon
            points="50,4 61,38 96,38 68,60 79,95 50,73 21,95 32,60 4,38 39,38"
            fill={color}
          />
        );

      case 'diamond':
        return (
          <polygon
            points="50,6 92,50 50,94 8,50"
            fill={color}
          />
        );

      case 'square':
        // Rounded square
        return (
          <rect x="12" y="12" width="76" height="76" rx="12" fill={color} />
        );

      case 'clover':
        // 4-leaf clover shape
        return (
          <g fill={color}>
            <circle cx="50" cy="28" r="22" />
            <circle cx="50" cy="72" r="22" />
            <circle cx="28" cy="50" r="22" />
            <circle cx="72" cy="50" r="22" />
            <rect x="38" y="38" width="24" height="24" rx="4" />
          </g>
        );

      case 'starburst':
        // 6-point starburst
        return (
          <polygon
            points="50,4 60,35 93,20 73,50 93,80 60,65 50,96 40,65 7,80 27,50 7,20 40,35"
            fill={color}
          />
        );

      default:
        return <circle cx="50" cy="50" r="42" fill={color} />;
    }
  })();

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      className={className}
      aria-hidden="true"
    >
      {shapeElement}
    </svg>
  );
}
