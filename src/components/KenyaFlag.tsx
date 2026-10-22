// A small Kenyan flag that ripples gently, drawn in vertical slices that rise and fall one
// after another. It sits behind the wordmark, softened so the letters stay crisp.
const W = 60
const H = 40
const SLICES = 12

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="60" height="12" fill="#000"/>
<rect y="12" width="60" height="2" fill="#fff"/>
<rect y="14" width="60" height="12" fill="#be0027"/>
<rect y="26" width="60" height="2" fill="#fff"/>
<rect y="28" width="60" height="12" fill="#007a3d"/>
<g stroke="#fff" stroke-width="1.3" stroke-linecap="round"><path d="M22 5L38 35"/><path d="M38 5L22 35"/></g>
<ellipse cx="30" cy="20" rx="6.5" ry="13" fill="#be0027" stroke="#000" stroke-width="0.8"/>
<path d="M30 7c-3 4-3 22 0 26c3-4 3-22 0-26z" fill="#000"/>
<ellipse cx="30" cy="20" rx="1.2" ry="2.6" fill="#fff"/>
</svg>`
const URL_SVG = `url("data:image/svg+xml,${encodeURIComponent(SVG)}")`

export function KenyaFlag({ width = 60 }: { width?: number }) {
  const h = (width * H) / W
  const sw = width / SLICES
  return (
    <span className="kenya-flag" style={{ width, height: h }} aria-hidden>
      {Array.from({ length: SLICES }, (_, i) => (
        <span
          key={i}
          className="kf-slice"
          style={{
            left: i * sw,
            width: sw + 0.6,
            backgroundImage: URL_SVG,
            backgroundSize: `${width}px ${h}px`,
            backgroundPosition: `${-i * sw}px 0`,
            animationDelay: `${-i * 0.14}s`,
          }}
        />
      ))}
    </span>
  )
}
