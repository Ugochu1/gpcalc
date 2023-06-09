export interface Course {
  name: string;
  grade: string;
  unit_load: number;
  id: string;
}

export interface PreviewRecord {
  id: string;
  title: string;
  lastModified: Date;
}

export interface UserInterface {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  createdAt: Date;
}
