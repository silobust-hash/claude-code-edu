export function serializeJsonLd(value: unknown): string {
  try {
    const serialized = JSON.stringify(
      value,
      (_key, nested) => (nested === undefined ? undefined : nested),
    );

    return (serialized ?? "{}").replace(/[<>&\u2028\u2029]/g, (character) => {
      switch (character) {
        case "<":
          return "\\u003C";
        case ">":
          return "\\u003E";
        case "&":
          return "\\u0026";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          return character;
      }
    });
  } catch {
    return "{}";
  }
}
