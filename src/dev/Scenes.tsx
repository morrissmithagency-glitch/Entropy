// Dev-only: every landscape side by side (?scenes).
import { NatureScene, type SceneId } from '../components/NatureScene'

const IDS: SceneId[] = ['lake-dusk', 'savanna-dawn', 'forest-mist', 'tea-hills', 'coast-sunset', 'flamingo-lake', 'golden-hills']

export function Scenes() {
  return (
    <main style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: 8 }}>
      {IDS.map((id) => (
        <div key={id} style={{ position: 'relative', height: 380, borderRadius: 16, overflow: 'hidden' }}>
          <NatureScene id={id} />
          <span style={{ position: 'absolute', left: 12, top: 10 }}>{id}</span>
        </div>
      ))}
    </main>
  )
}
