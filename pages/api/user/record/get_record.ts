import protect_route from "@/function_modules/protect_route";
import tryCatch from "@/function_modules/tryCatch";
import dbConnect from "@/lib/database/mongodb";
import { Record } from "@/lib/database/schemas/Record";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import { GetProps, RecordRequest } from "@/lib/services/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_records(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();

  const { id } = req.query as Partial<RecordRequest>;

  const accessStatus = protect_route(req);

  async function run(): Promise<MainRecord[] | string> {
    if (!accessStatus.approved) {
      return accessStatus.message as string;
    }
    return tryCatch(async () => {
      return id && (await Record.findById(id)) as MainRecord;
    });
  }
  res.send(await run());
  res.end();
}
