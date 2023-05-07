import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

export default async function middleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check the validity of the middleware here.
  let { user, accessToken } = req.body;
  const result = jwtVerify(accessToken.value) as JwtPayload; // eliminates the fact that it could be a string.
  user = JSON.parse(user.value);
  if (
    result.username === user.username &&
    result.password === user.password
  ) {
    // the jwt has been verified.
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
}
