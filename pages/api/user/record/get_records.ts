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

  let { preview, page_number, skip } = req.query as GetProps;
  const accessStatus = protect_route(req);
  const page = parseInt(page_number as string);
  const SKIP_NUMBER = parseInt(skip as string);
  const NUMBER_OF_DOCUMENTS_PER_PAGE = 5;

  function returnRecordLength() {
    return tryCatch(async () => {
      return await Record.find({user: accessStatus._id}).count()
    })
  }

  async function run(): Promise<MainRecord[] | string> {
    if (!accessStatus.approved) {
      return accessStatus.message as string;
    }
    if (preview === "true") {
      return tryCatch(async () => {
        const response = await Record.find({ user: accessStatus._id })
          .sort({ lastModified: -1 })
          .limit(3);
        const count = await returnRecordLength();
        return {
          response, count
        }
      });
    }

    // pagination here
    if (!isNaN(page)) {
      return tryCatch(async () => {
        // console.log("here")
        const response = await Record.find({ user: accessStatus._id })
          .sort({ lastModified: -1 })
          .skip(page * (SKIP_NUMBER ?? NUMBER_OF_DOCUMENTS_PER_PAGE))
          .limit(NUMBER_OF_DOCUMENTS_PER_PAGE);
        const count = await returnRecordLength();
        return {
          response, count
        }
      });
    }

    // return everything
    return tryCatch(async () => {
      const response = await Record.find({ user: accessStatus._id }).sort({ lastModified: -1 });
      const count = await returnRecordLength();
      return {
        response, count
      }
    });
  }
  res.send(await run());
  res.end();
}
