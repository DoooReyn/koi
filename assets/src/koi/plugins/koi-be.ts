import { Component, js, Node } from "cc";

@Koi.Reg("Be", true)
export class KoiBe extends KoiPlugin {
  readonly name = "Koi.Plugin.Be";
  readonly version = "0.0.1";
  readonly description = "布尔插件";
  readonly author = "Koi Team | DoooReyn";

  onAttach() {
    console.log("Koi Boolean Plugin Attached");
  }

  onDetach() {
    console.log("Koi Boolean Plugin Detached");
  }

  /**
   * 判断值是否为 undefined
   * @param value 目标值
   * @returns 是否为 undefined
   */
  absent<T>(value: T | undefined): value is undefined {
    return value === undefined;
  }

  /**
   * 判断值是否不为 undefined
   * @param value 目标值
   * @returns 是否不为 undefined
   */
  present<T>(value: T | undefined): value is T {
    return value !== undefined;
  }

  /**
   * 判断值是否为 null
   * @param value 目标值
   * @returns 是否为 null
   */
  none<T>(value: T | null): value is null {
    return value === null;
  }

  /**
   * 判断值是否不为 null
   * @param value 目标值
   * @returns 是否不为 null
   */
  some<T>(value: T | null): value is T {
    return value !== null;
  }

  /**
   * 判断值是否为 undefined 或 null
   * @param value 目标值
   * @returns 是否为 undefined 或 null
   */
  valid<T>(value: T | undefined | null): value is undefined | null {
    return this.absent(value) || this.none(value);
  }

  /**
   * 判断值是否不为 undefined 且不为 null
   * @param value 目标值
   * @returns 是否不为 undefined 且不为 null
   */
  invalid<T>(value: T | undefined | null): value is T {
    return this.present(value) && this.some(value);
  }

  /**
   * 判断值是否为空
   * @param value 目标值
   * @returns 是否为空
   */
  empty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      value === 0 ||
      value === false ||
      value === "" ||
      value === "false"
    );
  }

  /**
   * 判断值是否为 true
   * @param value 目标值
   * @returns 是否为 true
   */
  truly(value: boolean | string | number): boolean {
    return value === true || value === 1 || value === "true";
  }

  /**
   * 判断值是否为 false
   * @param value 目标值
   * @returns 是否为 false
   */
  falsy(value: boolean | string | number): boolean {
    return value === false || value === 0 || value === "false";
  }

  /**
   * 判断值是否为 true
   * @param value 目标值
   * @returns 是否为 true
   */
  yes(value: any) {
    return Boolean(value);
  }

  /**
   * 判断值是否为 false
   * @param value 目标值
   * @returns 是否为 false
   */
  nop(value: any) {
    return !this.yes(value);
  }

  /**
   * 获取值的类型
   * @param value 目标值
   * @returns 值的类型
   */
  typeof(value: any): string {
    return Object.prototype.toString.call(value).slice(8, -1);
  }

  /**
   * 判断值是否为指定类型
   * @param value 目标值
   * @param type 类型
   * @returns 是否为指定类型
   */
  isTypeOf(value: any, type: string): boolean {
    return this.typeof(value) === type;
  }

  /**
   * 判断值是否为 NaN
   * @param value 目标值
   * @returns 是否为 NaN
   */
  nan(value: number) {
    return isNaN(value);
  }

  /**
   * 判断值是否为数字
   * @param value 目标值
   * @returns 是否为数字
   */
  digit(value: any) {
    return this.isTypeOf(value, "Number") && !isNaN(value);
  }

  /**
   * 判断值是否为字符串
   * @param value 目标值
   * @returns 是否为字符串
   */
  literal(value: any) {
    return this.isTypeOf(value, "String");
  }

  /**
   * 判断值是否为函数
   * @param value 目标值
   * @returns 是否为函数
   */
  func(value: any) {
    return this.isTypeOf(value, "Function");
  }

  /**
   * 判断值是否为符号
   * @param value 目标值
   * @returns 是否为符号
   */
  symbol(value: any) {
    return this.isTypeOf(value, "Symbol");
  }

  /**
   * 判断值是否为对象
   * @param value 目标值
   * @returns 是否为对象
   */
  dict(value: any) {
    return this.isTypeOf(value, "Object");
  }

  /**
   * 判断值是否为普通对象
   * @param value 目标值
   * @returns 是否为普通对象
   */
  plainDict(value: any) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
  }

  /**
   * 判断值是否为数组
   * @param value 目标值
   * @returns 是否为数组
   */
  list(value: any) {
    return this.isTypeOf(value, "Array") || Array.isArray(value);
  }

  /**
   * 判断值是否为正则表达式
   * @param value 目标值
   * @returns 是否为正则表达式
   */
  regexp(value: any) {
    return this.isTypeOf(value, "RegExp");
  }

  /**
   * 判断值是否为映射
   * @param value 目标值
   * @returns 是否为映射
   */
  map(value: any) {
    return this.isTypeOf(value, "Map");
  }

  /**
   * 判断值是否为集合
   * @param value 目标值
   * @returns 是否为集合
   */
  set(value: any) {
    return this.isTypeOf(value, "Set");
  }

  /**
   * 判断值是否为弱映射
   * @param value 目标值
   * @returns 是否为弱映射
   */
  weakMap(value: any) {
    return this.isTypeOf(value, "WeakMap");
  }

  /**
   * 判断值是否为弱集合
   * @param value 目标值
   * @returns 是否为弱集合
   */
  weakSet(value: any) {
    return this.isTypeOf(value, "WeakSet");
  }

  /**
   * 判断值是否为日期
   * @param value 目标值
   * @returns 是否为日期
   */
  date(value: any) {
    return this.isTypeOf(value, "Date");
  }

  /**
   * 判断值是否为指定类型的实例
   * @param value 目标值
   * @param type 类型
   * @returns 是否为指定类型的实例
   */
  instanceof(value: any, type: any) {
    return value instanceof type;
  }

  /**
   * 判断值是否为节点
   * @param value 目标值
   * @returns 是否为节点
   */
  node(value: any) {
    return this.instanceof(value, Node);
  }

  /**
   * 判断值是否为组件
   * @param value 目标值
   * @returns 是否为组件
   */
  component(value: any) {
    return this.instanceof(value, Component);
  }

  /**
   * 获取值的 CC 类名
   * @param value 目标值
   * @returns 值的 CC 类名
   */
  ccclassOf<T extends new (...args: any) => any>(value: InstanceType<T>) {
    return js.getClassName(value);
  }

  /**
   * 判断值是否为指定 CC 类名的实例
   * @param value 目标值
   * @param type CC 类名
   * @returns 是否为指定 CC 类名的实例
   */
  isCCClassOf<T extends new (...args: any) => any>(
    value: InstanceType<T>,
    type: string
  ) {
    return this.ccclassOf(value) === type;
  }

  /**
   * 判断值是否为 URL
   * @param value 目标值
   * @returns 是否为 URL
   */
  url(value: string) {
    return value.indexOf("://") > -1;
  }

  /**
   * 获取 URL 的协议部分
   * @param url 目标 URL
   * @returns URL 的协议部分
   */
  protocolOf(url: string) {
    return url.split("://")[0].trim().toLowerCase();
  }

  /**
   * 判断 URL 是否为指定协议
   * @param url 目标 URL
   * @param protocol 协议
   * @returns 是否为指定协议
   */
  isProtocolOf(url: string, protocol: string) {
    return this.protocolOf(url) === protocol;
  }

  /**
   * 判断 URL 是否为 WS 协议
   * @param url 目标 URL
   * @returns 是否为 WS 协议
   */
  ws(url: string) {
    return this.isProtocolOf(url, "ws");
  }

  /**
   * 判断 URL 是否为 WSS 协议
   * @param url 目标 URL
   * @returns 是否为 WSS 协议
   */
  wss(url: string) {
    return this.isProtocolOf(url, "wss");
  }

  /**
   * 判断 URL 是否为 HTTP 协议
   * @param url 目标 URL
   * @returns 是否为 HTTP 协议
   */
  http(url: string) {
    return this.isProtocolOf(url, "http");
  }

  /**
   * 判断 URL 是否为 HTTPS 协议
   * @param url 目标 URL
   * @returns 是否为 HTTPS 协议
   */
  https(url: string) {
    return this.isProtocolOf(url, "https");
  }
}
