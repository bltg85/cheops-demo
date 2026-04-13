/**
 * Cheops — Puzzle Graphics (SVG)
 *
 * Renderar SVG-grafik för bossrum och specialrum.
 * Lägg till nya grafik-typer här när fler bossrum skapas.
 */

/* ------------------------------------------------------------------ */
/* Barnsley-fern (ormbunke-fraktal)                                    */
/* ------------------------------------------------------------------ */
function generateFern() {
  let x = 0, y = 0
  const pts = []
  for (let i = 0; i < 1800; i++) {
    const r = Math.random()
    let nx, ny
    if (r < 0.01) {
      nx = 0; ny = 0.16 * y
    } else if (r < 0.86) {
      nx = 0.85 * x + 0.04 * y
      ny = -0.04 * x + 0.85 * y + 1.6
    } else if (r < 0.93) {
      nx = 0.2 * x - 0.26 * y
      ny = 0.23 * x + 0.22 * y + 1.6
    } else {
      nx = -0.15 * x + 0.28 * y
      ny = 0.26 * x + 0.24 * y + 0.44
    }
    x = nx; y = ny
    if (i > 30) pts.push([x, y])
  }

  // Bounding box
  let mnX = Infinity, mxX = -Infinity, mnY = Infinity, mxY = -Infinity
  for (const [px, py] of pts) {
    if (px < mnX) mnX = px; if (px > mxX) mxX = px
    if (py < mnY) mnY = py; if (py > mxY) mxY = py
  }
  const w = 180, h = 220, pad = 10
  const sx = (w - pad * 2) / (mxX - mnX)
  const sy = (h - pad * 2) / (mxY - mnY)
  const scale = Math.min(sx, sy)

  // Map points to SVG path of tiny dots
  const d = pts.map(([px, py]) => {
    const cx = pad + (px - mnX) * scale
    const cy = h - pad - (py - mnY) * scale
    return `M${cx.toFixed(1)},${cy.toFixed(1)}l0.5,0`
  }).join('')

  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="max-w-full">
      <rect width="${w}" height="${h}" rx="8" fill="#f4ede0" stroke="#d6bf93"/>
      <path d="${d}" stroke="#2d6a1e" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    </svg>`
}

/* ------------------------------------------------------------------ */
/* Graphics map                                                        */
/* ------------------------------------------------------------------ */
const GRAPHICS = {
  triangle: () => `
    <svg width="210" height="170" viewBox="0 0 210 170" class="max-w-full">
      <defs>
        <pattern id="stripe-tri" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3" height="6" fill="#e8dbc1"/>
        </pattern>
      </defs>
      <polygon points="105,22 188,146 22,146" fill="url(#stripe-tri)" stroke="#2a1f0e" stroke-width="2" stroke-linejoin="round"/>
      <path d="M 96 42 A 16 16 0 0 0 114 42" fill="none" stroke="#6d5128" stroke-width="1.6"/>
      <path d="M 38 146 A 16 16 0 0 0 46 133" fill="none" stroke="#6d5128" stroke-width="1.6"/>
      <path d="M 164 133 A 16 16 0 0 0 172 146" fill="none" stroke="#6d5128" stroke-width="1.6"/>
      <text x="105" y="58" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="700" fill="#4b3718">?</text>
      <text x="44" y="136" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="700" fill="#4b3718">?</text>
      <text x="166" y="136" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="700" fill="#4b3718">?</text>
    </svg>`,

  trapezoid: () => `
    <svg width="220" height="150" viewBox="0 0 220 150" class="max-w-full">
      <defs>
        <pattern id="stripe2" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3" height="6" fill="#e8dbc1"/>
        </pattern>
      </defs>
      <polygon points="58,24 162,24 198,122 22,122" fill="url(#stripe2)" stroke="#2a1f0e" stroke-width="2" stroke-linejoin="round"/>
      <line x1="58" y1="24" x2="162" y2="24" stroke="#a88444" stroke-width="3.5"/>
      <line x1="22" y1="122" x2="198" y2="122" stroke="#a88444" stroke-width="3.5"/>
      <text x="110" y="16" text-anchor="middle" font-family="Outfit" font-size="10" font-weight="500" fill="#6d5128">parallell</text>
      <text x="110" y="142" text-anchor="middle" font-family="Outfit" font-size="10" font-weight="500" fill="#6d5128">parallell</text>
    </svg>`,

  fern: () => generateFern(),

  factorial: () => `
    <svg width="210" height="140" viewBox="0 0 210 140" class="max-w-full">
      <rect width="210" height="140" rx="8" fill="#f4ede0" stroke="#d6bf93"/>
      <text x="105" y="55" text-anchor="middle" font-family="Outfit" font-size="38" font-weight="700" fill="#2a1f0e">81!</text>
      <text x="105" y="82" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="400" fill="#8b6a34">= 81 × 80 × 79 × … × 2 × 1</text>
      <text x="105" y="110" text-anchor="middle" font-family="Outfit" font-size="9" font-weight="300" fill="#a88444" font-style="italic">ett ofattbart stort tal</text>
    </svg>`
}

/**
 * Returnerar SVG-markup för en given grafik-typ.
 * @param {string} kind - Nyckeln i GRAPHICS-objektet
 * @returns {string} SVG HTML eller tom sträng
 */
export function renderGraphic(kind) {
  const fn = GRAPHICS[kind]
  return fn ? fn() : ''
}
