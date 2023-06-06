import * as jwt from "jsonwebtoken";

export function jwtSign(payload: string | object | Buffer) {
  return jwt.sign({ payload }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });
}

export function jwtVerify(token: string) {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  } catch (err) {
    return { message: "Error with JWT." };
  }
  return decoded;
}
