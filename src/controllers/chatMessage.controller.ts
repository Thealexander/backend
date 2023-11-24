import { Request, Response } from "express";
import { ChatMessageService } from "../services";
import Chat from "../interfaces/chat.interface";

export const sendTM = async (req: Request, res: Response) => {
  try {
    // console.info("info", req.body);
    // console.info("user", req.userId);

    const messageBody = req.body;

    const user = req.userId as string;

    if (!user) {
      throw new Error("User not found");
    }

    await ChatMessageService.sendTM(messageBody, user);

    res.status(201).json({ msg: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
export const sendIM = async (req: Request, res: Response) => {
  try {
    //console.info("info", req.body);
    // console.info("user", req.userId);

    const messageBody = req.body;

    const user = req.userId as string;

    if (!user) {
      throw new Error("User not found");
    }

    if (req.file) {
      const imgPath = req.file.filename;
      //console.info("imagen", imgPath);
      messageBody.message = imgPath;
    }

    await ChatMessageService.sendIM(messageBody, user);

    res.status(201).json({ msg: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chat;
    //console.log("mensajes", chatId);
    if (!chatId) {
      throw new Error("Chat not found");
    }
    //console.info("id: ", chatId);
    const { chatMessages, total } = await ChatMessageService.getMessages(
      chatId
    );

    //console.log("mensajes", messages);

    res.status(200).json({ chatMessages, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Reading Messages" });
  }
};
