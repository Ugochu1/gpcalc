import type { NextApiRequest, NextApiResponse } from "next";
import hash from "@/lib/hash";
import dbConnect from "@/lib/database/mongodb";
import { User } from "@/lib/database/schemas/User";
import { UserInterface } from "@/lib/interfaces/UserInterface";
import { jwtSign } from "@/lib/jwt";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  // create an interface for the req.body
  interface ReqBody {
    username: string;
    password: string;
  }

  const reqBody: ReqBody = {
    username: req.body.username,
    password: hash(req.body.password),
  };

  // check connection to database
  dbConnect();

  // check if the user exists
  let result: UserInterface | null;
  try {
    result = await User.findOne(reqBody);
  } catch (err) {
    // if there was an error, return null
    result = null;
  }

  if (result !== null) {
    // Generate a JWT and send to client
    const token = jwtSign({
      username: result.username,
      password: result.password,
    });
    res.json({ user: reqBody, token });
  } else {
    res.json({ message: "Account not found." });
  }
}
