import mongoose, { Model, Document } from "mongoose";

export interface IGroupMessage extends Document {
  group: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  message: string;
  type?: "TEXT" | "IMAGE"; 
  _doc?: Record<string, unknown>;
  createdAt?: Record<string, unknown>;
}

const GroupMessagesSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["TEXT", "IMAGE"],
    },
  },
  {
    timestamps: true,
  }
);

const GroupMessage: Model<IGroupMessage> = mongoose.model<IGroupMessage>(
  "GroupMessages",
  GroupMessagesSchema
);

export default GroupMessage;
