/**
 * Cheops — Rumsdata (Level Configuration)
 *
 * 42 kammare från grundläggande aritmetik till trigonometri och fraktaler.
 * Varje rum har:
 *   id, title, subtitle, kind ('numeric' | 'puzzle'),
 *   count, maxErrors, timer? (sekunder),
 *   generate? (för numeric), puzzle? (för boss-rum)
 *
 * Detta är den enda filen du behöver redigera för att lägga till rum.
 */

import { rand } from './utils.js'

/* ------------------------------------------------------------------ */
/* Hjälpdata                                                           */
/* ------------------------------------------------------------------ */

const PYTH_TRIPLES = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15]]

const TRIG_TABLE = [
  { q: 'sin(0°)',   a: 0  },
  { q: 'sin(90°)',  a: 1  },
  { q: 'sin(180°)', a: 0  },
  { q: 'cos(0°)',   a: 1  },
  { q: 'cos(90°)',  a: 0  },
  { q: 'cos(180°)', a: -1 },
  { q: 'tan(0°)',   a: 0  },
  { q: 'tan(45°)',  a: 1  },
  { q: 'tan(180°)', a: 0  },
]

/* ------------------------------------------------------------------ */
/* Rum 1–42                                                            */
/* ------------------------------------------------------------------ */

/** @type {import('./types').Level[]} */
export const LEVELS = [

  /* ============================================================== */
  /*  ARITMETIK — ADDITION                                          */
  /* ============================================================== */

  // 1 — Addition lvl 1: ental
  {
    id: 1,
    title: 'Sandens kammare',
    subtitle: 'Enkla plustal · ental',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(1, 9), b = rand(1, 9)
      return { q: `${a} + ${b}`, a: a + b }
    }
  },

  /* ============================================================== */
  /*  ARITMETIK — SUBTRAKTION                                       */
  /* ============================================================== */

  // 2 — Subtraktion lvl 1: ental
  {
    id: 2,
    title: 'Skuggornas gång',
    subtitle: 'Enkla minustal · ental',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(2, 9), b = rand(1, a)
      return { q: `${a} − ${b}`, a: a - b }
    }
  },

  /* ============================================================== */
  /*  EKVATIONER — ADDITION                                         */
  /* ============================================================== */

  // 3 — Ekvation addition: x + a = b
  {
    id: 3,
    title: 'Sfinxens likning',
    subtitle: 'Ekvation · addition',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const x = rand(1, 9), a = rand(1, 9)
      return { q: `x + ${a} = ${x + a}`, a: x }
    }
  },

  /* ============================================================== */
  /*  ARITMETIK — ADDITION LVL 2                                    */
  /* ============================================================== */

  // 4 — Addition lvl 2: tvåsiffrig
  {
    id: 4,
    title: 'Stenhuggarens sal',
    subtitle: 'Tvåsiffrig addition',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      let a, b
      do { a = rand(10, 79); b = rand(10, 79) } while (a + b > 99)
      return { q: `${a} + ${b}`, a: a + b }
    }
  },

  /* ============================================================== */
  /*  EKVATIONER — SUBTRAKTION                                      */
  /* ============================================================== */

  // 5 — Ekvation subtraktion: x − a = b
  {
    id: 5,
    title: 'Skarabéens likning',
    subtitle: 'Ekvation · subtraktion',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const x = rand(3, 15), a = rand(1, x - 1)
      return { q: `x − ${a} = ${x - a}`, a: x }
    }
  },

  /* ============================================================== */
  /*  ARITMETIK — SUBTRAKTION LVL 2                                 */
  /* ============================================================== */

  // 6 — Subtraktion lvl 2: tvåsiffrig
  {
    id: 6,
    title: 'Ökenvinden',
    subtitle: 'Tvåsiffrig subtraktion',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(20, 99), b = rand(10, a - 1)
      return { q: `${a} − ${b}`, a: a - b }
    }
  },

  /* ============================================================== */
  /*  ARITMETIK — MULTIPLIKATION LVL 1                              */
  /* ============================================================== */

  // 7 — Multiplikation lvl 1: ental
  {
    id: 7,
    title: 'Multipliklarens torn',
    subtitle: 'Entalsmultiplikation',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(2, 9), b = rand(2, 9)
      return { q: `${a} × ${b}`, a: a * b }
    }
  },

  /* ============================================================== */
  /*  EKVATIONER — MULTIPLIKATION                                   */
  /* ============================================================== */

  // 8 — Ekvation multiplikation: a × x = b
  {
    id: 8,
    title: 'Handelskammaren',
    subtitle: 'Ekvation · multiplikation',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const x = rand(2, 9), a = rand(2, 9)
      return { q: `${a} × x = ${a * x}`, a: x }
    }
  },

  /* ============================================================== */
  /*  ARITMETIK — DIVISION LVL 1                                    */
  /* ============================================================== */

  // 9 — Division lvl 1: ental
  {
    id: 9,
    title: 'Delningens grotta',
    subtitle: 'Entals-division',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const b = rand(2, 9), r = rand(2, 9)
      return { q: `${b * r} ÷ ${b}`, a: r }
    }
  },

  /* ============================================================== */
  /*  EKVATIONER — DIVISION                                         */
  /* ============================================================== */

  // 10 — Ekvation division: a ÷ x = b
  {
    id: 10,
    title: 'Kvotens kammare',
    subtitle: 'Ekvation · division',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const x = rand(2, 9), b = rand(2, 9)
      return { q: `${x * b} ÷ x = ${b}`, a: x }
    }
  },

  /* ============================================================== */
  /*  BLIXT-RUNDOR                                                  */
  /* ============================================================== */

  // 11 — Addition blixt
  {
    id: 11,
    title: 'Solens kapell',
    subtitle: 'Blixt-addition · 2 minuter',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    timer: 120,
    generate: () => {
      const a = rand(1, 9), b = rand(1, 9)
      return { q: `${a} + ${b}`, a: a + b }
    }
  },

  // 12 — Subtraktion blixt
  {
    id: 12,
    title: 'Falkens flygning',
    subtitle: 'Blixt-subtraktion · 3 minuter',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    timer: 180,
    generate: () => {
      const a = rand(25, 99), b = rand(10, a - 1)
      return { q: `${a} − ${b}`, a: a - b }
    }
  },

  /* ============================================================== */
  /*  ARITMETIK — MULTIPLIKATION / DIVISION LVL 2                   */
  /* ============================================================== */

  // 13 — Multiplikation lvl 2: tvåsiffrig × ental
  {
    id: 13,
    title: 'Dubbelstenen',
    subtitle: 'Tvåsiffrig multiplikation',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(11, 19), b = rand(2, 9)
      return { q: `${a} × ${b}`, a: a * b }
    }
  },

  // 14 — Division lvl 2: tvåsiffrig
  {
    id: 14,
    title: 'Papyrusrullen',
    subtitle: 'Tvåsiffrig division',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const b = rand(2, 9), r = rand(11, 19)
      return { q: `${b * r} ÷ ${b}`, a: r }
    }
  },

  /* ============================================================== */
  /*  BLIXT — MULTIPLIKATION / DIVISION                             */
  /* ============================================================== */

  // 15 — Multiplikation blixt
  {
    id: 15,
    title: 'Åsktornet',
    subtitle: 'Blixt-multiplikation · 2 minuter',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    timer: 120,
    generate: () => {
      const a = rand(2, 9), b = rand(2, 9)
      return { q: `${a} × ${b}`, a: a * b }
    }
  },

  // 16 — Division blixt
  {
    id: 16,
    title: 'Tidsdelaren',
    subtitle: 'Blixt-division · 2 minuter',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    timer: 120,
    generate: () => {
      const b = rand(2, 9), r = rand(2, 9)
      return { q: `${b * r} ÷ ${b}`, a: r }
    }
  },

  /* ============================================================== */
  /*  TRE TERMER                                                    */
  /* ============================================================== */

  // 17 — Addition tre termer
  {
    id: 17,
    title: 'De tre bärarna',
    subtitle: 'Addition · tre termer',
    kind: 'numeric',
    count: 15,
    maxErrors: 3,
    generate: () => {
      const a = rand(1, 25), b = rand(1, 25), c = rand(1, 25)
      return { q: `${a} + ${b} + ${c}`, a: a + b + c }
    }
  },

  // 18 — Subtraktion tre termer
  {
    id: 18,
    title: 'Tre skuggor',
    subtitle: 'Subtraktion · tre termer',
    kind: 'numeric',
    count: 15,
    maxErrors: 3,
    generate: () => {
      const a = rand(30, 99), b = rand(1, 14), c = rand(1, 14)
      return { q: `${a} − ${b} − ${c}`, a: a - b - c }
    }
  },

  // 19 — Multiplikation tre faktorer
  {
    id: 19,
    title: 'Tre faktorer',
    subtitle: 'Multiplikation · tre faktorer',
    kind: 'numeric',
    count: 15,
    maxErrors: 3,
    generate: () => {
      const a = rand(2, 5), b = rand(2, 5), c = rand(2, 5)
      return { q: `${a} × ${b} × ${c}`, a: a * b * c }
    }
  },

  // 20 — Division tre steg
  {
    id: 20,
    title: 'Tre kvoter',
    subtitle: 'Division · tre steg',
    kind: 'numeric',
    count: 15,
    maxErrors: 3,
    generate: () => {
      const r = rand(2, 8), c = rand(2, 4), b = rand(2, 4)
      return { q: `${r * b * c} ÷ ${b} ÷ ${c}`, a: r }
    }
  },

  /* ============================================================== */
  /*  POTENS & ROT                                                  */
  /* ============================================================== */

  // 21 — Upphöjt i två (x²)
  {
    id: 21,
    title: 'Kvadratens kraft',
    subtitle: 'Upphöjt i två · x²',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(2, 12)
      return { q: `${a}²`, a: a * a }
    }
  },

  // 22 — Kvadratrot (√x)
  {
    id: 22,
    title: 'Rotens grotta',
    subtitle: 'Kvadratrot · √x',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(2, 12)
      return { q: `√${a * a}`, a: a }
    }
  },

  // 23 — Upphöjt i tre (x³)
  {
    id: 23,
    title: 'Kubens kammare',
    subtitle: 'Upphöjt i tre · x³',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(2, 6)
      return { q: `${a}³`, a: a * a * a }
    }
  },

  /* ============================================================== */
  /*  BOSS — TRIANGELNS GÅTA                                       */
  /* ============================================================== */

  // 24 — Boss: Triangelns gåta
  {
    id: 24,
    title: 'Triangelns gåta',
    subtitle: 'Kammarens gåta · geometri',
    kind: 'puzzle',
    count: 1,
    maxErrors: 1,
    puzzle: {
      q: 'Hur många grader är det totalt i en triangel?',
      a: [180],
      graphic: 'triangle',
      hint: 'Alla tre vinklar inuti — tillsammans.'
    }
  },

  /* ============================================================== */
  /*  GEOMETRI — TRIANGLAR                                          */
  /* ============================================================== */

  // 25 — Triangel: vinkelsumma
  {
    id: 25,
    title: 'Vinkelsummans sal',
    subtitle: 'Hitta den saknade vinkeln · 180°',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(25, 80)
      const b = rand(25, Math.min(80, 155 - a))
      const c = 180 - a - b
      const angles = [a, b, c]
      const hide = rand(0, 2)
      const shown = angles.filter((_, i) => i !== hide)
      return { q: `${shown[0]}° + ${shown[1]}° + ?°`, a: angles[hide] }
    }
  },

  // 26 — Triangel: omkrets
  {
    id: 26,
    title: 'Triangelns rand',
    subtitle: 'Triangelns omkrets · tre sidor',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(3, 12), b = rand(3, 12)
      const cMin = Math.max(3, Math.abs(a - b) + 1)
      const cMax = Math.min(12, a + b - 1)
      const c = rand(cMin, cMax)
      return { q: `${a} + ${b} + ${c}`, a: a + b + c }
    }
  },

  // 27 — Triangel: area (bas × höjd ÷ 2)
  {
    id: 27,
    title: 'Triangelns yta',
    subtitle: 'Area = (bas × höjd) ÷ 2',
    kind: 'numeric',
    graphic: 'triangleArea',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const base = rand(1, 7) * 2   // alltid jämn → heltals-area
      const height = rand(2, 10)
      return { q: `(${base} × ${height}) ÷ 2`, a: (base * height) / 2 }
    }
  },

  // 28 — Pythagoras sats
  {
    id: 28,
    title: 'Pythagoras kammare',
    subtitle: 'Pythagoras sats · hitta hypotenusan',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const [a, b, c] = PYTH_TRIPLES[rand(0, PYTH_TRIPLES.length - 1)]
      return { q: `√(${a}² + ${b}²)`, a: c }
    }
  },

  /* ============================================================== */
  /*  GEOMETRI — REKTANGLAR                                         */
  /* ============================================================== */

  // 29 — Rektangel: omkrets
  {
    id: 29,
    title: 'Rektangelns mur',
    subtitle: 'Omkrets = 2 × (a + b)',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(2, 15), b = rand(2, 15)
      return { q: `2 × (${a} + ${b})`, a: 2 * (a + b) }
    }
  },

  // 30 — Rektangel: area
  {
    id: 30,
    title: 'Rektangelns golv',
    subtitle: 'Area = a × b',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const a = rand(2, 15), b = rand(2, 15)
      return { q: `${a} × ${b}`, a: a * b }
    }
  },

  // 31 — Rektangel: diagonal
  {
    id: 31,
    title: 'Diagonalens hemlighet',
    subtitle: 'Diagonal · Pythagoras sats',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const [a, b, c] = PYTH_TRIPLES[rand(0, PYTH_TRIPLES.length - 1)]
      return { q: `√(${a}² + ${b}²)`, a: c }
    }
  },

  /* ============================================================== */
  /*  PROCENT                                                       */
  /* ============================================================== */

  // 32 — Procent lvl 1: 50 %, 100 %, 200 %
  {
    id: 32,
    title: 'Solprocentaren',
    subtitle: 'Procent · 50 %, 100 %, 200 %',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const percents = [50, 100, 200]
      const p = percents[rand(0, 2)]
      const base = rand(2, 20) * 2
      return { q: `${p} % av ${base}`, a: base * p / 100 }
    }
  },

  // 33 — Procent lvl 2: 10 %, 25 %, 75 %
  {
    id: 33,
    title: 'Halvmånens andel',
    subtitle: 'Procent · 10 %, 25 %, 75 %',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const opts = [
        { p: 10,  base: rand(1, 20) * 10 },
        { p: 25,  base: rand(1, 10) * 4 },
        { p: 75,  base: rand(1, 10) * 4 },
      ]
      const { p, base } = opts[rand(0, 2)]
      return { q: `${p} % av ${base}`, a: base * p / 100 }
    }
  },

  // 34 — Procent lvl 3: 20 %, 30 %, 40 %, 60 %, 80 %
  {
    id: 34,
    title: 'Procentlabyrinten',
    subtitle: 'Procent · blandade',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const percents = [20, 30, 40, 60, 80]
      const p = percents[rand(0, 4)]
      const base = rand(1, 15) * 10
      return { q: `${p} % av ${base}`, a: base * p / 100 }
    }
  },

  // 35 — Procent lvl 4: över 100 %
  {
    id: 35,
    title: 'Procentmästaren',
    subtitle: 'Procent · över 100 %',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const percents = [125, 150, 175, 250]
      const p = percents[rand(0, 3)]
      const base = rand(2, 10) * 4
      return { q: `${p} % av ${base}`, a: base * p / 100 }
    }
  },

  /* ============================================================== */
  /*  3D-OBJEKT                                                     */
  /* ============================================================== */

  // 36 — Rätblock: volym
  {
    id: 36,
    title: 'Rätblockets kammare',
    subtitle: 'Volym = l × b × h',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const l = rand(2, 8), b = rand(2, 8), h = rand(2, 8)
      return { q: `${l} × ${b} × ${h}`, a: l * b * h }
    }
  },

  // 37 — Cylinder: volym (koefficient av π)
  {
    id: 37,
    title: 'Cylinderns torn',
    subtitle: 'Volym = r² × h × π · svara utan π',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const r = rand(2, 7), h = rand(2, 9)
      return { q: `${r}² × ${h}`, a: r * r * h }
    }
  },

  // 38 — Sfär: yta (koefficient av π)
  {
    id: 38,
    title: 'Sfärens tempel',
    subtitle: 'Yta = 4 × r² × π · svara utan π',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => {
      const r = rand(1, 8)
      return { q: `4 × ${r}²`, a: 4 * r * r }
    }
  },

  /* ============================================================== */
  /*  TRIGONOMETRI                                                  */
  /* ============================================================== */

  // 39 — sin, cos, tan av standardvinklar
  {
    id: 39,
    title: 'Vinkelmätaren',
    subtitle: 'Trigonometri · sin, cos, tan',
    kind: 'numeric',
    count: 10,
    maxErrors: 2,
    generate: () => TRIG_TABLE[rand(0, TRIG_TABLE.length - 1)]
  },

  /* ============================================================== */
  /*  SPECIAL — FRAKTAL                                             */
  /* ============================================================== */

  // 40 — Fraktal-pussel
  {
    id: 40,
    title: 'Ormbunksalen',
    subtitle: 'Naturens geometri',
    kind: 'puzzle',
    count: 1,
    maxErrors: 1,
    puzzle: {
      q: 'Denna ormbunke skapas genom att samma mönster upprepas i allt mindre skala. Vad kallas den typen av geometriskt objekt?',
      a: ['fraktal', 'fraktaler', 'fractal'],
      answerType: 'text',
      graphic: 'fern',
      hint: 'Tänk på självlikhet — delen liknar helheten.'
    }
  },

  /* ============================================================== */
  /*  SPECIAL — FAKULTET (81!)                                      */
  /* ============================================================== */

  // 41 — Kammare 41: fakultet-pussel
  {
    id: 41,
    title: 'Kammare fyrtioen',
    subtitle: 'Den stora produkten',
    kind: 'puzzle',
    count: 1,
    maxErrors: 1,
    puzzle: {
      q: 'Du har nått den legendariska kammare 41. Skriv det matematiska uttrycket för produkten av alla heltal från 41 ner till 1 — alltså 41 × 40 × 39 × … × 2 × 1.',
      a: ['41!'],
      answerType: 'text',
      graphic: 'factorial',
      hint: 'Det finns en notation med ett utropstecken …'
    }
  },

  /* ============================================================== */
  /*  BOSS — TOPPSTENEN                                             */
  /* ============================================================== */

  // 42 — Boss: Toppstenen
  {
    id: 42,
    title: 'Toppstenen',
    subtitle: 'Toppens gåta · geometri',
    kind: 'puzzle',
    count: 1,
    maxErrors: 1,
    puzzle: {
      q: 'Vad heter den här fyrhörningen?',
      a: ['parallelltrapets', 'paralleltrapets'],
      answerType: 'text',
      graphic: 'trapezoid',
      hint: 'Två sidor är parallella, men den är inte en rektangel.'
    }
  }
]

/* ------------------------------------------------------------------ */
/* Test mode — färre frågor per rum                                    */
/* ------------------------------------------------------------------ */

/**
 * Aktivera test-läge: minskar antal frågor per rum till max 3
 * (bossrum behåller 1 fråga). Anropas från main.js om `?test` i URL:en.
 */
export function initTestMode() {
  for (const l of LEVELS) {
    if (l.kind === 'puzzle') continue
    l.count = Math.min(l.count, 3)
    l.maxErrors = Math.min(l.maxErrors, 1)
    if (l.timer) l.timer = Math.min(l.timer, 60)
  }
}
