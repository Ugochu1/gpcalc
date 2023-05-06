import { createHash } from "crypto";

export default function hash(param: string) {
  return createHash("sha256").update(param).digest("hex");
}
