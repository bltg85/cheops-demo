/**
 * Cheops — DOM Rendering (createRoom, createIntro, createVictory)
 */

import { LEVELS } from './rooms.js'
import { renderGraphic } from './graphics.js'

/**
 * Skapar en rum-sektion i DOM.
 */
export function createRoom(level) {
  const s = document.createElement('section')
  s.className = 'room'
  s.dataset.level = level.id
  s.dataset.locked = 'true'
  const isText = level.kind === 'puzzle' && level.puzzle.answerType === 'text'
  const hasTimer = !!level.timer

  s.innerHTML = `
    <div class="chamber">
      <div class="flex items-start justify-between gap-6 mb-6 float-in" style="--i:0">
        <div class="min-w-0">
          <div class="text-[10px] uppercase tracking-[0.22em] text-sand-500 font-medium">Kammare ${String(level.id).padStart(2, '0')} av ${LEVELS.length}</div>
          <h2 class="mt-2 text-3xl md:text-5xl tracking-tighter font-semibold leading-[0.95]">${level.title}</h2>
          <p class="mt-1.5 text-sand-600 text-sm md:text-base">${level.subtitle}</p>
        </div>
        ${hasTimer ? `
          <div class="text-right shrink-0">
            <div class="text-[10px] uppercase tracking-[0.22em] text-sand-500 font-medium">Tid</div>
            <div class="timer-display mt-2 text-2xl md:text-3xl font-semibold tabular-nums">--:--</div>
            <div class="timer-bar mt-1.5 w-20 h-1 bg-sand-200 rounded-full overflow-hidden">
              <div class="timer-fill h-full bg-sand-700 origin-left" style="transform: scaleX(1)"></div>
            </div>
          </div>` : ''}
      </div>

      <div class="rules-row flex flex-wrap items-center gap-2 mb-3 float-in" style="--i:1">
        <div class="rule-pill text-xs font-medium text-sand-800 px-3 py-1.5 rounded-full bg-sand-100 border border-sand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          Max <span class="tabular-nums font-semibold">${level.maxErrors}</span> fel · annars ner ett rum
        </div>
        <div class="error-pill text-xs font-medium text-sand-800 px-3 py-1.5 rounded-full bg-white/70 border border-sand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          Fel hittills: <span class="error-count tabular-nums font-semibold">0</span> / ${level.maxErrors}
        </div>
      </div>

      <div class="progress-row flex flex-wrap gap-1.5 mb-8 float-in" style="--i:2">
        ${level.kind === 'puzzle'
      ? `<span class="text-[10px] uppercase tracking-[0.22em] text-sand-500 font-medium">Bossgåta · 1 fråga</span>`
      : Array.from({ length: level.count }, () => `<span class="dot w-2 h-2 rounded-full bg-sand-200"></span>`).join('')}
      </div>

      ${level.kind === 'puzzle' ? `
        <div class="puzzle-graphic mb-4 flex justify-center float-in" style="--i:3">${renderGraphic(level.puzzle.graphic)}</div>
        <p class="puzzle-prompt text-center text-sand-700 text-base md:text-lg mb-6 max-w-[48ch] mx-auto float-in" style="--i:4">${level.puzzle.q}</p>
      ` : ''}

      <div class="question-area border-t border-b border-sand-300 py-10 md:py-14 mb-6 float-in" style="--i:${level.kind === 'puzzle' ? 5 : 3}">
        <div class="question-text text-center text-5xl md:text-7xl tracking-tighter font-semibold tabular-nums">—</div>
      </div>

      <form class="answer-form flex flex-col sm:flex-row gap-3 items-stretch float-in" style="--i:${level.kind === 'puzzle' ? 6 : 4}">
        <input
          type="text"
          inputmode="${isText ? 'text' : 'numeric'}"
          pattern="${isText ? '' : '-?[0-9]*'}"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          class="answer-input flex-1 text-2xl md:text-3xl font-semibold tabular-nums bg-white/60 border-2 border-sand-300 rounded-xl px-5 py-4 outline-none focus:border-sand-900 focus:bg-white placeholder:text-sand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          placeholder="${isText ? 'Skriv figurens namn' : 'Ditt svar'}"
        >
        <button type="submit" class="btn px-7 py-4 rounded-xl bg-sand-900 text-sand-50 font-semibold hover:bg-sand-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          Svara
        </button>
      </form>

      <div class="feedback mt-3 text-sm font-medium min-h-[1.25rem]"></div>

      ${isText ? '' : `
        <div class="keypad mt-5 sm:hidden">
          <div class="grid grid-cols-3 gap-2">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button type="button" data-key="${n}" class="key py-5 rounded-xl bg-white/70 border border-sand-300 text-2xl font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">${n}</button>`).join('')}
            <button type="button" data-key="sign" class="key py-5 rounded-xl bg-sand-100 border border-sand-300 text-2xl font-semibold text-sand-800">±</button>
            <button type="button" data-key="0" class="key py-5 rounded-xl bg-white/70 border border-sand-300 text-2xl font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">0</button>
            <button type="button" data-key="clear" class="key py-5 rounded-xl bg-sand-100 border border-sand-300 text-xs font-medium text-sand-700 uppercase tracking-wider">Rensa</button>
          </div>
          <button type="button" data-key="submit" class="key w-full mt-2 py-5 rounded-xl bg-sand-900 text-sand-50 text-sm font-semibold uppercase tracking-wider">Svara</button>
        </div>`}
    </div>
  `
  return s
}

/**
 * Skapar vinstskärmen.
 */
export function createVictory() {
  const v = document.createElement('section')
  v.className = 'room'
  v.id = 'victory'
  v.innerHTML = `
    <div class="chamber text-center">
      <svg width="130" height="130" viewBox="0 0 130 130" class="mx-auto mb-6 breathe">
        <polygon points="65,14 117,108 13,108" fill="#c19f5f" stroke="#4b3718" stroke-width="1.5"/>
        <polygon points="65,14 117,108 65,108" fill="#8b6a34" stroke="#4b3718" stroke-width="1.5"/>
        <circle cx="65" cy="20" r="4" fill="#c19f5f" stroke="#4b3718" stroke-width="1"/>
      </svg>

      <div class="text-[10px] uppercase tracking-[0.22em] text-sand-500 font-medium">Toppen nådd</div>
      <h2 class="mt-3 text-5xl md:text-7xl tracking-tighter font-semibold leading-[0.9]">
        Grattis!<br><span class="italic font-light text-sand-600">du klarade Cheops.</span>
      </h2>

      <div class="mt-9 inline-flex items-baseline gap-3 px-6 py-4 rounded-2xl bg-white/70 border border-sand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div class="text-left">
          <div class="text-[10px] uppercase tracking-[0.22em] text-sand-500 font-medium">Din tid</div>
          <div class="elapsed-display mt-0.5 text-4xl md:text-5xl font-semibold tabular-nums leading-none">0:00</div>
        </div>
      </div>

      <p class="mt-8 text-sand-800 text-base md:text-lg max-w-[46ch] mx-auto">
        Du klarade Cheops pyramid — ${LEVELS.length} kammare av sten, siffror och geometri.
      </p>
      <p class="mt-3 text-sand-600 text-sm md:text-base max-w-[46ch] mx-auto">
        Från grundläggande addition hela vägen till trigonometri och fraktaler. Imponerande!
      </p>

      <button id="restart-btn" class="btn mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-sand-900 text-sand-50 font-medium hover:bg-sand-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        Spela demo igen
      </button>
    </div>
  `
  return v
}

/**
 * Skapar intro-skärmen.
 */
export function createIntro() {
  const s = document.createElement('section')
  s.className = 'room'
  s.id = 'intro'
  s.innerHTML = `
    <div class="chamber text-center">
      <div class="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-sand-600 mb-8">
        <span class="w-10 h-px bg-sand-400"></span>
        Demo · ${LEVELS.length} kammare
        <span class="w-10 h-px bg-sand-400"></span>
      </div>
      <h1 class="text-5xl md:text-7xl tracking-tighter leading-[0.9] font-semibold">
        Cheops<br><span class="italic font-light text-sand-600">pyramidens gåtor</span>
      </h1>
      <p class="mt-7 text-base md:text-lg text-sand-700 leading-relaxed max-w-[48ch] mx-auto">
        ${LEVELS.length} kammare. ${LEVELS.length} gåtor av sten och siffror. Lös dem — och du klättrar uppåt i pyramiden. En modern tolkning av det gamla 90-talsspelet.
      </p>
      <p class="mt-3 text-sm text-sand-600 max-w-[44ch] mx-auto">
        Skriv svaret med tangentbordet eller tryck på knapparna. Enter svarar.
      </p>
      <button id="start-btn" class="btn mt-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-sand-900 text-sand-50 font-medium text-base hover:bg-sand-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        Börja klättringen
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
      <div class="mt-14 text-[10px] uppercase tracking-[0.25em] text-sand-500">
        Rekommenderad ålder · 4–10 år
      </div>
    </div>
  `
  return s
}
