@Koi.Reg("Literal", true)
export class KoiPluginLiteral extends KoiPlugin {
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
}
