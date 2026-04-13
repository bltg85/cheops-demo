/**
 * Cheops — Main (boot + event wiring)
 *
 * Importerar alla moduler och startar spelet.
 */

import '../css/style.css'
import { LEVELS, initTestMode } from './rooms.js'
import { drawPyramid, updatePyramid } from './pyramid.js'
import { createRoom, createIntro, createVictory } from './ui.js'
import { state, enterRoom, handleSubmit } from './engine.js'

/* ------------------------------------------------------------------ */
/* Test mode                                                           */
/* ------------------------------------------------------------------ */
const params = new URLSearchParams(location.search)
if (params.has('test')) initTestMode()

/* ------------------------------------------------------------------ */
/* Event wiring                                                        */
/* ------------------------------------------------------------------ */
const game = document.getElementById('game')

document.addEventListener('submit', (e) => {
  const form = e.target.closest('.answer-form')
  if (!form) return
  e.preventDefault()
  const section = form.closest('.room')
  if (!section || section.dataset.active !== 'true') return
  const level = LEVELS[parseInt(section.dataset.level, 10) - 1]
  const value = section.querySelector('.answer-input').value
  handleSubmit(section, level, value)
})

document.addEventListener('click', (e) => {
  const key = e.target.closest('.key')
  if (key) {
    const section = key.closest('.room')
    if (!section || section.dataset.active !== 'true') return
    const input = section.querySelector('.answer-input')
    const k = key.dataset.key
    if (k === 'clear') input.value = ''
    else if (k === 'sign') {
      const v = input.value || ''
      input.value = v.startsWith('-') ? v.substring(1) : '-' + v
    }
    else if (k === 'submit') section.querySelector('.answer-form').requestSubmit()
    else input.value = (input.value || '') + k
    return
  }

  if (e.target.closest('#start-btn')) {
    state.startTime = Date.now()
    enterRoom(1)
    return
  }
  if (e.target.closest('#restart-btn')) {
    state.currentLevel = 0
    state.startTime = null
    updatePyramid(0)
    game.querySelectorAll('.room[data-level]').forEach(r => {
      r.dataset.locked = 'true'
      r.dataset.active = 'false'
    })
    document.getElementById('victory').dataset.locked = 'true'
    document.getElementById('victory').dataset.active = 'false'
    document.getElementById('intro').scrollIntoView({ behavior: 'smooth', block: 'start' })
    roomJump.value = ''
    return
  }
})

// Hardware keyboard Enter anywhere on desktop submits the active room
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return
  const active = game.querySelector('.room[data-active="true"][data-level]')
  if (!active) return
  if (document.activeElement && document.activeElement.tagName === 'INPUT') return
  active.querySelector('.answer-form').requestSubmit()
})

/* ------------------------------------------------------------------ */
/* Room selector (diskret väljare)                                     */
/* ------------------------------------------------------------------ */
const roomJump = document.getElementById('room-jump')

LEVELS.forEach(l => {
  const opt = document.createElement('option')
  opt.value = l.id
  opt.textContent = `${String(l.id).padStart(2, '0')} · ${l.title}`
  roomJump.appendChild(opt)
})

roomJump.addEventListener('change', () => {
  const id = parseInt(roomJump.value, 10)
  if (!id) return
  if (!state.startTime) state.startTime = Date.now()
  enterRoom(id)
})

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
game.appendChild(createVictory())
document.getElementById('victory').dataset.locked = 'true'
for (let i = LEVELS.length - 1; i >= 0; i--) game.appendChild(createRoom(LEVELS[i]))
game.appendChild(createIntro())

drawPyramid(document.getElementById('pyramid'), 140, 200)
drawPyramid(document.getElementById('pyramid-mobile'), 140, 80)
updatePyramid(0)

// Land on intro (at the bottom of the page)
document.documentElement.style.scrollBehavior = 'auto'
window.scrollTo(0, document.body.scrollHeight)
requestAnimationFrame(() => {
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, 80)
})
