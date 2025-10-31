@Koi.Reg("Literal", true)
export class KoiLiteral extends KoiPlugin {
  readonly name = "Koi.Plugin.Literal";
  readonly version = "0.0.1";
  readonly description = "Koi Literal Plugin";
  readonly author = "Koi Team | DoooReyn";

  onAttach() {
    console.log("Koi Literal Plugin Attached");
  }

  onDetach() {
    console.log("Koi Literal Plugin Detached");
  }

  join(lines: string[], separator: string = "\n") {
    return lines.join(separator);
  }

  blank(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.trim() === "";
  }

  extractUrlParams(url?: string) {
    url ??= window.location ? window.location.href : "";
    let params: Record<string, string> = {};
    if (this.blank(url)) return params;

    let name: string, value: string;
    let num = url.indexOf("?");
    url = url.substring(num + 1);

    let arr = url.split("&");
    for (let i = 0, l = arr.length; i < l; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substring(num + 1);
        params[name] = value;
      }
    }
    
    return params;
  }
}
