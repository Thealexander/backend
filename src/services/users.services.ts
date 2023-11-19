import Users, { IUser } from "../interfaces/users.interface";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import fs from "fs-extra";
import path from "path";

dotenv.config();

class UserService {
  //Create User
  async createUser(user: IUser) {
    try {
      if (typeof user.password !== "string") {
        console.log("password", user.password);
        throw new Error(" incorrect password ");
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      //user.avatar = File.path

      const newUser = await Users.create(user);

      return { user: newUser };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }
  //Read Users
  async readAllUsers(userId: string) {
    console.log('xxx')
    try {
      const allUsers = await Users.find({ _id: { $ne: userId } }).select([
        "-password",
      ]);
      return allUsers;
    } catch (error) {
      console.error("Error reading all users:", error);
      throw new Error("Error reading all users");
    }
  }
  //Read User
  async readUser(userId: string) {
    try {
      // console.log('id', userId)
      const user = await Users.findById(userId); //.select(["-password"])
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
      return deletedUser && (await fs.unlink(path.resolve(deletedUser.avatar)));
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw new Error("Error deleting user");
    }
  }
  //logged User Information
  async getMe(userId: string): Promise<IUser | null> {
    try {
      const user = await Users.findById(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
  // update info de perfil
  async updateOwnProfile(
    userId: string,
    updatedProfile: IUser
  ): Promise<IUser | null> {
    try {
      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const existingUser = await Users.findById(userId);

      if (!existingUser) {
        throw new Error("User not found");
      }

      // Verificar si se proporcionó una nueva contraseña
      if (updatedProfile.password) {
        // Hash de la nueva contraseña
        const salt = await bcrypt.genSalt();
        updatedProfile.password = await bcrypt.hash(
          updatedProfile.password,
          salt
        );
      }

      // Actualizar el perfil del usuario
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        updatedProfile,
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Error updating user");
      }

      // No devolver la contraseña en la respuesta
      updatedUser.password = "";

      return updatedUser;
    } catch (error) {
      console.error(
        `Error updating own profile for user with ID ${userId}:`,
        error
      );
      return null;
    }
  }
}

export default new UserService();
