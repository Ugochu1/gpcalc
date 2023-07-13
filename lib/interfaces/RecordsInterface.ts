import { Course } from "./UserInterface";

export interface MainRecord {
  _id?: string;
  title: string;
  user: string;
  lastModified: Date;
  gpa: string;
  records: Course[];
  record_no: number;
}
