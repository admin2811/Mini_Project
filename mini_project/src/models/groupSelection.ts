import mongoose, { Document, Model, Schema } from "mongoose";

interface TUser extends Document {
  id: string;
  name: string;
  email: string;
  msv: string;
  compatibility: number;
  group: string
}

const GroupSelectionSchema : Schema<TUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  msv: {
    type: String,
    required: true,
    },
  compatibility: {
    type: Number,
    required: true,
  },
  group: {
    type: String,
    required: true,
  }
  }, 
  { timestamps: true } 
);

const GroupSelection: Model<TUser> =
  mongoose.models.GroupSelection || mongoose.model<TUser>("GroupSelection", GroupSelectionSchema);

export default GroupSelection;