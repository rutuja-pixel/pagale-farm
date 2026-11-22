import { useMemo } from 'react';

const COLORS = ['#ffd27a', '#ff9f68', '#ffe9b0', '#f7b2c4', '#bfe3a1'];

/** Strings of fairy lights that glow brighter as the day turns to night. */
export function FairyLights() {
  const W = 1200, SWAGS = 6, SW = W / SWAGS;
  const swags = useMemo(() => Array.from({ length: SWAGS }, (_, s) => {
    const x0 = s * SW, x1 = x0 + SW, cx = x0 + SW / 2;
    const bulbs = Array.from({ length: 8 }, (_, i) => {
      const t = (i + 1) / 9;
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1;
      const y = (1 - t) ** 2 * 4 + 2 * (1 - t) * t * 64 + t ** 2 * 4;
      return { x, y: y + 4, c: COLORS[(s * 3 + i) % COLORS.length], d: ((s * 8 + i) * 0.37) % 3 };
    });
    return { path: `M${x0} 4 Q${cx} 64 ${x1} 4`, bulbs };
  }), []);
  return (
    <svg className="fairy" viewBox={`0 0 ${W} 56`} preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      {swags.map((s, i) => <path key={i} d={s.path} fill="none" stroke="rgba(0,0,0,.55)" strokeWidth="1.4" />)}
      {swags.flatMap((s, i) => s.bulbs.map((b, j) => (
        <g key={`${i}-${j}`} className="fairy__bulb" style={{ animationDelay: `${b.d}s`, color: b.c }}>
          <circle cx={b.x} cy={b.y} r="9" fill="currentColor" opacity=".18" />
          <circle cx={b.x} cy={b.y} r="3.6" fill="currentColor" />
        </g>
      )))}
    </svg>
  );
}

/** Drifting pollen by day, fireflies at night (styling is theme-driven in CSS). */
export function Particles({ count = 26 }: { count?: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => {
    const r = (n: number) => { const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); };
    return { left: r(1) * 100, top: 20 + r(2) * 75, size: 3 + r(3) * 5, dur: 9 + r(4) * 12, delay: -r(5) * 20, dx: (r(6) - 0.5) * 140 };
  }), [count]);
  return (
    <div className="particles" aria-hidden="true">
      {items.map((p, i) => (
        <i key={i} style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, ['--dx' as string]: `${p.dx}px` }} />
      ))}
    </div>
  );
}
