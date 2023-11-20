import { Request, Response } from "express";
import { ChatService } from "../services";

export const createChat = async (req: Request, res: Response) => {
  try {
    const newChatResponse = await ChatService.createChat(req.body);
    console.log("existe?", newChatResponse.chatExists);

    if (!newChatResponse.chatExists) {
      const newChat = newChatResponse.chat;
      console.log("info", newChat);
      res.status(201).json(newChat);
    } else {
      return res
        .status(200)
        .json({ msg: "Ya existe un chat de ambos usuarios" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating New Chat" });
  }
};

export const readChats = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // Asegúrate de tener esta ruta definida en tu archivo de rutas
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const chats = await ChatService.readChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reading chats" });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  try {
    console.info("chat req id", req.params.id);
    const chatId = req.params.id; // Asegúrate de tener esta ruta definida en tu archivo de rutas
    await ChatService.deleteChat(chatId);
    res.status(200).json({ msg: "chat eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting chat" });
  }
};

export const readChat = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // Asumo que tienes el userId almacenado en req.userId
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const chatId = req.params.id;
    console.info("chat req id", req.params.id);
    const result = await ChatService.readChat(chatId);
    const chat = result.chat;

    res.status(200).json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reading chat" });
  }
};
