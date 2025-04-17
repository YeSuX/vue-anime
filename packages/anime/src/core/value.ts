import { isUnd } from "./utils"

export const setValue = <T, D>(targetValue: T | undefined, defaultValue: D) => {
    return isUnd(targetValue) ? defaultValue : targetValue
}