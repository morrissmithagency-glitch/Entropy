// Hand-built illustration set. Every object shares one style: 64×64 box, warm ink
// outline, flat fills from the palette and a single soft highlight. Swap any of these
// for commissioned artwork by keeping the same id.
import type { ReactNode } from 'react'

const INK = '#2a1b12'
const S = { stroke: INK, strokeWidth: 2.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const hl = (d: string) => <path d={d} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={2.4} strokeLinecap="round" />

const ART = {
  mango: (
    <>
      <path {...S} fill="#f2b33d" d="M18 40c-6-14 6-28 20-26 10 2 14 12 10 22-4 11-24 18-30 4z" />
      <path {...S} fill="#e2762f" fillOpacity={0.55} stroke="none" d="M40 40c-4 6-12 9-18 6 8 0 14-4 18-10z" />
      <path {...S} fill="#6b8f3a" d="M36 14c2-6 8-8 14-6-3 5-8 7-14 6z" />
      {hl('M24 26c2-4 5-6 9-6')}
    </>
  ),
  orange: (
    <>
      <circle {...S} cx={32} cy={36} r={18} fill="#ef8d2c" />
      <path {...S} fill="#6b8f3a" d="M32 18c3-6 9-8 14-6-3 5-8 7-14 6z" />
      <circle cx={32} cy={19} r={1.6} fill={INK} />
      {hl('M22 30c2-4 5-6 8-7')}
    </>
  ),
  banana: (
    <>
      <path {...S} fill="#f5d04a" d="M12 22c4 22 22 32 42 24-4-4-6-4-10-4-14 2-22-8-24-22z" />
      <path {...S} fill="#6e4b2a" d="M10 18l4-2 3 6-4 1z" />
      {hl('M20 30c4 7 10 11 18 12')}
    </>
  ),
  egg: (
    <>
      <path {...S} fill="#fbf4e6" d="M32 10c10 0 18 16 18 28a18 18 0 01-36 0c0-12 8-28 18-28z" />
      {hl('M24 26c1-4 4-8 7-9')}
    </>
  ),
  maize: (
    <>
      <path {...S} fill="#f4c63d" d="M32 8c8 0 10 12 10 24s-4 20-10 20-10-8-10-20 2-24 10-24z" />
      <path stroke={INK} strokeOpacity={0.35} strokeWidth={1.6} fill="none" d="M27 18h10M25 26h14M25 34h14M26 42h12M32 10v40" />
      <path {...S} fill="#7da744" d="M22 30c-8 10-6 22 4 28 4-6 4-14 2-20zM42 30c8 10 6 22-4 28-4-6-4-14-2-20z" />
    </>
  ),
  bread: (
    <>
      <path {...S} fill="#d99a4e" d="M12 30c0-10 8-14 20-14s20 4 20 14c0 3-2 4-4 4v14H16V34c-2 0-4-1-4-4z" />
      <path {...S} fill="#f4dcae" stroke="none" d="M18 36h28v10H18z" />
      {hl('M18 24c4-3 10-4 16-4')}
    </>
  ),
  tomato: (
    <>
      <circle {...S} cx={32} cy={36} r={17} fill="#d8452f" />
      <path {...S} fill="#6b8f3a" d="M24 20l8 4 8-4-4 6h-8z" />
      {hl('M22 32c1-4 4-7 8-8')}
    </>
  ),
  pencil: (
    <>
      <path {...S} fill="#f2b33d" d="M14 44L42 16l6 6-28 28-8 2z" />
      <path {...S} fill="#f4dcae" d="M14 44l6 6-8 2z" />
      <path {...S} fill="#d8452f" d="M42 16l4-4 6 6-4 4z" />
    </>
  ),
  book: (
    <>
      <path {...S} fill="#2f7d72" d="M12 14h18c2 0 2 2 2 2v36s0-2-2-2H12z" />
      <path {...S} fill="#c8553d" d="M52 14H34c-2 0-2 2-2 2v36s0-2 2-2h18z" />
      <path stroke="#fff" strokeOpacity={0.6} strokeWidth={2} d="M17 22h9M17 28h9M37 22h10M37 28h10" />
    </>
  ),
  ball: (
    <>
      <circle {...S} cx={32} cy={34} r={18} fill="#fbf4e6" />
      <path {...S} fill="#c8553d" d="M32 16a18 18 0 0118 18H32z" />
      <path {...S} fill="#2f7d72" d="M14 34a18 18 0 0018 18V34z" />
    </>
  ),
  bag: (
    <>
      <path {...S} fill="none" d="M24 22c0-8 16-8 16 0" />
      <rect {...S} x={12} y={22} width={40} height={30} rx={6} fill="#2f7d72" />
      <path {...S} fill="#f2b33d" d="M12 32h40v6H12z" />
    </>
  ),
  cup: (
    <>
      <path {...S} fill="#c8553d" d="M16 20h28l-3 28c0 2-2 4-4 4H23c-2 0-4-2-4-4z" />
      <path {...S} fill="none" d="M44 26c8 0 8 12-2 12" />
      {hl('M22 26l1 16')}
    </>
  ),
  jug: (
    <>
      <path {...S} fill="#9cc9d6" d="M18 14h24l-2 6c6 4 8 10 8 18v14H16V38c0-8 2-14 6-18z" />
      <path {...S} fill="none" d="M48 26c8 0 8 16-2 16" />
      <path fill="#2f7d72" fillOpacity={0.35} d="M17 40h30v11H17z" />
    </>
  ),
  bucket: (
    <>
      <path {...S} fill="none" d="M14 22c0-14 36-14 36 0" />
      <path {...S} fill="#3f8fa3" d="M12 22h40l-5 30H17z" />
      <path {...S} fill="#2a6f80" stroke="none" d="M13 28h38l-1 4H14z" />
    </>
  ),
  spoon: (
    <>
      <ellipse {...S} cx={22} cy={22} rx={9} ry={12} transform="rotate(-40 22 22)" fill="#c9c2b4" />
      <path {...S} fill="#c9c2b4" d="M27 28l24 24-3 3-24-24z" />
    </>
  ),
  plate: (
    <>
      <ellipse {...S} cx={32} cy={36} rx={24} ry={14} fill="#fbf4e6" />
      <ellipse cx={32} cy={35} rx={15} ry={8} fill="none" stroke={INK} strokeOpacity={0.3} strokeWidth={2} />
    </>
  ),
  pot: (
    <>
      <path {...S} fill="#c9c2b4" d="M12 26h40v18c0 6-4 8-10 8H22c-6 0-10-2-10-8z" />
      <path {...S} fill="#a8a093" d="M10 22h44v6H10z" />
      <path {...S} fill="none" d="M10 30H4M54 30h6" />
    </>
  ),
  chair: (
    <>
      <path {...S} fill="#b5743e" d="M18 8h6v28h-6zM18 32h28v6H18z" />
      <path {...S} fill="none" d="M20 38v18M44 38v18M24 16h-6" />
    </>
  ),
  bed: (
    <>
      <path {...S} fill="#b5743e" d="M8 22h6v32H8zM50 30h6v24h-6z" />
      <path {...S} fill="#2f7d72" d="M14 36h36v10H14z" />
      <path {...S} fill="#fbf4e6" d="M15 28h12v8H15z" />
    </>
  ),
  house: (
    <>
      <path {...S} fill="#e8c88a" d="M14 30h36v24H14z" />
      <path {...S} fill="#c8553d" d="M8 32L32 12l24 20z" />
      <path {...S} fill="#6e4b2a" d="M28 40h8v14h-8z" />
      <path {...S} fill="#9cc9d6" d="M18 36h6v6h-6zM40 36h6v6h-6z" />
    </>
  ),
  shoe: (
    <>
      <path {...S} fill="#6e4b2a" d="M10 44V26h14c2 6 8 10 18 12 8 2 12 4 12 8v2H10z" />
      <path {...S} fill="#2a1b12" d="M10 48h44v4H10z" />
      <path stroke="#fff" strokeOpacity={0.5} strokeWidth={2} d="M26 32l4-2M30 36l4-2" />
    </>
  ),
  shirt: (
    <>
      <path {...S} fill="#3f8fa3" d="M22 12l-14 8 6 10 6-3v25h24V27l6 3 6-10-14-8c-2 4-6 6-10 6s-8-2-10-6z" />
    </>
  ),
  goat: (
    <>
      <path {...S} fill="#efe2cc" d="M14 30c0-6 6-8 14-8h12c6 0 8 4 8 8v8c0 4-4 6-8 6H22c-6 0-8-4-8-8z" />
      <path {...S} fill="none" d="M20 44v10M26 44v10M38 44v10M44 44v10" />
      <path {...S} fill="#efe2cc" d="M42 24c2-8 8-12 14-10 2 4 0 10-4 12z" />
      <path {...S} fill="none" d="M50 14c-2-4 0-8 4-8M50 26c1 3 0 5-2 6" />
      <circle cx={52} cy={18} r={1.6} fill={INK} />
    </>
  ),
  cow: (
    <>
      <path {...S} fill="#fbf4e6" d="M8 28c0-6 4-8 10-8h24c6 0 8 4 8 8v12c0 4-4 6-8 6H16c-6 0-8-4-8-8z" />
      <path fill="#2a1b12" d="M20 22c6 0 8 6 4 10s-8 0-8-4zM36 34c4-2 8 0 8 4h-10z" />
      <path {...S} fill="none" d="M14 46v8M22 46v8M36 46v8M44 46v8" />
      <path {...S} fill="#fbf4e6" d="M44 18h12v14c0 4-2 6-6 6s-6-2-6-6z" />
      <path {...S} fill="#e9a99a" d="M45 30h10v4c0 3-2 4-5 4s-5-1-5-4z" />
      <path {...S} fill="none" d="M44 18l-4-6M56 18l4-6" />
    </>
  ),
  hen: (
    <>
      <path {...S} fill="#c8553d" d="M14 36c0-10 8-16 18-14l6-8c6-2 10 2 10 8 0 4-2 6-4 8 4 4 6 8 6 12 0 8-8 12-18 12s-18-8-18-18z" />
      <path {...S} fill="#f2b33d" d="M48 22l8 3-8 3z" />
      <path {...S} fill="#d8452f" d="M40 12c2-4 6-4 6 0" />
      <circle cx={43} cy={21} r={1.7} fill={INK} />
      <path {...S} fill="none" d="M28 54v6M36 54v6M22 34c4 4 10 4 14 0" />
    </>
  ),
  dog: (
    <>
      <path {...S} fill="#c99560" d="M12 32c0-6 4-8 10-8h18c6 0 8 4 8 8v8c0 4-4 6-8 6H20c-6 0-8-4-8-8z" />
      <path {...S} fill="none" d="M18 46v8M26 46v8M36 46v8M42 46v8M12 32c-4-2-6-6-4-10" />
      <path {...S} fill="#c99560" d="M40 16h14c2 0 4 2 4 4v6c0 4-4 6-8 6h-6c-4 0-6-2-6-6v-4c0-4 0-6 2-6z" />
      <path {...S} fill="#6e4b2a" d="M42 16c-4 0-6 4-4 10l4-2z" />
      <circle cx={50} cy={22} r={1.7} fill={INK} />
      <circle cx={57} cy={26} r={2} fill={INK} />
    </>
  ),
  cat: (
    <>
      <path {...S} fill="#8c8c8c" d="M18 50c-6-10-2-24 12-24s18 14 12 24z" />
      <path {...S} fill="#8c8c8c" d="M20 28l-2-14 8 6h12l8-6-2 14c0 6-6 10-12 10s-12-4-12-10z" />
      <circle cx={27} cy={26} r={1.8} fill={INK} />
      <circle cx={37} cy={26} r={1.8} fill={INK} />
      <path {...S} fill="none" d="M30 31h4M44 46c8 0 10-8 6-12" />
    </>
  ),
  fish: (
    <>
      <path {...S} fill="#3f8fa3" d="M8 32c8-10 22-14 34-6l12-8v28l-12-8C30 46 16 42 8 32z" />
      <circle cx={18} cy={30} r={2} fill={INK} />
      <path stroke="#fff" strokeOpacity={0.5} strokeWidth={2} fill="none" d="M26 26c3 3 3 9 0 12M32 26c3 3 3 9 0 12" />
    </>
  ),
  elephant: (
    <>
      <path {...S} fill="#9a9a9e" d="M14 30c0-10 8-14 18-14s16 6 16 14v14H14z" />
      <path {...S} fill="#9a9a9e" d="M42 22c8 0 12 6 12 14v14c0 4-6 4-6 0V34c-2-2-6-4-6-12z" />
      <path {...S} fill="#b5b5b9" d="M30 18c-8 0-12 6-10 14 6 2 12-2 12-8z" />
      <path {...S} fill="none" d="M18 44v10M26 44v10M36 44v10M44 44v10" />
      <circle cx={44} cy={26} r={1.7} fill={INK} />
    </>
  ),
  giraffe: (
    <>
      <path {...S} fill="#f2b33d" d="M38 8h8c2 0 4 2 4 4v2c0 2-2 3-4 3h-2v20c0 4-2 8-8 8H18c-6 0-8-4-8-8v-2c0-4 4-6 8-6h16V14c0-4 2-6 4-6z" />
      <path fill="#b5743e" d="M38 18h4v4h-4zM37 26h5v5h-5zM18 33h6v5h-6zM28 33h5v5h-5z" />
      <path {...S} fill="none" d="M14 44v12M20 44v12M30 44v12M36 44v12M40 8l-2-4M46 8l2-4" />
      <circle cx={44} cy={12} r={1.5} fill={INK} />
    </>
  ),
  lion: (
    <>
      <circle {...S} cx={32} cy={30} r={20} fill="#c8763a" />
      <circle {...S} cx={32} cy={32} r={12} fill="#f2b33d" />
      <circle cx={28} cy={30} r={1.7} fill={INK} />
      <circle cx={36} cy={30} r={1.7} fill={INK} />
      <path {...S} fill={INK} d="M30 35h4l-2 2z" />
      <path {...S} fill="none" d="M32 37v2M29 40c2 1 4 1 6 0" />
    </>
  ),
  zebra: (
    <>
      <path {...S} fill="#fbf4e6" d="M10 30c0-6 4-8 10-8h20c6 0 8 4 8 8v10c0 4-4 6-8 6H18c-6 0-8-4-8-8z" />
      <path fill={INK} d="M18 22l3 0-2 24h-3zM26 22h3l-1 24h-3zM34 22h3l1 24h-3z" />
      <path {...S} fill="#fbf4e6" d="M42 14c6-4 12-2 14 4l-2 12c-4 2-8 0-10-4z" />
      <path {...S} fill="none" d="M16 46v8M22 46v8M36 46v8M42 46v8" />
      <circle cx={51} cy={20} r={1.6} fill={INK} />
    </>
  ),
  bird: (
    <>
      <path {...S} fill="#3f8fa3" d="M12 36c0-10 8-16 18-16 6 0 10 2 12 6l10 2-10 4c0 10-8 16-18 16-8 0-12-4-12-12z" />
      <path {...S} fill="#2a6f80" d="M18 36c6-4 14-4 18 2-6 4-12 4-18-2z" />
      <circle cx={38} cy={28} r={1.7} fill={INK} />
    </>
  ),
  tree: (
    <>
      <path {...S} fill="#6e4b2a" d="M28 34h8v20h-8z" />
      <path {...S} fill="#6b8f3a" d="M10 30c0-6 6-10 12-8 2-6 8-10 14-8 6-2 12 2 14 8 6 0 10 6 6 12-2 4-8 6-14 4H22c-8 0-12-2-12-8z" />
    </>
  ),
  flower: (
    <>
      <path {...S} fill="none" d="M32 34v22M32 48c-6-6-12-4-14-2 4 4 10 4 14 2z" />
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} {...S} cx={32} cy={20} rx={6} ry={9} fill="#e86a8a" transform={`rotate(${r} 32 28)`} />
      ))}
      <circle {...S} cx={32} cy={28} r={5} fill="#f2b33d" />
    </>
  ),
  leaf: (
    <>
      <path {...S} fill="#6b8f3a" d="M12 52C10 30 24 12 52 12c0 26-16 42-40 40z" />
      <path {...S} fill="none" d="M12 52L40 24M24 40h8M30 34v-8" />
    </>
  ),
  sun: (
    <>
      <circle {...S} cx={32} cy={32} r={12} fill="#f2b33d" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <path key={r} {...S} d="M32 8v8" transform={`rotate(${r} 32 32)`} />
      ))}
    </>
  ),
  cloud: (
    <path {...S} fill="#f4f1ea" d="M14 46c-6 0-8-10 0-12 0-8 8-12 14-8 4-8 18-8 20 2 8 0 10 10 4 14-2 2-4 4-8 4z" />
  ),
  rain: (
    <>
      <path {...S} fill="#c9d3d8" d="M14 34c-6 0-8-10 0-12 0-8 8-12 14-8 4-8 18-8 20 2 8 0 10 10 4 14-2 2-4 4-8 4z" />
      <path {...S} stroke="#3f8fa3" d="M20 42l-3 8M32 42l-3 8M44 42l-3 8" />
    </>
  ),
  moon: (
    <>
      <path {...S} fill="#f4e3a1" d="M40 10a22 22 0 1014 30A18 18 0 0140 10z" />
    </>
  ),
  star: (
    <path {...S} fill="#f2b33d" d="M32 8l7 15 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2z" />
  ),
  wind: (
    <path {...S} fill="none" d="M8 24h30c6 0 8-8 2-10M8 34h40c8 0 8 10 2 10M8 44h20" />
  ),
  rock: (
    <path {...S} fill="#a8a093" d="M8 50l6-20 14-10 16 4 12 14 0 12z" />
  ),
  toothbrush: (
    <>
      <path {...S} fill="#3f8fa3" d="M8 46l34-18 3 5-34 18z" />
      <path {...S} fill="#fbf4e6" d="M40 22l10-6 6 10-10 6z" />
    </>
  ),
  soap: (
    <>
      <rect {...S} x={12} y={26} width={40} height={22} rx={8} fill="#e86a8a" />
      <circle {...S} cx={20} cy={18} r={4} fill="#fff" strokeWidth={1.6} />
      <circle {...S} cx={30} cy={14} r={3} fill="#fff" strokeWidth={1.6} />
      {hl('M18 34h14')}
    </>
  ),
  comb: (
    <>
      <path {...S} fill="#2f7d72" d="M8 24h48v8H8z" />
      <path {...S} fill="none" d="M12 32v12M18 32v12M24 32v12M30 32v12M36 32v12M42 32v12M48 32v12M54 32v8" />
    </>
  ),
  towel: (
    <>
      <path {...S} fill="#f2b33d" d="M14 10h36v44H14z" />
      <path stroke="#c8553d" strokeWidth={4} d="M14 44h36M14 50h36" />
    </>
  ),
  tap: (
    <>
      <path {...S} fill="#c9c2b4" d="M8 18h28c6 0 10 4 10 10v6h-8v-6c0-2-1-2-2-2H8z" />
      <path {...S} fill="#a8a093" d="M18 10h8v8h-8z" />
      <path {...S} fill="#9cc9d6" d="M42 40c3 5 4 8 0 10s-4-5 0-10z" />
    </>
  ),
  drum: (
    <>
      <ellipse {...S} cx={32} cy={18} rx={18} ry={6} fill="#efe2cc" />
      <path {...S} fill="#c8553d" d="M14 18v28c0 4 8 8 18 8s18-4 18-8V18c0 4-8 6-18 6s-18-2-18-6z" />
      <path stroke={INK} strokeWidth={2} fill="none" d="M14 24l9 26M23 24l9 30M32 24l9 30M41 24l9 22" />
    </>
  ),
  bell: (
    <>
      <path {...S} fill="#f2b33d" d="M18 44c4-4 2-24 14-24s10 20 14 24z" />
      <path {...S} fill="#c8763a" d="M14 44h36v4H14z" />
      <circle {...S} cx={32} cy={52} r={3} fill="#c8763a" />
      <path {...S} fill="none" d="M32 20v-6" />
    </>
  ),
  matatu: (
    <>
      <path {...S} fill="#f2b33d" d="M6 22c0-4 2-6 6-6h34c6 0 12 8 12 16v10H6z" />
      <path {...S} fill="#9cc9d6" d="M12 22h10v8H12zM26 22h10v8H26zM40 22h6c3 0 6 4 7 8H40z" />
      <path fill="#c8553d" d="M6 34h52v3H6z" />
      <circle {...S} cx={18} cy={44} r={6} fill="#2a1b12" />
      <circle {...S} cx={46} cy={44} r={6} fill="#2a1b12" />
    </>
  ),
  clip: (
    <path {...S} fill="none" stroke="#2a6f80" strokeWidth={5} d="M10 26h40c8 0 8 12 0 12H16c-4 0-4-6 0-6h30" />
  ),
  hand: (
    <path {...S} fill="#b5743e" d="M18 52c-6-6-10-14-8-18 2-2 4-2 6 2l4 6V14c0-3 5-3 5 0v16-20c0-3 5-3 5 0v20-18c0-3 5-3 5 0v18-14c0-3 5-3 5 0v26c0 8-4 12-10 14z" />
  ),
  stick: (
    <path {...S} fill="#b5743e" d="M6 34l50-8 2 4-50 8z" />
  ),
  stool: (
    <>
      <path {...S} fill="#b5743e" d="M10 22h44v8H10z" />
      <path {...S} fill="none" d="M16 30l-4 22M48 30l4 22M24 30l-2 22M40 30l2 22" />
    </>
  ),
  feather: (
    <>
      <path {...S} fill="#efe2cc" d="M50 8C30 10 16 26 16 46l4 2C36 44 52 28 50 8z" />
      <path {...S} fill="none" d="M10 56l30-34" />
    </>
  ),
  stone: (
    <path {...S} fill="#8c8478" d="M10 44c0-12 10-20 24-20s20 8 20 18c0 8-8 12-22 12S10 52 10 44z" />
  ),
  pumpkin: (
    <>
      <path {...S} fill="#ef8d2c" d="M32 20c-14-6-24 4-24 16s10 18 24 16c14 2 24-4 24-16s-10-22-24-16z" />
      <path {...S} fill="none" d="M32 20v32M22 22c-6 8-6 22 0 30M42 22c6 8 6 22 0 30" />
      <path {...S} fill="#6b8f3a" d="M30 20l2-8 4 2-2 6z" />
    </>
  ),
  glass: (
    <>
      <path {...S} fill="#e8f2f4" d="M22 18h20l-2 34H24z" />
      <path fill="#9cc9d6" d="M23 32h18l-1 19H24z" />
    </>
  ),
  basin: (
    <>
      <path {...S} fill="#2f7d72" d="M6 26h52c0 14-10 24-26 24S6 40 6 26z" />
      <ellipse {...S} cx={32} cy={26} rx={26} ry={6} fill="#9cc9d6" />
    </>
  ),
  spoonful: (
    <>
      <ellipse {...S} cx={22} cy={22} rx={9} ry={12} transform="rotate(-40 22 22)" fill="#c9c2b4" />
      <ellipse cx={22} cy={22} rx={5} ry={7} transform="rotate(-40 22 22)" fill="#9cc9d6" />
      <path {...S} fill="#c9c2b4" d="M27 28l24 24-3 3-24-24z" />
    </>
  ),
  jerrycan: (
    <>
      <path {...S} fill="#f2b33d" d="M14 18h30l8 8v28H14z" />
      <path {...S} fill="#c8763a" d="M42 10h8v8h-8z" />
      <path {...S} fill="none" d="M20 18v-6h14v6M14 32h38" />
    </>
  ),
  well: (
    <>
      <path {...S} fill="#a8a093" d="M12 36h40v18H12z" />
      <path {...S} fill="none" d="M16 36V14M48 36V14M10 14h44M32 14v12" />
      <path {...S} fill="#3f8fa3" d="M28 26h8v6h-8z" />
    </>
  ),
  river: (
    <>
      <path {...S} fill="#3f8fa3" d="M6 20c14-6 20 6 30 2s18-6 22-2v12c-8-4-14 4-24 4S14 28 6 32z" />
      <path {...S} fill="#6b8f3a" d="M6 44h52v10H6z" />
      <path stroke="#fff" strokeOpacity={0.6} strokeWidth={2} fill="none" d="M16 26c4-2 8 0 10 0M38 26c4-2 8-2 10 0" />
    </>
  ),
  lake: (
    <>
      <ellipse {...S} cx={32} cy={38} rx={26} ry={12} fill="#3f8fa3" />
      <path stroke="#fff" strokeOpacity={0.6} strokeWidth={2} d="M20 36h8M36 40h10" />
      <path {...S} fill="#6b8f3a" d="M10 30l4-8 4 8z" />
    </>
  ),
  root: (
    <>
      <path {...S} fill="#6b8f3a" d="M32 30c-6-10-16-12-20-8 4 6 12 8 20 8zM32 30c6-10 16-12 20-8-4 6-12 8-20 8z" />
      <path fill="#8a5a33" d="M4 32h56v24H4z" opacity={0.35} />
      <path {...S} fill="none" stroke="#efe2cc" d="M32 30v10M32 40l-8 8M32 40l8 8M32 44v10" />
    </>
  ),
  stem: (
    <>
      <path {...S} fill="none" stroke="#5a7d2c" strokeWidth={5} d="M32 56V12" />
      <path {...S} fill="#6b8f3a" d="M32 30c-10-6-16-2-18 2 8 4 14 2 18-2zM32 22c10-6 16-2 18 2-8 4-14 2-18-2z" />
    </>
  ),
  seed: (
    <>
      <ellipse {...S} cx={24} cy={36} rx={8} ry={12} fill="#b5743e" transform="rotate(-20 24 36)" />
      <ellipse {...S} cx={42} cy={34} rx={7} ry={10} fill="#d99a4e" transform="rotate(20 42 34)" />
    </>
  ),
  fruit: (
    <>
      <circle {...S} cx={24} cy={38} r={12} fill="#d8452f" />
      <circle {...S} cx={42} cy={38} r={12} fill="#f2b33d" />
      <path {...S} fill="none" d="M24 26c0-6 4-10 8-12M42 26c0-6-4-10-8-12" />
    </>
  ),
  teacher: (
    <>
      <circle {...S} cx={32} cy={18} r={9} fill="#8a5a33" />
      <path {...S} fill="#2f7d72" d="M16 56c0-14 6-24 16-24s16 10 16 24z" />
      <path {...S} fill="#fbf4e6" d="M40 40h16v12H40z" />
    </>
  ),
  child: (
    <>
      <circle {...S} cx={32} cy={20} r={10} fill="#8a5a33" />
      <path {...S} fill="#c8553d" d="M18 56c0-12 6-22 14-22s14 10 14 22z" />
      <circle cx={28} cy={20} r={1.4} fill={INK} />
      <circle cx={36} cy={20} r={1.4} fill={INK} />
      <path {...S} fill="none" d="M29 25c2 1 4 1 6 0" />
    </>
  ),
  hoe: (
    <>
      <path {...S} fill="#b5743e" d="M10 54l30-40 4 3-30 40z" />
      <path {...S} fill="#a8a093" d="M38 12l16 4-4 10-14-6z" />
    </>
  ),
  clay: (
    <>
      <path {...S} fill="#b5603a" d="M18 22c-6 4-8 12-6 20 2 10 12 14 20 14s18-4 20-14c2-8 0-16-6-20z" />
      <path {...S} fill="#9a4c2c" d="M20 14h24v8H20z" />
    </>
  ),
  sand: (
    <>
      <path {...S} fill="#e8c88a" d="M6 50c8-16 20-22 26-22s18 6 26 22z" />
      <circle cx={24} cy={44} r={1.2} fill={INK} opacity={0.5} />
      <circle cx={34} cy={40} r={1.2} fill={INK} opacity={0.5} />
      <circle cx={42} cy={46} r={1.2} fill={INK} opacity={0.5} />
    </>
  ),
  loam: (
    <>
      <path {...S} fill="#5a3a22" d="M6 50c8-16 20-22 26-22s18 6 26 22z" />
      <path {...S} fill="#6b8f3a" d="M30 28c-2-8-8-10-12-8 2 6 8 8 12 8zM34 28c2-8 8-10 12-8-2 6-8 8-12 8z" />
    </>
  ),
  ear: (
    <path {...S} fill="#b5743e" d="M24 52c-6-4-10-14-8-24 2-12 12-18 22-16 10 2 14 12 12 20-2 6-8 8-10 14-2 8-8 10-16 6zM30 30c0-6 8-8 10-2" />
  ),
  radio: (
    <>
      <rect {...S} x={8} y={22} width={48} height={30} rx={6} fill="#c8553d" />
      <circle {...S} cx={22} cy={37} r={8} fill="#2a1b12" />
      <path {...S} fill="none" d="M38 32h12M38 38h12M38 44h12M20 22l20-12" />
    </>
  ),
  whistle: (
    <>
      <path {...S} fill="#c9c2b4" d="M8 28h26v-4h8v4c8 0 14 6 14 14s-6 12-14 12-14-4-14-12H8z" />
      <circle cx={42} cy={42} r={4} fill={INK} />
    </>
  ),
  thunder: (
    <>
      <path {...S} fill="#8a8f96" d="M14 30c-6 0-8-10 0-12 0-8 8-12 14-8 4-8 18-8 20 2 8 0 10 10 4 14-2 2-4 4-8 4z" />
      <path {...S} fill="#f2b33d" d="M30 30l-6 14h8l-4 14 14-18h-8l4-10z" />
    </>
  ),
  coin1: <Coin value="1" />,
  coin5: <Coin value="5" />,
  coin10: <Coin value="10" />,
  coin20: <Coin value="20" />,
  note50: <Note value="50" color="#3f7f5f" />,
  note100: <Note value="100" color="#7b4a8f" />,
} satisfies Record<string, ReactNode>

function Coin({ value }: { value: string }) {
  // Stylised, not exact replicas: the bigger coins get a gold tone so they read apart at a glance.
  const gold = value === '20' || value === '10'
  return (
    <>
      <circle {...S} cx={32} cy={32} r={value === '1' ? 18 : 22} fill={gold ? '#d9b44a' : '#c9c2b4'} />
      <circle cx={32} cy={32} r={value === '1' ? 13 : 16} fill={value === '20' ? '#c9c2b4' : 'none'} stroke={INK} strokeOpacity={0.3} strokeWidth={2} />
      <text x={32} y={39} textAnchor="middle" fontFamily="Lexend Variable, sans-serif" fontWeight={700} fontSize={value.length > 1 ? 18 : 20} fill={INK}>
        {value}
      </text>
    </>
  )
}

function Note({ value, color }: { value: string; color: string }) {
  return (
    <>
      <rect {...S} x={2} y={16} width={60} height={32} rx={4} fill={color} />
      <rect x={6} y={20} width={52} height={24} rx={2} fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={1.5} />
      <circle cx={18} cy={32} r={8} fill="#fff" fillOpacity={0.3} />
      <text x={44} y={39} textAnchor="middle" fontFamily="Lexend Variable, sans-serif" fontWeight={700} fontSize={18} fill="#fff">
        {value}
      </text>
    </>
  )
}

export type ArtId = keyof typeof ART
export const ART_IDS = Object.keys(ART) as ArtId[]

/** Human names, used for alt text and for generated questions ("How many mangoes?"). */
export const ART_NAMES: Partial<Record<ArtId, [string, string]>> = {
  mango: ['mango', 'mangoes'],
  orange: ['orange', 'oranges'],
  banana: ['banana', 'bananas'],
  egg: ['egg', 'eggs'],
  maize: ['maize cob', 'maize cobs'],
  tomato: ['tomato', 'tomatoes'],
  pencil: ['pencil', 'pencils'],
  book: ['book', 'books'],
  ball: ['ball', 'balls'],
  cup: ['cup', 'cups'],
  goat: ['goat', 'goats'],
  cow: ['cow', 'cows'],
  hen: ['hen', 'hens'],
  fish: ['fish', 'fish'],
  bird: ['bird', 'birds'],
  tree: ['tree', 'trees'],
  flower: ['flower', 'flowers'],
  star: ['star', 'stars'],
  shoe: ['shoe', 'shoes'],
  drum: ['drum', 'drums'],
  leaf: ['leaf', 'leaves'],
  stone: ['stone', 'stones'],
}

export function artName(id: ArtId, n = 1): string {
  const names = ART_NAMES[id]
  if (!names) return String(id)
  return n === 1 ? names[0] : names[1]
}

export function Art({ id, size = 64, title, className }: { id: ArtId; size?: number | string; title?: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} role="img" aria-label={title ?? artName(id)}>
      {ART[id]}
    </svg>
  )
}
