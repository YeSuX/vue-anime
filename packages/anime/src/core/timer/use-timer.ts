import { Callback, Timeline, TimerParams } from "../types"
import { useClock } from "../clock/use-clock"
import { isFnc, isUnd } from "../utils"
import { globals } from "../global"
import { computed, reactive, Ref, ref } from "vue"
import { setValue } from "../value"
import { tickModes } from "../consts"

export interface Timer {
    _delay: number
    _fps: number
    _speed: number
    _iterationTime: number
    fps: number | undefined
    speed: number
    iterationDuration: number
    paused: boolean
    began: boolean
    completed: boolean
    onUpdate: any
    init(internalRender?: number): Timer
    resetTime(): void,
    reset(internalRender?: number): Timer
}

export const useTimer = (
    parameters: TimerParams = {},
    parent: Timeline | null = null,
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

    const resetTimerProperties = (timer: Timer) => {
        timer.paused = true;
        timer.began = false;
        timer.completed = false;
        return timer;
    }

    const timer = reactive<Timer>({
        _delay: timerDelay,
        _fps: setValue(frameRate, timerDefaults.frameRate)!,
        _speed: setValue(playbackRate, timerDefaults.playbackRate)!,
        _iterationTime: 0,
        fps: undefined,
        iterationDuration: timerDuration,
        paused: true,
        began: false,
        completed: false,
        onUpdate: onUpdate || timerDefaults.onUpdate,
        get speed() {
            return clock.speed.value
        },
        set speed(playbackRate) {
            clock.speed.value = playbackRate
            this.resetTime()
        },
        // Functions
        init(internalRender = 0) {
            this.fps = this._fps
            this.speed = this._speed
            // TODO: 处理Timeline子项的初始渲染
            // 重置计时器状态
            this.reset(internalRender)
            // TODO: 处理自动播放设置
            return this
        },
        resetTime() { },
        reset(internalRender) {
            // 步骤1: 恢复被取消的计时器
            // reviveTimer(this);

            // 步骤2: 处理方向控制
            // if (this._reversed && !this._reverse) this.reversed = false;

            // 步骤3: 设置迭代时间
            this._iterationTime = this.iterationDuration;

            // 步骤4: 强制渲染到起始位置
            // tick(this, 0, 1, internalRender, tickModes.FORCE);

            // 步骤5: 重置计时器属性
            resetTimerProperties(this);

            // 步骤6: 重置子项属性
            // if (this._hasChildren) {
            //     forEachChildren(this, resetTimerProperties);
            // }
            return this
        }
    })

    return timer
}

export const useCreateTimer = (parameters: TimerParams) => useTimer(parameters, null, 0).init()