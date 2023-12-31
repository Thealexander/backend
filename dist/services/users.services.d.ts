/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IUser } from "../interfaces/users.interface";
declare class UserService {
    createUser(user: IUser): Promise<{
        user: import("mongoose").Document<unknown, {}, IUser> & IUser & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    readAllUsers(userId: string): Promise<(import("mongoose").Document<unknown, {}, IUser> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readUser(userId: string): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUser(userId: string, updatedUser: IUser): Promise<{
        user: import("mongoose").Document<unknown, {}, IUser> & IUser & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteUser(userId: string): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getMe(userId: string): Promise<IUser | null>;
    updateOwnProfile(userId: string, updatedProfile: IUser): Promise<IUser | null>;
}
declare const _default: UserService;
export default _default;
