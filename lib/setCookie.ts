import { serialize } from "cookie";

export default function setCookie(
  response: any,
  name: string,
  value: string,
  options: Record<string, unknown> = {}
): void {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  response.setHeader(
    "Set-Cookie",
    serialize(name, String(stringValue), options)
  );
}
