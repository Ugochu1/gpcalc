import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import mongoose from "mongoose";

const recordSchema = new mongoose.Schema<MainRecord>({
  title: { type: String, lowercase: true },
  user: String,
  lastModified: Date,
  records: [
    {
      id: String,
      name: { type: String, lowercase: true },
      grade: { type: String, uppercase: true },
      unit_load: Number,
    },
  ],
  gpa: String,
  record_no: Number,
});

export const Record =
  mongoose.models.Record || mongoose.model("Record", recordSchema);