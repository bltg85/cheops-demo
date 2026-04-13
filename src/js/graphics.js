/**
 * Cheops — Puzzle Graphics (SVG)
 *
 * Renderar SVG-grafik för bossrum.
 * Lägg till nya grafik-typer här när fler bossrum skapas.
 */

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
