import protect_route from "@/function_modules/protect_route";
import tryCatch from "@/function_modules/tryCatch";
import dbConnect from "@/lib/database/mongodb";
import { Record } from "@/lib/database/schemas/Record";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import { GetProps } from "@/lib/services/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_records(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();

  let { preview, page_number } = req.query as GetProps;
  const accessStatus = protect_route(req);
  const page = parseInt(page_number as string);
  const NUMBER_OF_DOCUMENTS_PER_PAGE = 5;

  async function run(): Promise<MainRecord[] | string> {
    if (!accessStatus.approved) {
      return accessStatus.message as string;
    }
    if (preview === "true") {
      return tryCatch(() => {
        return Record.find({ user: accessStatus._id })
          .sort({ lastModified: -1 })
          .limit(3);
      });
    }

    // pagination here
    if (!isNaN(page)) {
      return tryCatch(() => {
        return Record.find({ user: accessStatus._id })
          .sort({ lastModified: -1 })
          .skip(page * NUMBER_OF_DOCUMENTS_PER_PAGE)
          .limit(NUMBER_OF_DOCUMENTS_PER_PAGE);
      });
    }
    return tryCatch(() => {
      return Record.find({ user: accessStatus._id }).sort({ lastModified: -1 });
    });
  }
  res.send(await run());
  res.end();
}
