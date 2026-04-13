/**
 * Cheops — Rumsdata (Level Configuration)
 *
 * Varje rum har:
 *   id, title, subtitle, kind ('numeric' | 'puzzle'),
 *   count, maxErrors, timer? (sekunder),
 *   generate? (för numeric), puzzle? (för boss-rum)
 *
 * Detta är den enda filen du behöver redigera för att lägga till rum.
 */

import { rand } from './utils.js'

/** @type {import('./types').Level[]} */
export const LEVELS = [
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
  {
    id: 3,
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
  {
    id: 4,
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
  {
    id: 5,
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
  {
    id: 6,
    title: 'Multipliklarens torn',
    subtitle: 'Entalsmultiplikation',
    kind: 'numeric',
    count: 20,
    maxErrors: 4,
    generate: () => {
      const a = rand(2, 9), b = rand(2, 9)
      return { q: `${a} × ${b}`, a: a * b }
    }
  },
  {
    id: 7,
    title: 'Mörka galleriet',
    subtitle: 'Tvåsiffrig subtraktion · kan bli negativ',
    kind: 'numeric',
    count: 20,
    maxErrors: 4,
    generate: () => {
      const b = rand(10, 99)
      const aMin = Math.max(1, b - 9)
      const a = rand(aMin, 99)
      return { q: `${a} − ${b}`, a: a - b }
    }
  },
  {
    id: 8,
    title: 'De tre bärarna',
    subtitle: 'Addition av tre tal',
    kind: 'numeric',
    count: 20,
    maxErrors: 4,
    generate: () => {
      const a = rand(1, 25), b = rand(1, 25), c = rand(1, 25)
      return { q: `${a} + ${b} + ${c}`, a: a + b + c }
    }
  },
  {
    id: 9,
    title: 'Falkens flygning',
    subtitle: 'Blixt-subtraktion · 3 minuter',
    kind: 'numeric',
    count: 20,
    maxErrors: 4,
    timer: 180,
    generate: () => {
      const a = rand(25, 99)
      const b = rand(10, a - 1)
      return { q: `${a} − ${b}`, a: a - b }
    }
  },
  {
    id: 10,
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

/** Totalt antal rum i spelet */
export const TOTAL_ROOMS = LEVELS.length
