import { Model, Document } from "mongoose";
export interface IUser extends Document {
    username: string;
    name: string;
    lastname: string;
    mobile: number;
    password: string;
    avatar: string;
    exp?: number;
}
declare const Users: Model<IUser>;
export default Users;
