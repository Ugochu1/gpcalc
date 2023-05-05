import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/lib/database/schemas/User";
import dbConnect from "@/lib/database/mongodb";
import { UserInterface } from "@/lib/interfaces/UserInterface";
import { Error } from "mongoose";

interface ReqBody {
  username: string;
  password: string;
}

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create a request body that satisfies the interface criteria
  const reqBody: ReqBody = {
    username: req.body.username,
    password: req.body.password,
  };

  // console.log(reqBody)

  // check connection to db
  dbConnect();

  // check if this user already exists.
  const result: UserInterface | null = await User.findOne({
    username: reqBody.username,
  });

  if (result === null) {
    // no result found. Create new user
    let user = await User.create({
      username: reqBody.username,
      password: reqBody.password,
      records: [],
    })
    user.save();
  } else {
    console.log(result)
  }

  res.status(200).json({ name: "Ell received" });
}
