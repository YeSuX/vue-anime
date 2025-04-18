import { maxValue, minValue } from "./consts";

// Functions 
export const noop = () => {};

// Enums 
export const compositionTypes = {
    replace: 0,
    none: 1,
    blend: 2,
}

// Types checkers
export const isFnc = (a: unknown) => typeof a === 'function'
export const isUnd = (a: unknown) => typeof a === 'undefined'


// Math

export const clampInfinity = (v: number) => v === Infinity ? maxValue : v === -Infinity ? -minValue : v

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
