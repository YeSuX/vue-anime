import { computed, reactive, toRefs } from 'vue'
import { K, maxFps, minValue } from '../consts'
import { round } from '../utils'

export function useClock(initTime = 0) {
  const state = reactive({
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
    _scheduleTime: 0,
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
  })

  const fps = computed({
    get: () => state._fps,
    set: (frameRate) => {
      const previousFrameDuration = state._frameDuration
      const fr = +frameRate
      const fps = fr < minValue ? minValue : fr
      const frameDuration = round(K / fps, 0)
      state._fps = fps
      state._frameDuration = frameDuration
      state._scheduleTime += frameDuration - previousFrameDuration
    },
  })

  return {
    ...toRefs(state),
    fps,
  }
}
