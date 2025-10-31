import { KoiEnv } from "./koi-env";

@Koi.Reg("Global", true)
export class KoiGlobal extends KoiPlugin {
  readonly name: string = "Koi.Plugin.Global";
  readonly version: string = "0.0.1";
  readonly description: string = "全局环境插件";
  readonly author: string = "Koi Team | DoooReyn";
  onAttach(): void {
    console.log("Koi Global Plugin Attached");
  }
  onDetach(): void {
    console.log("Koi Global Plugin Detached");
  }

  /** 原始环境 */
  private raw: Record<string | symbol, any> =
    globalThis || window || self || frames || {};

  /** 用户环境 */
  private user: Record<string | symbol, any> = {};

  /** 全局环境列表 */
  private all = [this.raw, this.user];

  /**
   * 向全局环境中注入指定环境
   * @param env 环境对象
   */
  inject(env: Record<string | symbol, any>) {
    this.all.indexOf(env) !== -1 || this.all.push(env);
  }

  /**
   * 从全局环境中移除指定环境
   * @param env 环境对象
   */
  eject(env: Record<string | symbol, any>) {
    const index = this.all.indexOf(env);
    if (index !== -1) this.all.splice(index, 1);
  }

  /**
   * 检查全局环境中是否存在指定键的值
   * @param key 键名
   * @returns 是否存在
   */
  has(key: string | symbol) {
    let has = false;
    for (let i = this.all.length; i >= 0; i--) {
      if (this.all[i][key] !== undefined) {
        has = true;
        break;
      }
    }
    return has;
  }

  /**
   * 设置全局环境中指定键的值
   * @param key 键名
   * @param value 值
   */
  set(key: string | symbol, value: any) {
    if (!this.has(key)) {
      if (koi.use(KoiEnv).isDev) {
        this.raw[key] = value;
      } else {
        this.user[key] = value;
      }
    }
  }

  /**
   * 从全局环境中删除指定键的值
   * @param key 键名
   */
  unset(key: string) {
    delete (koi.use(KoiEnv).isDev ? this.raw : this.user)[key];
  }

  /**
   * 从全局环境中获取指定键的值
   * @param key 键名
   * @returns 值
   */
  acquire<T>(key: string): T | undefined {
    for (let i = this.all.length; i >= 0; i--) {
      if (this.all[i][key] !== undefined) {
        return this.all[i][key] as T;
      }
    }
    return undefined;
  }
}
