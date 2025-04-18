// render函数是一个动画渲染引擎的核心组件，负责处理可计时对象(tickable)的渲染过程。
// 这个函数处理动画的时间计算、迭代逻辑、补间(tween)动画渲染以及各种生命周期事件。

import { ValueOf } from "type-fest";
import { minValue, tickModes } from "./consts";
import { Tickable } from "./types";
import { clamp } from "./utils";

// tickMode: 计时模式(AUTO或FORCE等)
export const render = ({ tickable, time, muteCallbacks, internalRender, tickMode }: RenderParams) => {
    // 初始化计算
    // 1. 提取tickable的属性
    const parent = tickable.parent;
    const duration = tickable.duration;
    const completed = tickable.completed;
    const iterationDuration = tickable.iterationDuration;
    const iterationCount = tickable.iterationCount;
    const _currentIteration = tickable._currentIteration;
    const _loopDelay = tickable._loopDelay;
    const _reversed = tickable._reversed;
    const _alternate = tickable._alternate;
    const _hasChildren = tickable._hasChildren;
    const tickableDelay = tickable._delay;
    const tickablePrevAbsoluteTime = tickable._absoluteCurrentTime;

    // 2. 计算时间相关值
    const tickableEndTime = tickableDelay + iterationDuration;
    const tickableAbsoluteTime = time - tickableDelay;
    const tickablePrevTime = clamp(tickablePrevAbsoluteTime, -tickableDelay, duration);
    const tickableCurrentTime = clamp(tickableAbsoluteTime, -tickableDelay, duration);
    const deltaTime = tickableAbsoluteTime - tickablePrevAbsoluteTime;
    const isCurrentTimeAboveZero = tickableCurrentTime > 0;
    const isCurrentTimeEqualOrAboveDuration = tickableCurrentTime >= duration;
    const isSetter = duration <= minValue;
    const forcedTick = tickMode === tickModes.FORCE;

    // 3. 确定当前状态
    let isOdd = 0
    let iterationElapsedTime = tickableAbsoluteTime
    // 不仅仅跟踪当前元素的渲染状态，还用于检查子元素是否已经渲染
    let hasRendered = 0
    // 迭代逻辑计算
    // 1. TODO:当iterationCount>1时计算当前迭代次数
    // 2. 使用位运算(~~)代替Math.floor提高性能
    // 3. 计算迭代内已经过时间
    if (iterationCount > 1) {
        console.log('iterationCount > 1');
    }
    // 方向与缓动计算
    // 1. 使用异或(^)运算符检查是否反向播放
    const isReversed = _reversed ^ (_alternate && isOdd ? 1 : 0)
    let iterationTime = isCurrentTimeEqualOrAboveDuration ? isReversed ? 0 : duration : isReversed ? iterationDuration - iterationElapsedTime : iterationElapsedTime;
    // 2. TODO:应用缓动函数(ease)调整时间曲线
    const isRunningBackwards = (parent ? parent.backwards : tickableAbsoluteTime < tickablePrevAbsoluteTime) ? !isReversed : !!isReversed;
    tickable._absoluteCurrentTime = tickableAbsoluteTime;
    tickable._iterationTime = iterationTime;
    tickable.backwards = isRunningBackwards;
    // 生命周期事件处理
    // 1. 触发onBegin、onLoop等回调
    if (isCurrentTimeAboveZero && !tickable.began) {
        console.log('----isCurrentTimeAboveZero----');
        
        tickable.began = true
        if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
            tickable.onBegin(tickable)
        }
    } else if (tickableAbsoluteTime <= 0) {
        console.log('----tickableAbsoluteTime <= 0----');
        tickable.began = false
    }
    // 补间动画渲染
    // 1. 遍历并计算每个tween的值
    // 2. 根据类型(数字、单位、颜色、复杂值)处理不同格式
    // 3. 应用到DOM元素或JavaScript对象
    // 变换处理
    // 1. 为CSS变换构建transform字符串
    // 2. 优化字符串构建减少内存使用
    // 完成处理
    // 1. 处理循环逻辑(有限或无限)
    // 2. 触发完成回调和状态更新

    // console.log('render');

}

type RenderParams = {
    tickable: Tickable;     // 需要渲染的可计时对象
    time: number;           // 当前时间点
    muteCallbacks: number;  // 控制是否禁用回调(0表示不禁用，1表示禁用)
    internalRender: number; // 是否为内部渲染(0表示否，1表示是)
    tickMode: ValueOf<typeof tickModes>;    // 计时模式(AUTO, FORCE等枚举值)
}

export const tick = ({ tickable, time, muteCallbacks, internalRender, tickMode }: RenderParams) => {
    console.log('tick');
    render({ tickable, time, muteCallbacks, internalRender, tickMode })
    // TODO: 处理孩子动画
}