import type { NextApiRequest, NextApiResponse } from "next";

export default function login(req: NextApiRequest, res: NextApiResponse<string>) {
  res.send("This is the login API")
}
