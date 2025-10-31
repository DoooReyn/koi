import { Color } from "cc";

@Koi.Reg("Color", true)
export class KoiColor extends KoiPlugin {
  readonly name = "Koi.Plugin.Color";
  readonly version = "0.0.1";
  readonly description = "Koi Color Plugin";
  readonly author = "Koi Team | DoooReyn";

  private readonly cache: { [key: string]: Color } = Object.create(null);

  onAttach() {
    console.log("Koi Color Plugin Attached");
  }

  onDetach() {
    console.log("Koi Color Plugin Detached");
  }

  /**
   * 色值转换
   * @param r 色值(通道 R)
   * @param g 通道 G
   * @param b 通道 B
   * @param a 通道 A
   */
  from(r: Color): Color;
  from(r: string): Color;
  from(r: number, g: number, b: number, a?: number): Color;
  from(
    r: Color | string | number[] | number,
    g?: number,
    b?: number,
    a?: number
  ): Color {
    if (typeof r === "string") {
      let color = this.cache[r];
      if (!color) {
        color = new Color();
        this.cache[r] = color = Color.fromHEX(color, r);
      }
      return color;
    } else if (typeof r === "number") {
      g ??= 255;
      b ??= 255;
      const colors = [r, g, b];
      if (a != undefined) colors[3] = a;
      const hex =
        "#" +
        colors
          .map((v) => v.toString(16).padStart(2, "0").toUpperCase())
          .join("");
      return this.from(hex);
    } else if (Array.isArray(r)) {
      let [rr, gg, bb, aa] = r;
      rr ??= 255;
      gg ??= 255;
      bb ??= 255;
      const colors = [rr, gg, bb];
      if (aa != undefined) colors[3] = aa;
      const hex =
        "#" +
        colors
          .map((v) => v.toString(16).padStart(2, "0").toUpperCase())
          .join("");
      return this.from(hex);
    } else {
      return r.clone();
    }
  }
}
