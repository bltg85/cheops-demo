/** Random integer between min and max (inclusive) */
export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/** Normalize a string for answer comparison */
export const norm = s => s.toString().trim().toLowerCase().replace(/\s+/g, '')
