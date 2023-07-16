import tryCatch from "@/function_modules/tryCatch";
import dbConnect from "@/lib/database/mongodb";
import { User } from "@/lib/database/schemas/User";
import hash from "@/lib/hash";
import { UserInterface } from "@/lib/interfaces/UserInterface";
import { NextApiRequest, NextApiResponse } from "next";

export interface SignupRequest {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse<UserInterface | string>
) {
  // get the input
  const { firstname, lastname, username, password }: SignupRequest = req.body;
  dbConnect(); // connect to database if already not connected.

  async function run(): Promise<UserInterface | string> {
    return tryCatch(async () => {
      const user_exists = await User.exists({
        username: username,
      });
      // console.log(user_exists)
      if (user_exists) {
        return "This username already exists";
      } else {
        const user = new User<UserInterface>({
          firstname,
          lastname,
          username,
          password: hash(password),
          createdAt: new Date(),
        });
        await user.save(); // save the new user to the database.
        return user;
      }
    });
  }

  res.send(await run());
  res.end();
}
