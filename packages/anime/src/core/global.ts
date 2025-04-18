import { K, maxFps } from "./consts"
import { DefaultsParams } from "./types"
import { compositionTypes, noop } from "./utils"

export const defaults: DefaultsParams = {
    id: undefined,
    keyframes: null,
    playbackEase: null,
    playbackRate: 1,
    frameRate: maxFps,
    loop: 0,
    reversed: false,
    alternate: false,
    autoplay: true,
    duration: K,
    delay: 0,
    loopDelay: 0,
    ease: 'out(2)',
    composition: compositionTypes.replace,
    modifier: v => v,
    onBegin: noop,
    onBeforeUpdate: noop,
    onUpdate: noop,
    onLoop: noop,
    onPause: noop,
    onComplete: noop,
    onRender: noop,
}

export const globals = {
    defaults
}