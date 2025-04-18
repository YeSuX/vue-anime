

// render函数是一个动画渲染引擎的核心组件，负责处理可计时对象(tickable)的渲染过程。
// 这个函数处理动画的时间计算、迭代逻辑、补间(tween)动画渲染以及各种生命周期事件。
// params:
// tickable: 被渲染的可计时对象(如动画或计时器)
// time: 当前时间点
// muteCallbacks: 是否禁用回调函数
// internalRender: 是否为内部渲染
// tickMode: 计时模式(AUTO或FORCE等)
export const render = (tickable: any, time: number, muteCallbacks: number, internalRender: number, tickMode: number) => {
    // 初始化计算
    // 1. 提取tickable的属性
    const parent = tickable.parent

    console.log('render');

}

export const tick = (tickable: any, time: number, muteCallbacks: number, internalRender: number, tickMode: number) => {
    console.log('tick');
    render(tickable, time, muteCallbacks, internalRender, tickMode)
}