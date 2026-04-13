/**
 * Cheops — Pyramid SVG (sidopanel + mobilvy)
 */

import { TOTAL_ROOMS } from './rooms.js'

/**
 * Ritar pyramid-SVG:n med ett block per rum.
 */
export function drawPyramid(svg, w, h) {
  const svgNS = 'http://www.w3.org/2000/svg'
  svg.innerHTML = ''
  const apexY = 10, baseY = h - 12
  const cx = w / 2, halfBase = (w - 20) / 2
  const pyrHeight = baseY - apexY

  for (let i = 1; i <= TOTAL_ROOMS; i++) {
    const yb = baseY - (i - 1) * (pyrHeight / TOTAL_ROOMS)
    const yt = baseY - i * (pyrHeight / TOTAL_ROOMS)
    const bw = halfBase * (yb - apexY) / pyrHeight
    const tw = halfBase * (yt - apexY) / pyrHeight
    const pts = [
      [cx - bw, yb],
      [cx + bw, yb],
      [cx + tw, yt],
      [cx - tw, yt]
    ].map(p => p.map(n => n.toFixed(2)).join(',')).join(' ')

    const poly = document.createElementNS(svgNS, 'polygon')
    poly.setAttribute('points', pts)
    poly.setAttribute('data-level', i)
    poly.setAttribute('class', 'stone')
    poly.setAttribute('fill', '#f4ede0')
    poly.setAttribute('stroke', '#8b6a34')
    poly.setAttribute('stroke-width', '0.6')
    svg.appendChild(poly)
  }
}

/**
 * Uppdaterar pyramid-färger baserat på aktuell nivå.
 */
export function updatePyramid(currentLevel) {
  document.querySelectorAll('#pyramid polygon, #pyramid-mobile polygon').forEach(p => {
    const n = parseInt(p.dataset.level)
    p.classList.remove('breathe')

    if (n < currentLevel) {
      p.setAttribute('fill', '#8b6a34')
      p.setAttribute('stroke', '#4b3718')
    } else if (n === currentLevel) {
      p.setAttribute('fill', '#c19f5f')
      p.setAttribute('stroke', '#6d5128')
      p.classList.add('breathe')
    } else {
      p.setAttribute('fill', '#f4ede0')
      p.setAttribute('stroke', '#d6bf93')
    }
  })

  const completed = Math.max(0, Math.min(TOTAL_ROOMS, currentLevel - 1))
  const label = `${completed} / ${TOTAL_ROOMS}`
  document.getElementById('progress-label').textContent = label
  document.getElementById('progress-label-mobile').textContent = label
}
