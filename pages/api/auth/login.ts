import tryCatch from "@/function_modules/tryCatch";
import dbConnect from "@/lib/database/mongodb";
import { User } from "@/lib/database/schemas/User";
import hash from "@/lib/hash";
import { UserInterface } from "@/lib/interfaces/UserInterface";
import { jwtSign } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export interface LoginRequest {
  username: string;
  password: string;
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<{ user: UserInterface; token: string } | string>
) {
  // usernames are case sensitive
  const { username, password }: LoginRequest = req.body;

  dbConnect(); // connect to the database;

  async function run(): Promise<
    { user: UserInterface; token: string } | string
  > {
    return tryCatch(async () => {
      const user = await User.findOne<UserInterface>({
        username,
        password: hash(password),
      });
      if (!user) {
        return "Invalid username or password";
      }
      const token = jwtSign(user._id as string);

      return {
        user,
        token,
      };
    });
  }

  res.send(await run());
  res.end();
}
