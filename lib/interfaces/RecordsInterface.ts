import { Course } from "./UserInterface";

export interface MainRecord {
  title: string;
  lastModified: Date;
  gpa: string;
  records: Course[];
}
