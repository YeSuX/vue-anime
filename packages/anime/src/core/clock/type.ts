import { Merge, Simplify } from "type-fest";

export type ClockProperties = Simplify<{
    // 数值属性
    deltaTime: number;
    _currentTime: number;
    _elapsedTime: number;
    _startTime: number;
    _lastTime: number;
    _scheduleTime: number;
    _frameDuration: number;
    _fps: number;
    _speed: number;

    // 布尔属性
    _hasChildren: boolean;

    // 引用属性
    _head: any | null;
    _tail: any | null;
}>

// 定义方法
type ClockMethods = {
    requestTick(time: number): number;
    computeDeltaTime(time: number): number;
};

// 定义访问器
type ClockAccessors = {
    fps: number;
    speed: number;
};

// 合并所有类型定义
export type Clock = Simplify<Merge<ClockProperties, Merge<ClockMethods, ClockAccessors>>>;