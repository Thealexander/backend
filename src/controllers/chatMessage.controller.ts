import { Request, Response } from "express";
import { ChatMessageService } from "../services";

export const sendCMessage = async (req: Request, res: Response) => {
  try {
    console.info("info", req);
const newMessage = await ChatMessageService.sendCMessage(req.body);
    console.info('Nuevo mensaje', newMessage)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending Message" });
  }
};
export const readCMessage = async (req: Request, res: Response) => {};
