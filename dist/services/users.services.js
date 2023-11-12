"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_interface_1 = __importDefault(require("../interfaces/users.interface"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    //Create User
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof user.password !== "string") {
                    console.log("password", user.password);
                    throw new Error("unfuctional password");
                }
                const salt = yield bcrypt_1.default.genSalt();
                const hashedPassword = yield bcrypt_1.default.hash(user.password, salt);
                user.password = hashedPassword;
                const newUser = yield users_interface_1.default.create(user);
                return { user: newUser };
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Error creating user");
            }
        });
    }
    //Read Users
    readAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield users_interface_1.default.find();
                return allUsers;
            }
            catch (error) {
                console.error("Error reading all users:", error);
                throw new Error("Error reading all users");
            }
        });
    }
    //Read User
    readUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id', userId);
                const user = yield users_interface_1.default.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (error) {
                console.error(`Error reading user with ID ${userId}:`, error);
                throw new Error("Error reading user");
            }
        });
    }
    //Update User
    updateUser(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (updatedUser.password) {
                    // Hash the updated password before saving it
                    const salt = yield bcrypt_1.default.genSalt();
                    updatedUser.password = yield bcrypt_1.default.hash(updatedUser.password, salt);
                }
                const user = yield users_interface_1.default.findByIdAndUpdate(userId, updatedUser, {
                    new: true,
                });
                if (!user) {
                    throw new Error("User not found");
                }
                return { user };
            }
            catch (error) {
                console.error(`Error updating user with ID ${userId}:`, error);
                throw new Error("Error updating user");
            }
        });
    }
    //Delete user
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield users_interface_1.default.findByIdAndDelete(userId);
                if (!deletedUser) {
                    throw new Error("User not found");
                }
                return deletedUser;
            }
            catch (error) {
                console.error(`Error deleting user with ID ${userId}:`, error);
                throw new Error("Error deleting user");
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=users.services.js.map