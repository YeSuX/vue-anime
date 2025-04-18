import { Timeline, Timer, TimerParams } from "../types"
import { useClock } from "../clock/use-clock"
import { clampInfinity, isFnc, isUnd } from "../utils"
import { globals } from "../global"
import { reactive } from "vue"
import { setValue } from "../value"
import { minValue, tickModes } from "../consts"
import { tick } from "../render"

export const resetTimerProperties = (timer: Timer) => {
    timer.paused = true
    timer.began = false
    timer.completed = false

    return timer
}

export const useTimer = (
    parameters: TimerParams = {},
    parent: Timeline = null,
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

    const timerDefaults = parent ? parent.defaults : globals.defaults
    const timerDelay = (isFnc(delay) || isUnd(delay)) ? timerDefaults.delay : +delay
    const timerDuration = isFnc(duration) || isUnd(duration) ? Infinity : +duration;
    const timerLoopDelay = setValue(loopDelay, timerDefaults.loopDelay)
    const timerIterationCount = ((loop: boolean | number): number => {
        if (loop === true || loop === Infinity) {
            return Infinity;
        }

        if (typeof loop === 'number' && loop < 0) {
            return Infinity;
        }

        return (loop === false ? 0 : loop) + 1;
    })(loop!)

    const timer = reactive<Timer>({
        ...clock,
        id: "",
        parent: undefined,
        duration: 0,
        backwards: false,
        paused: false,
        began: false,
        completed: false,
        onBegin: function (timer: Timer): void {
            throw new Error("Function not implemented.")
        },
        onBeforeUpdate: function (timer: Timer): void {
            throw new Error("Function not implemented.")
        },
        onUpdate: function (timer: Timer): void {
            throw new Error("Function not implemented.")
        },
        onLoop: function (timer: Timer): void {
            throw new Error("Function not implemented.")
        },
        onPause: function (timer: Timer): void {
            throw new Error("Function not implemented.")
        },
        onComplete: function (timer: Timer): void {
            throw new Error("Function not implemented.")
        },
        iterationDuration: 0,
        iterationCount: 0,
        _autoplay: undefined,
        _offset: 0,
        _delay: 0,
        _loopDelay: 0,
        _iterationTime: 0,
        _currentIteration: 0,
        _resolve: (() => { }) as Function,
        _running: false,
        _reversed: 0,
        _reverse: 0,
        _cancelled: 0,
        _alternate: false,
        _prev: undefined,
        _next: undefined,
        cancelled: false,
        currentTime: 0,
        iterationCurrentTime: 0,
        progress: 0,
        iterationProgress: 0,
        currentIteration: 0,
        reversed: false,
        reset: function (internalRender: number): Timer {
            // TODO: 恢复计时器
            // TODO: 处理反转状态
            // TODO: 设置迭代时间
            // 强制渲染
            tick(this, 0, 1, internalRender, tickModes.FORCE)
            // 重置属性
            resetTimerProperties(this)
            if (this._hasChildren) {
                // TODO: 每个子动画重置属性
            }
            return this
        },
        init: function (internalRender = 0): Timer {
            this.fps = this._fps
            this.speed = this._speed
            // TODO: 子元素渲染处理
            // 重置计时器
            this.reset(internalRender)
            console.log('this', this);
            return this;
        },
        resetTime: function (): Timer {
            return this
        },
        pause: function (): Timer {
            throw new Error("Function not implemented.")
        },
        resume: function (): Timer {
            throw new Error("Function not implemented.")
        },
        restart: function (): Timer {
            throw new Error("Function not implemented.")
        },
        seek: function (time: number, muteCallbacks?: boolean | number, internalRender?: boolean | number): Timer {
            throw new Error("Function not implemented.")
        },
        alternate: function (): Timer {
            throw new Error("Function not implemented.")
        },
        play: function (): Timer {
            throw new Error("Function not implemented.")
        },
        reverse: function (): Timer {
            throw new Error("Function not implemented.")
        },
        cancel: function (): Timer {
            throw new Error("Function not implemented.")
        },
        stretch: function (newDuration: number): Timer {
            throw new Error("Function not implemented.")
        },
        revert: function (): Timer {
            throw new Error("Function not implemented.")
        },
        complete: function (): Timer {
            throw new Error("Function not implemented.")
        },
        then: function (callback?: (timer: Timer) => void): Promise<any> {
            throw new Error("Function not implemented.")
        },
        _fps: setValue(frameRate, timerDefaults.frameRate),
        _speed: setValue(playbackRate, timerDefaults.playbackRate),
        get speed() {
            return clock.speed
        },
        set speed(playbackRate: number) {
            clock.speed = playbackRate
            this.resetTime()
        }
    })

    return timer
}

export const useCreateTimer = (parameters: TimerParams) => useTimer(parameters, null, 0).init()