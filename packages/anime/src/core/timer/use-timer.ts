import { Callback, Timeline, TimerParams } from "../types"
import { useClock } from "../clock/use-clock"
import { clampInfinity, isFnc, isUnd } from "../utils"
import { globals } from "../global"
import { reactive } from "vue"
import { setValue } from "../value"
import { minValue, tickModes } from "../consts"
import { tick } from "../render"

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

    const resetTimerProperties = (timer: any) => {
        timer.paused = true;
        timer.began = false;
        timer.completed = false;
        return timer;
    }

    const timer = reactive({
        _delay: timerDelay,
        _fps: setValue(frameRate, timerDefaults.frameRate)!,
        _speed: setValue(playbackRate, timerDefaults.playbackRate)!,
        _iterationTime: 0,
        _autoplay: parent ? false : setValue(autoplay, timerDefaults.autoplay)!,
        fps: setValue(frameRate, timerDefaults.frameRate)!,
        iterationDuration: timerDuration,
        paused: true,
        began: false,
        completed: false,
        // total duration of the timer
        duration: clampInfinity(((timerDuration + timerLoopDelay!) * timerIterationCount) - timerLoopDelay!) || minValue,
        onUpdate: onUpdate || timerDefaults.onUpdate,
        get speed() {
            return clock.speed
        },
        set speed(playbackRate) {
            clock.speed = playbackRate
            this.resetTime()
        },
        // Functions
        init(internalRender = 0) {
            this.fps = this._fps
            this.speed = this._speed
            // TODO: 处理Timeline子项的初始渲染
            // 重置计时器状态
            // this.reset(internalRender)
            // TODO: 处理自动播放设置
            const autoplay = this._autoplay
            if (autoplay) {
                this.resume()
            }
            return this
        },
        resetTime() { },
        reset(internalRender: number) {
            // 步骤1: 恢复被取消的计时器
            // reviveTimer(this);

            // 步骤2: 处理方向控制
            // if (this._reversed && !this._reverse) this.reversed = false;

            // 步骤3: 设置迭代时间
            this._iterationTime = this.iterationDuration;

            // 步骤4: 强制渲染到起始位置
            tick(this, 0, 1, internalRender, tickModes.FORCE);

            // 步骤5: 重置计时器属性
            resetTimerProperties(this);

            // 步骤6: 重置子项属性
            // if (this._hasChildren) {
            //     forEachChildren(this, resetTimerProperties);
            // }
            return this
        },
        resume() {
            if (!this.paused) {
                return this;
            }
            this.paused = false;
            if (this.duration <= minValue) {
                tick(this, minValue, 0, 0, tickModes.FORCE)
            }
        }
    })

    return timer
}

export const useCreateTimer = (parameters: TimerParams) => useTimer(parameters, null, 0).init()