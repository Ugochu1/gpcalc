import { jwtVerify } from "@/lib/jwt";
import { NextApiRequest } from "next";
import { Verified } from "../pages/api/user/get_user";
import hash from "@/lib/hash";

type AuthorizationHeader = string | undefined;

export interface Response {
  approved: boolean;
  _id?: string;
  message?: string;
}

export default function protect_route(req: NextApiRequest) {
  const token: AuthorizationHeader = req.headers.authorization?.split(" ")[1];
  // console.log(token)

  const verified = jwtVerify(token as string) as Verified;

  let response: Response;

  if (!token || verified.message) {
    console.log("Cannot pass")
    response = { approved: false, message: verified.message };
  } else {
    response = { approved: true, _id: verified.payload };
  }
  return response;
}
