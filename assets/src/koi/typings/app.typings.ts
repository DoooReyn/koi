import { KoiLogLevel } from "./logcat.typings";

/** 运行模式 */
export enum KoiAppMode {
    /** 开发 */
    Dev,
    /** 测试 */
    Debug,
    /** 预发布 */
    Beta,
    /** 发布 */
    Release,
}

/** 启动参数 */
export interface KoiAppArgs {
    /** 应用名称 */
    appName: string;
    /** 运行模式 */
    mode: KoiAppMode;
    /** 版本号 */
    version: string;
    /** 资源服务器 */
    oss: string;
    /** 网关服务器 */
    gate: string;
    /** 短连接游戏服务器 */
    gameHttp: string;
    /** 长连接游戏服务器 */
    gameWss: string;
    /** fps */
    fps: number;
    /** 日志开关 */
    logLevel: KoiLogLevel;
    /** 短连接超时 */
    timeoutHttp: number;
    /** 长连接超时 */
    timeoutWss: number;
    /** 指定用户 */
    user: string;
    /** 启动参数 */
    [key: string]: any;
}