declare global {
  /** 构造类型 */
  type KoiCls<T> = new (...args: any[]) => T;
  
  /** 插件基类 */
  abstract class KoiPlugin {
    /** 名称 */
    public abstract readonly name: string;
    /** 版本 */
    public abstract readonly version: string;
    /** 描述 */
    public abstract readonly description: string;
    /** 作者 */
    public abstract readonly author: string;
    /** 插件挂载回调 */
    public abstract onAttach(): void;
    /** 插件卸载回调 */
    public abstract onDetach(): void;
  }

  /** Koi 框架 */
  class Koi {
    /** 名称 */
    public readonly name: string;
    /** 版本 */
    public readonly version: string;
    /** 描述 */
    public readonly description: string;
    /** 作者 */
    public readonly author: string;
    /** 全局环境 */
    public static Env: any;
    /**
     * 导入 Koi 框架到指定全局环境
     * @param env 目标环境(默认: globalThis)
     */
    public static Import(env?: object): void;
    /**
     * 注册插件
     * @param name 插件名称
     * @param autoImport 是否自动导入(默认: false)
     * @returns 插件构造
     */
    public static Reg(name: string, autoImport?: boolean): ClassDecorator;
    /** 获取单例 */
    public static get Shared(): Koi;
    /**
     * 使用插件
     * @param arg 插件构造/名称
     * @returns 插件实例
     */
    public use<P extends KoiPlugin>(arg: KoiCls<P> | string): P | null;
    /**
     * 卸载插件
     * @param arg 插件构造
     */
    public disuse(arg: KoiCls<KoiPlugin> | string): void;
  }

  /** Koi 框架实例 */
  const koi: Koi;
}

export {};
