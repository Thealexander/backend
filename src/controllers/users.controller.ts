import { Request, Response } from "express";
import { UserService } from "../services";

export const readAllUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const allUsers = await UserService.readAllUsers(userId);
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reading all users" });
  }
};

export const readUser = async (req: Request, res: Response) => {
  const userId = req.params._id;
  //console.log("id_controller", userId);
  try {
    const user = await UserService.readUser(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "User not found" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    //console.log("body", req.body);
    const newUserResponse = await UserService.createUser(req.body);
    const newUser = newUserResponse.user;
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params._id;

  try {
    const updatedUser = await UserService.updateUser(userId, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "User not found" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params._id;

  try {
    //const deletedUser = await UserService.deleteUser(userId);
    //res.json(deletedUser);
    await UserService.deleteUser(userId);
    res.json({ message: "Usuario ha sido eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "User not found" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await UserService.getMe(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getMeController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOwnProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const updatedProfile = req.body; 

    const updatedUser = await UserService.updateOwnProfile(userId, updatedProfile);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found or error updating profile" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error in Updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
