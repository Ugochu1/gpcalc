import protect_route from "@/function_modules/protect_route";
import tryCatch from "@/function_modules/tryCatch";
import { Record } from "@/lib/database/schemas/Record";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import { isObjectIdOrHexString } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function save(req: NextApiRequest, res: NextApiResponse) {
  const accessStatus = protect_route(req); // protect the route;
  const { _id, records, gpa } = req.body as Pick<
    MainRecord,
    "_id" | "records" | "gpa"
  >;

  async function run() {
    if (!accessStatus.approved) {
      return accessStatus.message;
    }

    return tryCatch(async () => {
      // update the values given
      const response = await Record.findByIdAndUpdate(
        _id,
        { records, gpa, lastModified: new Date() },
        { upsert: false }
      );
      return response;
    });
  }

  res.send(await run())
  res.end()
}
