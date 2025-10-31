import { KoiAppArgs, KoiAppMode } from "../typings/app.typings";
import { KoiLogLevel } from "../typings/logcat.typings";
import { KoiDict } from "./koi-dict";
import { KoiLiteral } from "./koi-literal";

@Koi.Reg("Env", true)
export class KoiEnv extends KoiPlugin {
  readonly name = "Koi.Plugin.Env";
  readonly version = "0.0.1";
  readonly description = "环境变量插件";
  readonly author = "Koi Team | DoooReyn";

  onAttach() {
    console.log("Koi Env Plugin Attached");
    this.args = {
      appName: "jyc-dev",
      mode: KoiAppMode.Dev,
      version: "0.0.1",
      oss: "http://localhost:3000",
      gate: "http://localhost:3100",
      gameHttp: "http://localhost:3200",
      gameWss: "ws://localhost:3300",
      fps: 60,
      logLevel: KoiLogLevel.Debug,
      timeoutHttp: 15000,
      timeoutWss: 30000,
      user: "admin",
    };
  }

  onDetach() {
    console.log("Koi Env Plugin Detached");
  }

  public args: KoiAppArgs;

  parse(url: string) {
    const args = koi.use(KoiLiteral).extractUrlParams(url);
    koi.use(KoiDict).merge(this.args, args);
    return this.args;
  }

  use(args: KoiAppArgs) {
    koi.use(KoiDict).merge(this.args, args);
  }

  isMode(mode: KoiAppMode) {
    return this.args.mode === mode;
  }

  /**
   * 是否开发模式
   * @returns
   */
  get isDev() {
    return this.isMode(KoiAppMode.Dev);
  }

  /**
   * 是否调试模式
   * @returns
   */
  get isDebug() {
    return this.isMode(KoiAppMode.Debug);
  }

  /**
   * 是否预发布模式
   * @returns
   */
  get isBeta() {
    return this.isMode(KoiAppMode.Beta);
  }

  /**
   * 是否发布模式
   * @returns
   */
  get isRelease() {
    return this.isMode(KoiAppMode.Release);
  }
}
