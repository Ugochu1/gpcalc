import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "@/lib/interfaces/UserInterface";
import protect_route from "@/function_modules/protect_route";

export default async function calculate_gpa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessStatus = protect_route(req);
  // we will calculate the gpa right here...
  const record: Course[] = req.body;

  function calculateGP(record: Array<Course>) {
    return new Promise((resolve: (value: string) => void, reject) => {
      let unit_load_sum = 0;
      let grade_sum = 0;

      for (let i = 0; i < record.length; i++) {
        let grade_value: number;
        switch (record[i].grade) {
          case "A":
            grade_value = 5;
            break;
          case "B":
            grade_value = 4;
            break;
          case "C":
            grade_value = 3;
            break;
          case "D":
            grade_value = 2;
            break;
          case "E":
            grade_value = 1;
            break;
          case "F":
            grade_value = 0;
            break;
          default:
            reject("No case match");
        }
        grade_sum += grade_value! * record[i].unit_load;
        unit_load_sum += record[i].unit_load;
      }
      resolve((grade_sum / unit_load_sum).toFixed(2));
    });
    // formula for calculating GPA is sum of product of grade value and unit_load divided by the sum of all unit loads
  }

  async function run() {
    if (!accessStatus.approved) {
      return accessStatus.message;
    }
    return await calculateGP(record);
  }
  
  res.send(await run())
  res.end();
}
