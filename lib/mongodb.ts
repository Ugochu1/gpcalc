import { Schema, model, models, connect } from "mongoose";

// connecting to mongoose (Get database url from .env.local)
const url: string = process.env.DATABASE_URL!;

// create our schemas now
interface Semester {
  course: string;
  score: number;
  grade?: string;
}

interface Record {
  title: string;
  last_modified: string;
  semester: Semester[];
}

interface IUser {
  username: string;
  password: string;
  records: Record[];
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  records: Array,
});

export const run_database = async () => {
  // create a connection
  const connection = await connect(url).catch((err) => console.log(err));
  console.log("Mongoose Connection Established.");

  const User = models.User || model<IUser>("User", userSchema);

  return { connection, User };
};
