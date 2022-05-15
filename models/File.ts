import mongoose, { Document } from "mongoose";

const FileSchema = new mongoose.Schema<IFile>(
  {
    name: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    sizeInBytes: {
      type: Number,
      required: true,
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
  },
  { timestamps: true }
);

interface IFile {
  name: string;
  format: string;
  sizeInBytes: number;
  secure_url: string;
  sender?: string;
  receiver?: string;
}

export default mongoose.model<IFile>("File", FileSchema);
