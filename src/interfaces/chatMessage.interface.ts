import mongoose, { Model, Document } from "mongoose";

export interface IChatMessage extends Document {
  chat: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  message: string;
  type?: "TEXT" | "IMAGE";
}

const ChatMessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
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

const ChatMessage: Model<IChatMessage> = mongoose.model<IChatMessage>(
  "ChatMessages",
  ChatMessageSchema
);

export default ChatMessage;
