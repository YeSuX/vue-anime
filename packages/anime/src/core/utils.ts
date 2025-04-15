// Math

export const _round = Math.round
const powCache: Record<number, number> = {}

export function round(v: number, decimalLength: number): number {
  if (decimalLength < 0) {
    return v
  }
  if (!decimalLength) {
    return _round(v)
  }
  let p = powCache[decimalLength]
  if (!p) {
    p = powCache[decimalLength] = 10 ** decimalLength
  }
  return _round(v * p) / p
}
