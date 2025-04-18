import { beforeEach, describe, expect, it } from 'vitest'
import { useClock } from '../../../src/core/clock/use-clock'
import { minValue, tickModes } from '../../../src/core/consts'
import { round } from '../../../src/core/utils'

describe('useClock', () => {
  // 测试初始化状态
  describe('初始化', () => {
    it('应使用默认参数正确初始化', () => {
      const clock = useClock()

      expect(clock.deltaTime).toBe(0)
      expect(clock._absoluteCurrentTime).toBe(0)
      expect(clock._elapsedTime).toBe(0)
      expect(clock._startTime).toBe(0)
      expect(clock._lastTime).toBe(0)
      expect(clock._scheduledTime).toBe(0)
      expect(clock._hasChildren).toBe(false)
      expect(clock._head).toBeNull()
      expect(clock._tail).toBeNull()
    })

    it('应使用指定的初始时间初始化', () => {
      const initialTime = 1000
      const clock = useClock(initialTime)

      expect(clock._absoluteCurrentTime).toBe(initialTime)
      expect(clock._elapsedTime).toBe(initialTime)
      expect(clock._startTime).toBe(initialTime)
      expect(clock._lastTime).toBe(initialTime)
    })
  })

  // 测试fps计算属性
  describe('fps计算属性', () => {
    it('应正确获取和设置fps', () => {
      const clock = useClock()
      const newFps = 60

      // 测试getter
      expect(clock.fps).toBe(120) // 默认值

      // 测试setter
      clock.fps = newFps
      expect(clock.fps).toBe(newFps)
      expect(clock._frameDuration).toBe(round(1000 / newFps, 0))
    })

    it('应防止fps小于最小值', () => {
      const clock = useClock()

      clock.fps = 0.000000000000001
      expect(clock.fps).toBe(minValue) // 最小值
    })
  })

  // 测试speed计算属性
  describe('speed计算属性', () => {
    it('应正确获取和设置速度', () => {
      const clock = useClock()
      const newSpeed = 2

      // 测试getter
      expect(clock.speed).toBe(1) // 默认值

      // 测试setter
      clock.speed = newSpeed
      expect(clock.speed).toBe(newSpeed)
    })

    it('应防止速度小于最小值', () => {
      const clock = useClock()

      clock.speed = 0.000000000000001
      expect(clock.speed).toBe(minValue) // 最小值
    })
  })

  // 测试requestTick函数
  describe('requestTick函数', () => {
    let clock

    beforeEach(() => {
      clock = useClock(0)
      clock._scheduleTime = 10
    })

    it('当实际时间小于计划时间时应返回NONE', () => {
      const result = clock.requestTick(5)

      expect(result).toBe(tickModes.NONE)
      expect(clock._elapsedTime).toBe(5)
    })

    it('当实际时间大于计划时间时应返回AUTO并更新计划时间', () => {
      // 设置计划时间为10
      clock._scheduleTime = 10
      // 设置已过时间为20 (>10)
      clock._elapsedTime = 20

      const result = clock.requestTick(20)

      expect(result).toBe(tickModes.AUTO)
      expect(clock._scheduleTime).toBeGreaterThan(10)
    })
  })

  // 测试computeDeltaTime函数
  describe('computeDeltaTime函数', () => {
    it('应正确计算时间差', () => {
      const clock = useClock(100)
      const currentTime = 150

      const delta = clock.computeDeltaTime(currentTime)

      expect(delta).toBe(50) // 150 - 100
      expect(clock.deltaTime).toBe(50)
      expect(clock._lastTime).toBe(currentTime)
    })
  })
})
