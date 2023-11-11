import mongoose, { Model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  lastname: string;
  mobile: number;
  password: string;
  avatar: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
  },
  avatar:{
    type: String,
    required: false
  }
});

const Users: Model<IUser> = mongoose.model<IUser>("Users", UserSchema);

export default Users;
