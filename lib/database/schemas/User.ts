import mongoose from "mongoose";
import { UserInterface } from "@/lib/interfaces/UserInterface";
// create user schema

const userSchema = new mongoose.Schema<UserInterface>({
  username: { type: String, unique: true },
  password: String,
  records: [
    {
      title: String,
      lastModified: Date,
      semester: [
        {
          name: String,
          score: Number,
        },
      ],
    },
  ],
});

// create a model

export const User = mongoose.models.User || mongoose.model("User", userSchema);
