import Users, { IUser } from "../interfaces/users.interface";
import bcrypt from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

class UserService {
  //Create User
  async createUser(user: IUser) {
    try {
      if (typeof user.password !== "string") {
          console.log("password", user.password);
        throw new Error("unfuctional password");
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;

      const newUser = await Users.create(user);

      return { user: newUser };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }
  //Read Users
  async readAllUsers() {
    try {
      const allUsers = await Users.find();
      return allUsers;
    } catch (error) {
      console.error("Error reading all users:", error);
      throw new Error("Error reading all users");
    }
  }
  //Read User
  async readUser(userId: string) {
    try {
        console.log('id', userId)
      const user = await Users.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error(`Error reading user with ID ${userId}:`, error);
      throw new Error("Error reading user");
    }
  }
  //Update User
  async updateUser(userId: string, updatedUser: IUser) {
    try {
      if (updatedUser.password) {
        // Hash the updated password before saving it
        const salt = await bcrypt.genSalt();
        updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
      }

      const user = await Users.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
      if (!user) {
        throw new Error("User not found");
      }

      return { user };
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw new Error("Error updating user");
    }
  }
  //Delete user
  async deleteUser(userId: string) {
    try {
      const deletedUser = await Users.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw new Error("Error deleting user");
    }
  }
}

export default new UserService();
