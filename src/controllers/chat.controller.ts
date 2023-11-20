import { Request, Response } from "express";
import { ChatService } from "../services";

export const createChat = async (req: Request, res: Response) => {
  try {
    const newChatResponse = await ChatService.createChat(req.body);
    const newChat = newChatResponse.chat;

    console.log('test', newChat)
    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating New Chat" });
  }
};
