'use client';

import { ConnectionLineComponentProps } from 'reactflow';

export function ConnectionLine({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
}: ConnectionLineComponentProps) {
  const deltaX = toX - fromX;
  const deltaY = toY - fromY;
  const controlPointX = fromX + deltaX * 0.5;

  const path = `M${fromX},${fromY} C${controlPointX},${fromY} ${controlPointX},${toY} ${toX},${toY}`;

  return (
    <g>
      <path
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={2}
        className="animated-path"
        d={path}
      />
      <path
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={4}
        strokeOpacity={0.1}
        d={path}
      />
    </g>
  );
}