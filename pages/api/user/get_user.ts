import { User } from "@/lib/database/schemas/User";
import tryCatch from "@/function_modules/tryCatch";
import { UserInterface } from "@/lib/interfaces/UserInterface";
import { jwtVerify } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import protect_route from "../../../function_modules/protect_route";
import dbConnect from "@/lib/database/mongodb";

interface GetUserRequest {
  token: string;
}

export interface Verified {
  payload?: string;
  message?: string;
}

export default async function get_user(
  req: NextApiRequest,
  res: NextApiResponse
) {

  dbConnect(); // connect to the database if not already connected

  const accessStatus = protect_route(req); // protect this route
  // const { token }: GetUserRequest = req.body;

  async function run(): Promise<UserInterface | string> {
    // const verified = jwtVerify(token) as Verified;
    // if (!verified.payload) {
    //   return verified.message as string;
    // }
    if (!accessStatus.approved) {
      return accessStatus.message as string;
    }
    return tryCatch(async () => {
      const response = await User.findOne<UserInterface>({
        _id: accessStatus._id,
      });
      return response ? response : "User not found";
    });
  }
  res.send(await run());
  res.end();
}
