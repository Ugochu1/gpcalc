interface Course {
  name: string;
  score: number;
}

interface Record {
  title: string;
  lastModified: Date;
  semester: Course[];
}

export interface UserInterface {
  username: string;
  password: string;
  records: Record[];
}
