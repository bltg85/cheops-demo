/**
 * Cheops — Spelmotor (state, enterRoom, handleSubmit, timer, transitions)
 */

import { norm } from './utils.js'
import { LEVELS } from './rooms.js'
import { updatePyramid } from './pyramid.js'

/* ------------------------------------------------------------------ */
/* Game state                                                          */
/* ------------------------------------------------------------------ */
export const state = {
  currentLevel: 0,
  currentQuestionIndex: 0,
  currentQuestions: [],
  maxErrors: 0,
  errors: 0,
  results: [],
  demoting: false,
  startTime: null,
  timerInterval: null,
  timerEndsAt: null,
  timerTotal: 0
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function generateQuestions(level) {
  if (level.kind === 'puzzle') return [level.puzzle]
  return Array.from({ length: level.count }, () => level.generate())
}

function renderCurrentQuestion(section, level) {
  const q = state.currentQuestions[state.currentQuestionIndex]
  const qText = section.querySelector('.question-text')
  qText.textContent = level.kind === 'puzzle' ? '?' : q.q
  qText.classList.remove('pop')
  void qText.offsetWidth
  qText.classList.add('pop')

  section.querySelectorAll('.dot').forEach((d, i) => {
    d.className = 'dot w-2 h-2 rounded-full'
    if (state.results[i] === 'correct') d.classList.add('bg-sand-800')
    else if (state.results[i] === 'wrong') d.classList.add('bg-red-600')
    else if (i === state.currentQuestionIndex) d.classList.add('bg-sand-500')
    else d.classList.add('bg-sand-200')
  })

  const errCount = section.querySelector('.error-count')
  if (errCount) errCount.textContent = state.errors

  const input = section.querySelector('.answer-input')
  input.value = ''
  section.querySelector('.feedback').textContent = ''
  section.querySelector('.feedback').className = 'feedback mt-3 text-sm font-medium min-h-[1.25rem]'
}

/* ------------------------------------------------------------------ */
/* Timer                                                               */
/* ------------------------------------------------------------------ */
function startTimer(section, seconds) {
  if (state.timerInterval) clearInterval(state.timerInterval)
  state.timerTotal = seconds
  state.timerEndsAt = Date.now() + seconds * 1000
  const display = section.querySelector('.timer-display')
  const fill = section.querySelector('.timer-fill')

  const tick = () => {
    const remain = Math.max(0, (state.timerEndsAt - Date.now()) / 1000)
    const whole = Math.ceil(remain)
    const m = Math.floor(whole / 60)
    const s = whole % 60
    display.textContent = `${m}:${String(s).padStart(2, '0')}`
    if (fill) fill.style.transform = `scaleX(${(remain / state.timerTotal).toFixed(3)})`
    if (whole <= 10) display.classList.add('text-red-800')
    else display.classList.remove('text-red-800')
    if (remain <= 0) {
      clearInterval(state.timerInterval)
      state.timerInterval = null
      timeoutFailure(section)
    }
  }
  tick()
  state.timerInterval = setInterval(tick, 200)
}

function timeoutFailure(section) {
  const feedback = section.querySelector('.feedback')
  feedback.textContent = state.currentLevel > 1
    ? 'Sanden rann ut — du åker ner ett rum.'
    : 'Sanden rann ut — rum 1 börjar om.'
  feedback.className = 'feedback mt-3 text-sm font-medium min-h-[1.25rem] text-red-800'
  demoteRoom()
}

/* ------------------------------------------------------------------ */
/* Room transition overlay                                             */
/* ------------------------------------------------------------------ */
function showRoomTransition(completedLevel, onDone) {
  const completed = completedLevel.id
  const nextLevel = LEVELS[completed]
  const rows = LEVELS.length
  let pyramidRows = ''

  for (let i = rows; i >= 1; i--) {
    const w = 14 + (i - 1) * 8
    let fill = '#f4ede0', stroke = '#d6bf93'
    if (i < completed + 1) { fill = '#8b6a34'; stroke = '#4b3718' }
    if (i === completed) { fill = '#c19f5f'; stroke = '#8b6a34' }
    pyramidRows += `<div style="width:${w}px;height:8px;margin:1.5px auto;border-radius:2px;background:${fill};border:1px solid ${stroke};${i === completed ? 'box-shadow:0 0 12px rgba(193,159,95,0.6);' : ''}"></div>`
  }

  const overlay = document.createElement('div')
  overlay.className = 'room-transition'
  overlay.innerHTML = `
    <div class="climb-pyramid" style="margin-bottom:2rem;">
      ${pyramidRows}
    </div>
    <div class="climb-divider" style="width:60px;height:1px;background:#8b6a34;margin-bottom:1.5rem;"></div>
    <div class="climb-text" style="font-family:Outfit,system-ui;font-size:clamp(1.5rem,5vw,2.5rem);font-weight:600;color:#2a1f0e;letter-spacing:-0.03em;text-align:center;">
      ${completedLevel.title}
      <span style="display:block;font-weight:300;font-style:italic;color:#8b6a34;font-size:0.6em;margin-top:0.2em;">klarat</span>
    </div>
    <div class="climb-sub" style="font-family:Outfit,system-ui;font-size:clamp(0.75rem,2.5vw,0.9rem);color:#a88444;letter-spacing:0.15em;text-transform:uppercase;margin-top:1.2rem;text-align:center;">
      Nästa: ${nextLevel ? nextLevel.title : 'Toppen'}
      <span style="display:inline-block;margin-left:0.3em;animation:breathe 1.5s ease-in-out infinite;">↑</span>
    </div>
  `
  document.body.appendChild(overlay)
  requestAnimationFrame(() => overlay.classList.add('active'))

  setTimeout(() => {
    overlay.remove()
    onDone()
  }, 2600)
}

/* ------------------------------------------------------------------ */
/* Core game flow                                                      */
/* ------------------------------------------------------------------ */
const game = () => document.getElementById('game')

function demoteRoom() {
  state.demoting = true
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null }
  const newLvl = Math.max(1, state.currentLevel - 1)
  setTimeout(() => { enterRoom(newLvl) }, 1500)
}

function completeRoom(level) {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null }
  state.currentLevel = level.id + 1
  updatePyramid(state.currentLevel)

  if (level.id >= LEVELS.length) {
    document.getElementById('room-label').textContent = 'Toppen nådd'
    showVictory()
  } else {
    showRoomTransition(level, () => enterRoom(level.id + 1))
  }
}

function showVictory() {
  const v = document.getElementById('victory')
  v.dataset.locked = 'false'
  const elapsedMs = state.startTime ? (Date.now() - state.startTime) : 0
  const totalSec = Math.max(0, Math.round(elapsedMs / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  const timeText = `${m}:${String(s).padStart(2, '0')}`
  const timeEl = v.querySelector('.elapsed-display')
  if (timeEl) timeEl.textContent = timeText
  v.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Gå in i ett rum (sätt state, lås upp, rendera fråga).
 */
export function enterRoom(id) {
  const level = LEVELS[id - 1]
  state.currentLevel = id
  state.currentQuestionIndex = 0
  state.currentQuestions = generateQuestions(level)
  state.maxErrors = level.maxErrors
  state.errors = 0
  state.results = new Array(level.count).fill(undefined)
  state.demoting = false

  const g = game()
  const section = g.querySelector(`[data-level="${id}"]`)

  g.querySelectorAll('.room[data-level]').forEach(r => {
    const lvl = parseInt(r.dataset.level, 10)
    r.dataset.locked = lvl > id ? 'true' : 'false'
    r.dataset.active = lvl === id ? 'true' : 'false'
  })
  document.getElementById('victory').dataset.locked = 'true'
  document.getElementById('victory').dataset.active = 'false'

  renderCurrentQuestion(section, level)
  updatePyramid(state.currentLevel)

  document.getElementById('room-label').textContent = `${String(id).padStart(2, '0')} · ${level.title}`

  if (level.timer) startTimer(section, level.timer)

  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const input = section.querySelector('.answer-input')
  if (input) {
    setTimeout(() => { try { input.focus({ preventScroll: true }) } catch (_) { input.focus() } }, 120)
    setTimeout(() => { try { input.focus({ preventScroll: true }) } catch (_) { input.focus() } }, 650)
    setTimeout(() => { try { input.focus({ preventScroll: true }) } catch (_) { input.focus() } }, 1000)
  }
}

/**
 * Hantera ett svar (anropas från event-handlers).
 */
export function handleSubmit(section, level, rawValue) {
  if (state.demoting) return
  const q = state.currentQuestions[state.currentQuestionIndex]
  const accepted = Array.isArray(q.a) ? q.a : [q.a]
  const isText = level.kind === 'puzzle' && level.puzzle.answerType === 'text'

  let userVal
  let correct = false
  if (isText) {
    userVal = norm(rawValue)
    if (!userVal) return
    correct = accepted.some(a => norm(a) === userVal)
  } else {
    userVal = parseInt(rawValue, 10)
    if (Number.isNaN(userVal)) return
    correct = accepted.some(a => Number(a) === userVal)
  }

  const feedback = section.querySelector('.feedback')
  const input = section.querySelector('.answer-input')
  const qText = section.querySelector('.question-text')

  if (correct) {
    state.results[state.currentQuestionIndex] = 'correct'
    feedback.textContent = 'Rätt!'
    feedback.className = 'feedback mt-3 text-sm font-medium min-h-[1.25rem] text-sand-800'
    qText.classList.remove('pop')
    void qText.offsetWidth
    qText.classList.add('pop')
    state.currentQuestionIndex++
    if (state.currentQuestionIndex >= state.currentQuestions.length) {
      setTimeout(() => completeRoom(level), 450)
    } else {
      setTimeout(() => renderCurrentQuestion(section, level), 350)
    }
  } else {
    state.errors++
    const errCount = section.querySelector('.error-count')
    if (errCount) {
      errCount.textContent = state.errors
      const pill = section.querySelector('.error-pill')
      if (pill) {
        pill.classList.remove('pop')
        void pill.offsetWidth
        pill.classList.add('pop')
        if (state.errors >= state.maxErrors) {
          pill.classList.remove('bg-white/70', 'border-sand-300', 'text-sand-800')
          pill.classList.add('bg-red-50', 'border-red-300', 'text-red-800')
        }
      }
    }
    input.classList.remove('shake')
    void input.offsetWidth
    input.classList.add('shake')

    if (state.errors > state.maxErrors) {
      const tooMany = state.currentLevel > 1
        ? 'För många fel — du åker ner ett rum.'
        : 'För många fel — rum 1 börjar om.'
      feedback.textContent = tooMany
      feedback.className = 'feedback mt-3 text-sm font-medium min-h-[1.25rem] text-red-800'
      demoteRoom()
      return
    }

    if (level.count === 1) {
      feedback.textContent = level.puzzle && level.puzzle.hint
        ? `Fel — försök igen. Ledtråd: ${level.puzzle.hint}`
        : 'Fel — försök igen.'
      feedback.className = 'feedback mt-3 text-sm font-medium min-h-[1.25rem] text-red-800'
      input.select()
    } else {
      state.results[state.currentQuestionIndex] = 'wrong'
      const correctVal = accepted[0]
      feedback.textContent = `Fel — rätt var ${correctVal}.`
      feedback.className = 'feedback mt-3 text-sm font-medium min-h-[1.25rem] text-red-800'
      setTimeout(() => {
        state.currentQuestionIndex++
        if (state.currentQuestionIndex >= state.currentQuestions.length) {
          completeRoom(level)
        } else {
          renderCurrentQuestion(section, level)
          try { input.focus({ preventScroll: true }) } catch (_) { input.focus() }
        }
      }, 1300)
    }
  }
}
