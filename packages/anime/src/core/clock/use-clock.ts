import { computed, reactive, toRefs } from 'vue'
import { K, maxFps, minValue, tickModes } from '../consts'
import { round } from '../utils'
import { Clock } from './type'

export function useClock(initTime = 0) {
    const clock = reactive<Clock>({
        // 当前帧与上一帧之间的时间差，用于动画和物理计算中的时间步长
        deltaTime: 0,
        // 当前时间戳，记录当前播放位置或模拟时间
        _currentTime: initTime,
        // 从开始到现在已经过去的总时间，用于计算动画进度或总运行时间
        _elapsedTime: initTime,
        // 初始化或重置时的时间戳，用作时间计算的基准点
        _startTime: initTime,
        // 上一帧的时间戳，用于计算deltaTime
        _lastTime: initTime,
        // 当前帧的计划时间，用于帧率控制和时间调度
        _scheduledTime: 0,
        // 每一帧的固定时间间隔，用于计算deltaTime
        _frameDuration: round(K / maxFps, 0),
        // 每秒帧数，控制动画或模拟的更新频率
        _fps: maxFps,
        // 当前播放速度，用于控制动画速度，1.0表示正常速度，<1减速，>1加速
        _speed: 1,
        // 是否存在子元素，用于管理嵌套的时间系统
        _hasChildren: false,
        // 链表头节点，用于管理多个动画或计时器
        _head: null,
        // 链表尾节点，用于管理多个动画或计时器
        _tail: null,
        get fps() {
            return this._fps
        },
        set fps(frameRate) {
            const previousFrameDuration = this._frameDuration
            const fr = +frameRate
            const fps = fr < minValue ? minValue : fr
            const frameDuration = round(K / fps, 0)
            this._fps = fps
            this._frameDuration = frameDuration
            this._scheduledTime += frameDuration - previousFrameDuration
        },
        get speed() {
            return this._speed
        },
        set speed(playbackRate) {
            const pbr = +playbackRate
            this._speed = pbr < minValue ? minValue : pbr
        },
        requestTick(time: number) {
            // 主要实现了三个关键功能：
            // 帧速率稳定：保证动画按设定的FPS运行
            // 跳帧处理：当程序运行缓慢时，会跳过一些帧而不是积压
            // 时间同步：调整内部时钟，使动画速度与实际时间同步
            const scheduledTime = this._scheduledTime// 预计的下一帧时间
            this._elapsedTime = time // 更新经过的时间

            // 如果实际时间还没到预定时间，跳过这一帧
            if (this._elapsedTime < scheduledTime) {
                return tickModes.NONE
            }

            const frameDuration = this._frameDuration // 每帧应持续的时间
            const frameDelta = this._elapsedTime - scheduledTime// 实际过去的时间与预计时间的差值
            // 更新下一帧的预定时间
            // 确保至少前进一个帧的时长，如果实际过去的时间更多则跳得更远
            this._scheduledTime += frameDelta < frameDuration ? frameDuration : frameDelta
            return tickModes.AUTO// 表示应该进行帧更新
        },
        // 用于计算两帧之间的时间差
        computeDeltaTime(time: number) {
            const delta = time - this._lastTime
            this.deltaTime = delta
            this._lastTime = time
            return delta
        }
    })

    return clock
}
