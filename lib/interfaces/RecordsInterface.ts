import { Course } from "./UserInterface";

export interface MainRecord {
  title: string;
  user: string;
  lastModified: Date;
  gpa: string;
  records: Course[];
  record_no: number;
}
