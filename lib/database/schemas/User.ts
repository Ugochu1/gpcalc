import mongoose from "mongoose";
import { UserInterface } from "@/lib/interfaces/UserInterface";
// create user schema

const userSchema = new mongoose.Schema<UserInterface>({
  firstname: { type: String, lowercase: true },
  lastname: { type: String, lowercase: true },
  username: { type: String, unique: true },
  password: String,
  createdAt: Date,
  records: [
    {
      id: String,
      title: { type: String, lowercase: true },
      lastModified: Date
    },
  ],
});

// create a model

export const User = mongoose.models.User || mongoose.model("User", userSchema);
