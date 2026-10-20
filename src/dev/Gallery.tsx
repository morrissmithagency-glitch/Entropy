// Dev-only: every illustration and widget on one page, for visual review (?gallery).
import { ART_IDS, Art } from '../components/art/objects'
import { LevelIcon } from '../components/art/levels'
import { Kobe } from '../components/Kobe'
import { VisualView } from '../components/widgets/Visual'
import type { Visual } from '../engine/types'

const VISUALS: Visual[] = [
  { kind: 'count', art: 'mango', n: 13 },
  { kind: 'groups', groups: [{ art: 'egg', n: 3 }, { art: 'egg', n: 2 }], joiner: '+' },
  { kind: 'groups', groups: [{ art: 'orange', n: 6 }, { art: 'orange', n: 2 }], joiner: '−' },
  { kind: 'clock', hour: 4 },
  { kind: 'money', values: [50, 20, 10, 5, 1] },
  { kind: 'shapes', shapes: [{ kind: 'circle', color: '#c8553d' }, { kind: 'triangle', color: '#2f7d72' }, { kind: 'rectangle' }, { kind: 'square', color: '#3f8fa3' }] },
  { kind: 'sizes', art: 'pencil', scales: [0.55, 1], axis: 'x' },
  { kind: 'sizes', art: 'tree', scales: [0.55, 0.8, 1], axis: 'y' },
  { kind: 'balance', left: 'stone', right: 'feather', heavier: 'left' },
  { kind: 'units', art: 'stick', unit: 'clip', n: 6 },
  { kind: 'units', art: 'jug', unit: 'cup', n: 5 },
  { kind: 'tens', tens: 4, ones: 7 },
  { kind: 'sequence', items: [35, 40, null, 50, 55] },
  { kind: 'sum', a: 34, b: 25, op: '+', result: null, vertical: true },
  { kind: 'sum', a: 7, b: -1, op: '+', result: 10 },
  { kind: 'lines', lines: ['straight', 'curved', 'curved', 'straight', 'curved'] },
  { kind: 'pattern', items: [{ kind: 'circle', color: '#c8553d' }, { kind: 'triangle', color: '#2f7d72' }, { kind: 'circle', color: '#c8553d' }, null] },
  { kind: 'position', art: 'cat', where: 'under' },
  { kind: 'position', art: 'ball', where: 'in' },
  { kind: 'passage', title: 'The Rain', text: 'It rained all night. In the morning, Achieng saw a big puddle near the gate.' },
]

export function Gallery() {
  return (
    <main style={{ padding: 24, background: 'var(--paper)' }}>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'end' }}>
        {(['idle', 'happy', 'cheer', 'think', 'oops'] as const).map((m) => (
          <div key={m} style={{ textAlign: 'center' }}>
            <Kobe mood={m} size={180} />
            <div>{m}</div>
          </div>
        ))}
        {[1, 2, 3, 4, 5].map((l) => (
          <LevelIcon key={l} level={l} size={72} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 96px)', gap: 8, marginTop: 24 }}>
        {ART_IDS.map((id) => (
          <div key={id} style={{ textAlign: 'center', fontSize: 11, background: '#fff', borderRadius: 12, padding: 6 }}>
            <Art id={id} size={72} />
            <div>{id}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 24 }}>
        {VISUALS.map((v, i) => (
          <div key={i} style={{ background: '#fffaf0', border: '2px solid #2a1b12', borderRadius: 16, padding: 16, display: 'flex', justifyContent: 'center' }}>
            <VisualView v={v} />
          </div>
        ))}
      </div>
    </main>
  )
}
