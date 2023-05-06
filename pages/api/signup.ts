import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/lib/database/schemas/User";
import dbConnect from "@/lib/database/mongodb";
import { UserInterface } from "@/lib/interfaces/UserInterface";
import hash from "@/lib/hash";
// import { Error } from "mongoose";

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
    password: hash(req.body.password),
  };

  // console.log(reqBody)

  // check connection to db
  dbConnect();

  // check if this user already exists.
  let result: UserInterface | null = await User.findOne({
    username: reqBody.username,
  });

  if (result === null) {
    // Create new user
    let user = new User<UserInterface>({
      username: reqBody.username,
      password: reqBody.password,
      records: [],
    });
    user.save();
    res.json({ message: "User created successfully" });
  } else {
    // this user already exists
    res.json({ message: "User already exists" });
  }
}
