import { Simplify, Merge, Exact } from "type-fest"

// 定义基础类型
type TweenParamValue = number | Function;
type ScrollObserver = { linked: any };

export type TimerOptions = Simplify<{
    id?: number | string;
    duration?: TweenParamValue;
    delay?: TweenParamValue;
    loopDelay?: number;
    reversed?: boolean;
    alternate?: boolean;
    loop?: boolean | number;
    autoplay?: boolean | ScrollObserver;
    frameRate?: number;
    playbackRate?: number;
}>

export type Callback<T extends object> = (instance: T) => void

export type TickableCallbacks<T extends object> = Exact<{
    onBegin?: Callback<T>;
    onBeforeUpdate?: Callback<T>;
    onUpdate?: Callback<T>;
    onLoop?: Callback<T>;
    onPause?: Callback<T>;
    onComplete?: Callback<T>;
}, {}>;

export type Timer = Simplify<{
    id: number | string;
    duration: number;
    paused: boolean;
    began: boolean;
    completed: boolean;
    iterationDuration: number;
    iterationCount: number;
    currentTime: number;
    progress: number;
    iterationProgress: number;
    currentIteration: number;
    reversed: boolean;

    // 方法
    reset(): Timer;
    init(): Timer;
    resetTime(): Timer;
    pause(): Timer;
    resume(): Timer;
    restart(): Timer;
    seek(time: number, muteCallbacks?: boolean, internalRender?: boolean): Timer;
    play(): Timer;
    reverse(): Timer;
    cancel(): Timer;
    stretch(newDuration: number): Timer;
    revert(): Timer;
    complete(): Timer;
    then(callback?: (timer: Timer) => void): Promise<any>
}>

export type DefaultsParams = Simplify<{
    id?: number | string | null;
    keyframes?: any;
    playbackEase?: any;
    playbackRate?: number;
    frameRate?: number;
    loop?: number | boolean;
    reversed?: boolean;
    alternate?: boolean;
    autoplay?: boolean | ScrollObserver;
    duration?: number | any;
    delay?: number | any;
    loopDelay?: number;
    ease?: any;
    composition?: 'none' | 'replace' | 'blend' | number;
    modifier?: (v: any) => any;
    onBegin?: Callback<any>;
    onBeforeUpdate?: Callback<any>;
    onUpdate?: Callback<any>;
    onLoop?: Callback<any>;
    onPause?: Callback<any>;
    onComplete?: Callback<any>;
    onRender?: Callback<any>;
}>;

export type Timeline = Simplify<{
    labels: Record<string, number>;
    defaults: DefaultsParams;
    onRender: Callback<Timeline>;
}>

export type TimerParams = Simplify<Merge<TimerOptions, TickableCallbacks<Timer>>>