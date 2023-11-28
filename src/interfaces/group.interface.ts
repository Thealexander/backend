import mongoose, { Model, Document } from "mongoose";

export interface IGroupParticipant {
  user: mongoose.Types.ObjectId;
}

export interface IGroup extends Document {
  name: string;
  image: string;
  creator: mongoose.Types.ObjectId;
  participants: IGroupParticipant[];
}

const GroupParticipantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    //required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  participants: {
    type: [GroupParticipantSchema],
    ref: "Users",
    required: true,
  },
});
const Group: Model<IGroup> = mongoose.model<IGroup>("Groups", GroupSchema);

export default Group;
