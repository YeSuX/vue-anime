import { TimerParams } from "../../types"
import { useClock } from "../clock/use-clock"

export const useTimer = (
    parameters: TimerParams = {},
    parent = null,
    parentPosition = 0,
) => {
    const clock = useClock(0)
    const {
        id,
        delay,
        duration,
        reversed,
        alternate,
        loop,
        loopDelay,
        autoplay,
        frameRate,
        playbackRate,
        onComplete,
        onLoop,
        onPause,
        onBegin,
        onBeforeUpdate,
        onUpdate,
    } = parameters

    const init = () => {

    }

    return {
        ...clock,
        init
    }
}

export const useCreateTimer = (parameters: TimerParams) => useTimer(parameters, null, 0).init()