import { Request, Response } from "express";
import { ChatMessageService } from "../services";


export const sendCMessage = async (req: Request, res: Response) => {
  try {
   // console.info("info", req.body);
   // console.info("user", req.userId);

    const messageBody = req.body;
    
    const user  = req.userId as string;

    if (!user) {
      // Manejar el caso en el que req.userId es undefined
      throw new Error("User not found");
    }

    await ChatMessageService.sendCMessage(messageBody, user);

    res.status(201).json({msg:'ok'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
//export const sendImageMessage = async (req: Request, res: Response) => {};
