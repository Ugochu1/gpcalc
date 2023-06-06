import protect_route from "@/function_modules/protect_route";
import tryCatch from "@/function_modules/tryCatch";
import { NextApiRequest, NextApiResponse } from "next";
import { PreviewRecord } from "@/lib/interfaces/UserInterface";
import { Record } from "@/lib/database/schemas/Record";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import dbConnect from "@/lib/database/mongodb";
import { User } from "@/lib/database/schemas/User";

export default async function initialize(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();
  const accessStatus = protect_route(req);
  async function run() {
    if (!accessStatus.approved) {
      return accessStatus.message;
    }
    const { title }: Pick<PreviewRecord, "title"> = req.body;
    return tryCatch(async () => {
      const found = await Record.exists({ title });
      if (found) {
        return found;
      }
      // create a new record with the details provided.
      const record = new Record<MainRecord>({
        title,
        lastModified: new Date(),
        gpa: "",
        records: [],
      });
      // console.log(record);
      await record.save();
      await User.updateOne(
        { _id: accessStatus._id },
        {
          $push: {
            records: {
              id: record._id,
              lastModified: record.lastModified,
              title: record.title,
            },
          },
        }
      );
      return { record, updatedUser: accessStatus._id };
    });
  }

  res.send(await run());
  res.end();
}
