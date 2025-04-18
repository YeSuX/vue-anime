import { tickModes } from './../consts';
import { Merge, Simplify, ValueOf } from "type-fest";

export type ClockProperties = Simplify<{
    // 数值属性
    deltaTime: number;  // 当前帧与上一帧之间的时间差
    _currentTime: number;  // 当前时间
    _elapsedTime: number;  // 从开始运行到现在经过的总时间
    _startTime: number;  // 开始时间
    _lastTime: number;  // 上一帧的时间
    _scheduledTime: number;  // 计划执行的时间
    _frameDuration: number;  // 每帧持续的时间（毫秒）
    _fps: number;  // 每秒帧数
    _speed: number;  // 播放速度倍率

    // 布尔属性
    _hasChildren: boolean;  // 是否有子对象

    // 引用属性
    _head: any | null;  // 可触发对象链表的头部
    _tail: any | null;  // 可触发对象链表的尾部
}>

// 定义方法
type ClockMethods = {
    requestTick(time: number): ValueOf<typeof tickModes>  // 请求一个时钟周期，根据时间判断是否需要执行帧更新
    computeDeltaTime(time: number): number;  // 计算与上一帧的时间差并更新deltaTime
};

// 定义访问器
type ClockAccessors = {
    fps: number;  // 帧率的getter和setter
    speed: number;  // 播放速度的getter和setter
};

// 合并所有类型定义
export type Clock = Simplify<Merge<ClockProperties, Merge<ClockMethods, ClockAccessors>>>;