import { Simplify, Merge, Exact, SetOptional, ValueOf } from "type-fest"
import { Clock } from "./clock/type"
import { compositionTypes } from "./consts"

export type JSAnimation = any
export type Timeline = any
export type ScrollObserver = any
export type Renderable = JSAnimation | Timeline
export type PercentageKeyframes = any
export type DurationKeyframes = any
export type EasingParam = any
export type FunctionValue = any
export type Tickable = Timer

export type DefaultsParams = Simplify<{
    /**
     * 动画实例的标识符
     */
    id?: number | string;

    /**
     * 关键帧配置，可以是基于百分比或持续时间的关键帧
     */
    keyframes?: PercentageKeyframes | DurationKeyframes;

    /**
     * 播放缓动函数，控制整体动画的播放速率变化
     */
    playbackEase?: EasingParam;

    /**
     * 播放速率，值越大动画播放越快
     */
    playbackRate?: number;

    /**
     * 帧率设置，控制动画刷新频率
     */
    frameRate?: number;

    /**
     * 循环次数，true表示无限循环
     */
    loop?: number | boolean;

    /**
     * 是否反向播放动画
     */
    reversed?: boolean;

    /**
     * 是否在每次循环时交替正反方向
     */
    alternate?: boolean;

    /**
     * 是否自动播放，也可以绑定到滚动观察器
     */
    autoplay?: boolean | ScrollObserver;

    /**
     * 动画持续时间（毫秒），也可以是一个函数返回不同目标的时间
     */
    duration?: number | FunctionValue;

    /**
     * 动画延迟时间（毫秒），也可以是一个函数
     */
    delay?: number | FunctionValue;

    /**
     * 循环之间的延迟时间（毫秒）
     */
    loopDelay?: number;

    /**
     * 缓动函数，控制动画中各个属性的变化速率
     */
    ease?: EasingParam;

    /**
     * 动画合成模式，决定多个动画作用于同一属性时如何处理
     */
    composition?: 'none' | 'replace' | 'blend' | ValueOf<typeof compositionTypes>;

    /**
     * 值修饰器函数，可对动画值进行进一步处理
     */
    modifier?: (v: any) => any;

    /**
     * 动画开始时的回调函数
     */
    onBegin?: (tickable: Tickable) => void;

    /**
     * 每次更新前的回调函数
     */
    onBeforeUpdate?: (tickable: Tickable) => void;

    /**
     * 每次更新时的回调函数
     */
    onUpdate?: (tickable: Tickable) => void;

    /**
     * 每次循环完成时的回调函数
     */
    onLoop?: (tickable: Tickable) => void;

    /**
     * 动画暂停时的回调函数
     */
    onPause?: (tickable: Tickable) => void;

    /**
     * 动画完成时的回调函数
     */
    onComplete?: (tickable: Tickable) => void;

    /**
     * 每次渲染时的回调函数
     */
    onRender?: (renderable: Renderable) => void;
}>;

export interface Timer extends Clock {
    // 实例属性
    /** 计时器的唯一标识符 */
    id: number | string;
    /** 父时间线（如果有的话） */
    parent: Timeline | null;
    /** 计时器的总持续时间 */
    duration: number;
    /** 表示计时器是否向后运行 */
    backwards: boolean;
    /** 表示计时器是否暂停 */
    paused: boolean;
    /** 表示计时器是否已经开始 */
    began: boolean;
    /** 表示计时器是否已经完成 */
    completed: boolean;
    /** 计时器开始时的回调函数 */
    onBegin: (timer: Timer) => void;
    /** 计时器更新前的回调函数 */
    onBeforeUpdate: (timer: Timer) => void;
    /** 计时器每次更新时的回调函数 */
    onUpdate: (timer: Timer) => void;
    /** 计时器每次循环完成时的回调函数 */
    onLoop: (timer: Timer) => void;
    /** 计时器暂停时的回调函数 */
    onPause: (timer: Timer) => void;
    /** 计时器完成时的回调函数 */
    onComplete: (timer: Timer) => void;
    /** 一次循环的持续时间 */
    iterationDuration: number;
    /** 循环次数 */
    iterationCount: number;

    // 私有属性
    /** 自动播放设置，可以是布尔值或滚动观察者对象 */
    _autoplay: boolean | ScrollObserver;
    /** 计时器的偏移位置 */
    _offset: number;
    /** 计时器的延迟时间 */
    _delay: number;
    /** 循环之间的延迟时间 */
    _loopDelay: number;
    /** 当前迭代的时间 */
    _iterationTime: number;
    /** 当前迭代索引 */
    _currentIteration: number;
    /** 用于 .then() 方法的解析函数 */
    _resolve: Function;
    /** 表示计时器是否正在运行 */
    _running: boolean;
    /** 表示计时器是否已反转（以数字形式存储，0或1） */
    _reversed: number;
    /** 反转状态的备份 */
    _reverse: number;
    /** 表示计时器是否已取消（以数字形式存储，0或1） */
    _cancelled: number;
    /** 表示计时器是否在正反方向上交替 */
    _alternate: boolean;
    /** 渲染链表中的前一个可渲染对象 */
    _prev: Renderable | null;
    /** 渲染链表中的下一个可渲染对象 */
    _next: Renderable | null;
    /** 表示计时器是否有子元素 */
    _hasChildren: boolean;

    // 获取器/设置器
    /** 获取或设置计时器是否已取消 */
    cancelled: boolean;
    /** 获取或设置当前时间位置 */
    currentTime: number;
    /** 获取或设置当前迭代的时间位置 */
    iterationCurrentTime: number;
    /** 获取或设置完成进度（0-1之间） */
    progress: number;
    /** 获取或设置当前迭代的进度（0-1之间） */
    iterationProgress: number;
    /** 获取或设置当前迭代索引 */
    currentIteration: number;
    /** 获取或设置计时器是否反向播放 */
    reversed: boolean;
    /** 获取或设置播放速度 */
    speed: number;

    // 方法
    /** 重置计时器状态 */
    reset(internalRender?: number): this;
    /** 初始化计时器 */
    init(internalRender?: number): this;
    /** 重置计时器的时间 */
    resetTime(): this;
    /** 暂停计时器 */
    pause(): this;
    /** 恢复计时器 */
    resume(): this;
    /** 重新启动计时器 */
    restart(): this;
    /** 将计时器定位到指定时间 */
    seek(time: number, muteCallbacks?: boolean | number, internalRender?: boolean | number): this;
    /** 交替计时器的方向 */
    alternate(): this;
    /** 正向播放计时器 */
    play(): this;
    /** 反向播放计时器 */
    reverse(): this;
    /** 取消计时器 */
    cancel(): this;
    /** 调整计时器的持续时间 */
    stretch(newDuration: number): this;
    /** 取消计时器并回到初始状态 */
    revert(): this;
    /** 立即完成计时器并触发完成回调 */
    complete(): this;
    /** 返回一个在计时器完成时解析的Promise */
    then(callback?: (timer: Timer) => void): Promise<any>;
}

// 类型定义注释
type TimerOptions = {
    /** 计时器的唯一标识符 */
    id: number | string;
    /** 计时器的持续时间，可以是数值或函数 */
    duration: number | Function;
    /** 计时器的延迟时间，可以是数值或函数 */
    delay: number | Function;
    /** 循环之间的延迟时间 */
    loopDelay: number;
    /** 是否反向播放 */
    reversed: boolean;
    /** 是否在正反方向上交替 */
    alternate: boolean;
    /** 循环设置，可以是布尔值或循环次数 */
    loop: boolean | number;
    /** 自动播放设置，可以是布尔值或滚动观察者对象 */
    autoplay: boolean | ScrollObserver;
    /** 帧率设置 */
    frameRate: number;
    /** 播放速度 */
    playbackRate: number;
};

/** 回调函数类型，接收自身实例和可选的指针事件 */
type Callback<T> = (self: T, e?: PointerEvent) => any;

/** 可计时对象的回调函数集合 */
type TickableCallbacks<T extends object> = {
    /** 开始时的回调 */
    onBegin: Callback<T>;
    /** 更新前的回调 */
    onBeforeUpdate: Callback<T>;
    /** 更新时的回调 */
    onUpdate: Callback<T>;
    /** 循环完成时的回调 */
    onLoop: Callback<T>;
    /** 暂停时的回调 */
    onPause: Callback<T>;
    /** 完成时的回调 */
    onComplete: Callback<T>;
};

/** 
 * 计时器参数类型，将TimerOptions和TickableCallbacks合并并设置为可选
 * Simplify用于简化合并后的类型
 * Merge合并TimerOptions和TickableCallbacks<Timer>类型
 */
export type TimerParams = Partial<Simplify<Merge<TimerOptions, TickableCallbacks<Timer>>>>;