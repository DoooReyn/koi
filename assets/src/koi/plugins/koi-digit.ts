/** 点 */
export interface Point {
  x: number;
  y: number;
}

/** 圆 */
export interface Circle {
  x: number;
  y: number;
  r: number;
}

/** 矩形 */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

@Koi.Reg("Digit", true)
export class KoiDigit extends KoiPlugin {
  readonly name: string = "Koi.Plugin.Digit";
  readonly version: string = "0.0.1";
  readonly description: string = "数字转换插件";
  readonly author: string = "Koi Team | DoooReyn";

  onAttach(): void {
    console.log("Koi Digit Plugin Attached");
  }

  onDetach(): void {
    console.log("Koi Digit Plugin Detached");
  }

  /**
   * 校验数字是否有效
   * @param digit 数字
   * @returns 是否有效
   */
  valid(digit: number): boolean {
    return !isNaN(digit);
  }

  /**
   * 校验数字是否为有限大
   * @param digit 数字
   * @returns 是否为有限大
   */
  finite(digit: number) {
    return isFinite(digit);
  }

  /**
   * 校验数字是否为无限大
   * @param digit 数字
   * @returns 是否为无限大
   */
  infinite(digit: number) {
    return !isFinite(digit);
  }

  /**
   * 四舍五入取整
   * @param digit 数字
   * @returns 四舍五入取整后的结果
   */
  round(digit: number) {
    return Math.round(digit);
  }

  /**
   * 获取数字的绝对值
   * @param digit 数字
   * @returns 绝对值
   */
  abs(digit: number) {
    return Math.abs(digit);
  }

  /**
   * 校验数字是否为整数
   * @param digit 数字
   * @returns 是否为整数
   */
  integer(digit: number) {
    return Number.isInteger(digit);
  }

  /**
   * 向下取整
   * @param digit 数字
   * @returns 向下取整后的结果
   */
  floor(digit: number) {
    return Math.floor(digit);
  }

  /**
   * 向上取整
   * @param digit 数字
   * @returns 向上取整后的结果
   */
  ceil(digit: number) {
    return Math.ceil(digit);
  }

  /**
   * 获取数字的小数部分
   * @param digit 数字
   * @returns 小数部分
   */
  decimal(digit: number) {
    return digit - Math.floor(digit);
  }

  /**
   * 幂运算
   * @param digit 数字
   * @param exponent 指数
   * @returns 幂运算结果
   */
  pow(digit: number, exponent: number) {
    return Math.pow(digit, exponent);
  }

  /**
   * 开方运算
   * @param digit 数字
   * @returns 开方运算结果
   */
  sqrt(digit: number) {
    return Math.sqrt(digit);
  }

  /**
   *  clamp 函数用于将一个数字限制在指定的范围内。
   * @param digit 要限制的数字
   * @param min 范围的最小值
   * @param max 范围的最大值
   * @returns 限制在范围内的数字
   */
  clamp(digit: number, min: number, max: number) {
    return Math.min(Math.max(digit, min), max);
  }

  /**
   * 检查两个数字是否相等
   * @param digit 第一个数字
   * @param other 第二个数字
   * @returns 是否相等
   */
  equals(digit: number, other: number, tolerance: number = Number.EPSILON) {
    return digit === other || Math.abs(digit - other) < tolerance;
  }

  /**
   * 获取数字的符号
   * @param digit 数字
   * @returns 符号(1 表示正数，-1 表示负数，0 表示零)
   */
  sign(digit: number) {
    return digit > 0 ? 1 : digit < 0 ? -1 : 0;
  }

  /**
   * 计算多个数字的和
   * @param digits 多个数字
   * @returns 数字的和
   */
  sum(...digits: number[]) {
    return digits.reduce((acc, cur) => acc + cur, 0);
  }

  /**
   * 计算多个数字的平均值
   * @param digits 多个数字
   * @returns 数字的平均值
   */
  average(...digits: number[]) {
    return this.sum(...digits) / digits.length;
  }

  /**
   * 计算多个数字的乘积
   * @param digits 多个数字
   * @returns 数字的乘积
   */
  product(...digits: number[]) {
    return digits.reduce((acc, cur) => acc * cur, 1);
  }

  /**
   * 保留数字的指定小数位数
   * @param digit 数字
   * @param bits 小数位数
   * @returns 保留指定小数位数后的数字
   */
  keepBits(digit: number, bits: number) {
    return Number(digit.toFixed(bits));
  }

  /**
   * 计算两个数字之间的距离
   * @param digit 第一个数字
   * @param other 第二个数字
   * @returns 两个数字之间的距离
   */
  distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * 角度转换为弧度
   * @param angle 角度
   * @returns 弧度
   */
  angle2rad(angle: number) {
    return angle * (Math.PI / 180);
  }

  /**
   * 弧度转换为角度
   * @param rad 弧度
   * @returns 角度
   */
  rad2angle(rad: number) {
    return rad * (180 / Math.PI);
  }

  /**
   * 计算两个点之间的角度
   * @param x1 第一个点的 x 坐标
   * @param y1 第一个点的 y 坐标
   * @param x2 第二个点的 x 坐标
   * @param y2 第二个点的 y 坐标
   * @returns 两个点之间的角度
   */
  angle(x1: number, y1: number, x2: number, y2: number) {
    return this.rad2angle(Math.atan2(y2 - y1, x2 - x1));
  }

  /**
   * 检查两个圆是否相交
   * @param x1 第一个圆的中心 x 坐标
   * @param y1 第一个圆的中心 y 坐标
   * @param r1 第一个圆的半径
   * @param x2 第二个圆的中心 x 坐标
   * @param y2 第二个圆的中心 y 坐标
   * @param r2 第二个圆的半径
   * @returns 是否相交
   */
  intersect(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ) {
    return this.distance(x1, y1, x2, y2) <= r1 + r2;
  }

  /**
   * 二次贝塞尔曲线
   * @param t 时间参数(0 到 1 之间的数值)
   * @param p1 起始点
   * @param c1 控制点
   * @param p2 结束点
   * @returns 贝塞尔曲线上对应时间参数的点坐标
   */
  quadraticBezier(t: number, p1: Point, c1: Point, p2: Point): Point {
    const x = (1 - t) ** 2 * p1.x + 2 * (1 - t) * t * c1.x + t ** 2 * p2.x;
    const y = (1 - t) ** 2 * p1.y + 2 * (1 - t) * t * c1.y + t ** 2 * p2.y;
    return { x, y };
  }

  /**
   * 三次贝塞尔曲线
   * @param t 时间参数(0 到 1 之间的数值)
   * @param p1 起始点
   * @param c1 第一个控制点
   * @param c2 第二个控制点
   * @param p2 结束点
   * @returns 贝塞尔曲线上对应时间参数的点坐标
   */
  cubicBezier(t: number, p1: Point, c1: Point, c2: Point, p2: Point): Point {
    const x =
      (1 - t) ** 3 * p1.x +
      3 * (1 - t) ** 2 * t * c1.x +
      3 * (1 - t) * t ** 2 * c2.x +
      t ** 3 * p2.x;
    const y =
      (1 - t) ** 3 * p1.y +
      3 * (1 - t) ** 2 * t * c1.y +
      3 * (1 - t) * t ** 2 * c2.y +
      t ** 3 * p2.y;
    return { x, y };
  }
}
