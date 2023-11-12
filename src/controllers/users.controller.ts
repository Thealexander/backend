import { Request, Response } from "express";
import UserService from "../services/users.services";

export const readAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserService.readAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reading all users" });
  }
};

export const readUser = async (req: Request, res: Response) => {
  const userId = req.params._id;
  console.log("id_controller", userId);
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
    console.log("body", req.body);
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
