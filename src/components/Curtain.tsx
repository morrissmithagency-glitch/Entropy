// Page transition: a kanga cloth sweeps across the screen, rippling as it moves.
// Drawn with a single WebGL fragment shader (no libraries). Kangas carry a printed
// saying, so ours shows a Kiswahili proverb while the screen is covered.
import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { sfx } from '../audio/sfx'

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform float uProg;

// Dusk silk: midnight indigo with fine gold, the app's own palette.
const vec3 INK = vec3(0.027, 0.051, 0.106);
const vec3 TEAL = vec3(0.067, 0.114, 0.212);
const vec3 TEAL2 = vec3(0.45, 0.38, 0.55);
const vec3 OCHRE = vec3(0.114, 0.165, 0.345);
const vec3 TERRA = vec3(0.30, 0.26, 0.45);
const vec3 CREAM = vec3(0.945, 0.81, 0.53);

float ease(float x) { x = clamp(x, 0.0, 1.0); return x < 0.5 ? 4.0*x*x*x : 1.0 - pow(-2.0*x + 2.0, 3.0) / 2.0; }

float height(vec2 p, float t) {
  return 0.55 * sin(p.x * 7.0 + p.y * 1.7 - t * 5.0)
       + 0.30 * sin(p.x * 13.0 - p.y * 4.0 + t * 3.3)
       + 0.18 * sin(p.y * 10.0 + p.x * 3.0 - t * 4.2);
}

float aa(float d, float w) { return smoothstep(w, -w, d); }

vec3 kanga(vec2 p, float distHem, float px) {
  // Border (pindo): along the top, the bottom and the travelling hem.
  float border = min(min(p.y, 1.0 - p.y), distHem);
  if (border < 0.085) {
    vec2 b = p * 26.0;
    float along = distHem < min(p.y, 1.0 - p.y) ? p.y * 26.0 : b.x;
    float across = border * 26.0;
    vec3 c = TEAL;
    float tri = abs(fract(along) - 0.5) * 2.0;
    c = mix(c, TERRA, aa(across - 0.1 - (1.0 - tri) * 0.9, px * 26.0));
    vec2 dotP = vec2(fract(along) - 0.5, across - 1.55);
    c = mix(c, CREAM, aa(length(dotP) - 0.18, px * 26.0));
    c = mix(c, INK, aa(abs(border - 0.083) - 0.004, px));
    return c;
  }
  // Field (mji): a diamond lattice of rings and dots.
  vec2 q = vec2(p.x + p.y, p.x - p.y) * 5.2;
  vec2 cell = fract(q) - 0.5;
  float d = length(cell);
  vec3 c = OCHRE;
  c = mix(c, TERRA, aa(d - 0.33, px * 7.0));
  c = mix(c, OCHRE, aa(d - 0.3, px * 7.0));
  c = mix(c, CREAM, aa(abs(d - 0.2) - 0.012, px * 7.0));
  c = mix(c, CREAM, aa(d - 0.05, px * 7.0));
  vec2 corner = fract(q + 0.5) - 0.5;
  c = mix(c, TEAL2, aa(length(corner) - 0.07, px * 7.0));
  return c;
}

void main() {
  float aspect = uRes.x / uRes.y;
  float x = vUv.x;
  float y = 1.0 - vUv.y;
  float t = uTime;
  float tilt = (0.5 - y) * 0.16;
  float wave = 0.03 * sin(y * 7.0 + t * 7.0) + 0.018 * sin(y * 17.0 - t * 5.0);
  float coverP = ease(uProg);
  float revealP = ease(uProg - 1.0);
  float L0 = uProg < 1.0 ? mix(1.2, -0.2, coverP) : -9.0;
  float T0 = uProg < 1.0 ? 9.0 : mix(1.2, -0.2, revealP);
  float L = L0 + tilt + wave * (1.0 - coverP * 0.6);
  float T = T0 + tilt + wave;
  float anchor = uProg < 1.0 ? L0 : T0 - 1.4;
  float px = 1.0 / uRes.y;

  float inside = step(L, x) * step(x, T);
  if (inside < 0.5) {
    // Soft shadow the cloth casts just past its hem.
    float dd = uProg < 1.0 ? L - x : x - T;
    float sh = dd > 0.0 ? 0.28 * (1.0 - smoothstep(0.0, 0.06, dd)) : 0.0;
    gl_FragColor = vec4(INK * sh, sh);
    return;
  }

  float distHem = min(x - L, T - x) * aspect;
  vec2 p = vec2((x - anchor) * aspect, y);
  float billow = 0.6 + 1.6 * exp(-distHem * 9.0);
  float e = 0.004;
  float h = height(p, t);
  float hx = height(p + vec2(e, 0.0), t);
  float hy = height(p + vec2(0.0, e), t);
  vec3 n = normalize(vec3(-(hx - h) / e * 0.03 * billow, -(hy - h) / e * 0.03 * billow, 1.0));
  vec2 pd = p + vec2(h, h * 0.5) * 0.014 * billow;

  vec3 col = kanga(vec2(pd.x, pd.y), distHem, px);
  float diff = 0.72 + 0.42 * dot(n, normalize(vec3(-0.5, 0.55, 0.85)));
  float spec = pow(max(0.0, dot(n, normalize(vec3(-0.25, 0.35, 1.0)))), 28.0) * 0.32;
  col = col * diff + spec;
  // Darken the hem line.
  col = mix(col, INK, 1.0 - smoothstep(0.0, 0.006, distHem));
  gl_FragColor = vec4(col, 1.0);
}
`

const PROVERBS: [string, string][] = [
  ['Haba na haba hujaza kibaba', 'Little by little fills the measure'],
  ['Mwenda pole hajikwai', 'Whoever goes slowly does not stumble'],
  ['Penye nia pana njia', 'Where there is a will, there is a way'],
  ['Elimu ni bahari', 'Learning is an ocean'],
  ['Bandu bandu huisha gogo', 'Chip by chip, the log is finished'],
  ['Usipoziba ufa utajenga ukuta', 'Fix the crack, or build the whole wall'],
]

type Run = (swap: () => void) => Promise<void>
const CurtainContext = createContext<Run>(async (swap) => swap())
export const useCurtain = () => useContext(CurtainContext)

const COVER_MS = 760
const REVEAL_MS = 820

export function CurtainProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<{ gl: WebGLRenderingContext; uProg: WebGLUniformLocation; uTime: WebGLUniformLocation; uRes: WebGLUniformLocation } | null>(null)
  const [active, setActive] = useState(false)
  const [proverb, setProverb] = useState<[string, string] | null>(null)
  const [mode, setMode] = useState<'gl' | 'css' | 'fade'>('gl')
  const [cssProg, setCssProg] = useState(0)
  const busy = useRef(false)
  const proverbIdx = useRef(Math.floor(Math.random() * PROVERBS.length))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setMode('fade')
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true })
    if (!canvas || !gl) return setMode('css')
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader')
      return s
    }
    try {
      const prog = gl.createProgram()!
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
      gl.useProgram(prog)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'aPos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      glRef.current = {
        gl,
        uProg: gl.getUniformLocation(prog, 'uProg')!,
        uTime: gl.getUniformLocation(prog, 'uTime')!,
        uRes: gl.getUniformLocation(prog, 'uRes')!,
      }
    } catch (err) {
      console.warn('Cloth transition falling back to CSS', err)
      setMode('css')
    }
  }, [])

  const draw = useCallback((prog: number, time: number) => {
    const g = glRef.current
    const canvas = canvasRef.current
    if (!g || !canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const w = Math.round(window.innerWidth * dpr)
    const h = Math.round(window.innerHeight * dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    g.gl.viewport(0, 0, w, h)
    g.gl.uniform2f(g.uRes, w, h)
    g.gl.uniform1f(g.uProg, prog)
    g.gl.uniform1f(g.uTime, time)
    g.gl.clearColor(0, 0, 0, 0)
    g.gl.clear(g.gl.COLOR_BUFFER_BIT)
    g.gl.drawArrays(g.gl.TRIANGLE_STRIP, 0, 4)
  }, [])

  const animate = useCallback(
    (from: number, to: number, ms: number) =>
      new Promise<void>((resolve) => {
        const start = performance.now()
        const tick = (now: number) => {
          const k = Math.min(1, (now - start) / ms)
          const prog = from + (to - from) * k
          if (mode === 'gl') draw(prog, now / 1000)
          else setCssProg(prog)
          if (k < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      }),
    [draw, mode],
  )

  const run: Run = useCallback(
    async (swap) => {
      if (busy.current) return
      busy.current = true
      setActive(true)
      if (mode === 'fade') {
        await new Promise((r) => setTimeout(r, 160))
        swap()
        await new Promise((r) => setTimeout(r, 160))
      } else {
        sfx.whoosh()
        await animate(0, 1, COVER_MS)
        proverbIdx.current = (proverbIdx.current + 1) % PROVERBS.length
        setProverb(PROVERBS[proverbIdx.current])
        swap()
        // Let the new screen mount and paint under the cloth, and the proverb be read.
        await new Promise((r) => setTimeout(r, 520))
        setProverb(null)
        await animate(1, 2, REVEAL_MS)
        if (mode === 'gl') draw(2, 0)
      }
      setActive(false)
      busy.current = false
    },
    [animate, draw, mode],
  )

  return (
    <CurtainContext.Provider value={run}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 100, pointerEvents: active ? 'auto' : 'none', display: mode === 'gl' ? 'block' : 'none' }}
      />
      {mode === 'css' && active && <CssCloth prog={cssProg} />}
      {mode === 'fade' && <motion.div aria-hidden animate={{ opacity: active ? 1 : 0 }} style={{ position: 'fixed', inset: 0, background: 'var(--night-900)', zIndex: 100, pointerEvents: 'none' }} />}
      <AnimatePresence>
        {proverb && (
          <motion.div
            key={proverb[0]}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -6 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', zIndex: 101, pointerEvents: 'none', padding: 16 }}
          >
            <div style={{ color: 'var(--cloud)', textAlign: 'center', maxWidth: 560, textShadow: '0 2px 20px rgba(7,13,27,.9)' }}>
              <div className="display" style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontStyle: 'italic', fontWeight: 300 }}>
                {proverb[0]}
              </div>
              <div style={{ fontSize: 15, color: 'var(--gold)', marginTop: 8, letterSpacing: '0.04em' }}>{proverb[1]}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CurtainContext.Provider>
  )
}

function CssCloth({ prog }: { prog: number }) {
  const left = prog < 1 ? 100 - prog * 100 : 0
  const right = prog < 1 ? 0 : (prog - 1) * 100
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: `${left}%`,
        right: `${right}%`,
        zIndex: 100,
        background: 'radial-gradient(circle, var(--gold) 6%, transparent 8%) 0 0 / 46px 46px, var(--night-700)',
        borderLeft: '10px solid var(--night-800)',
        boxShadow: '-12px 0 24px rgba(0,0,0,.25)',
      }}
    />
  )
}
