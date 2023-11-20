import mongoose, { Model, Document } from "mongoose";

export interface IChat extends Document {
  member_one: mongoose.Types.ObjectId;
  member_two: mongoose.Types.ObjectId;
}

const ChatSchema = new mongoose.Schema({
  member_one: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  member_two: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Chat: Model<IChat> = mongoose.model<IChat>("Chats", ChatSchema);

export default Chat;
