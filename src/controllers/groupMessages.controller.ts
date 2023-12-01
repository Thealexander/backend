import { Request, Response } from "express";
import { groupMessagesServices } from "../services";


export const gsendTM = async (req: Request, res: Response) => {
  try {
     console.info("info", req.body);
     console.info("user", req.userId);

    const messageBody = req.body;

    const user = req.userId as string;

    if (!user) {
      throw new Error("User not found");
    }

    await groupMessagesServices.gsendTM(messageBody, user);

    res.status(201).json({ msg: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
export const gsendIM = async (req: Request, res: Response) => {
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

    await groupMessagesServices.gsendIM(messageBody, user);

    res.status(201).json({ msg: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
export const ggetMessages = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.group;
    //console.log("mensajes", groupId);
    if (!groupId) {
      throw new Error("Group not found");
    }
    //console.info("id: ", groupId);
    const { groupMessages, total } = await groupMessagesServices.ggetMessages(
      groupId
    );

    //console.log("mensajes", messages);

    res.status(200).json({ groupMessages, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Reading Messages" });
  }
};

export const ggetTotalMessages = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.group;

    if (!groupId) {
      throw new Error("Group not found");
    }
    const total = await groupMessagesServices.ggetTotalMessages(groupId);
    res.status(200).json(total);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Reading Total Messages" });
  }
};

export const glastMessage = async (req: Request, res: Response) => {
  const groupId = req.params.group;
  try {
    if (!groupId) {
      throw new Error("Group not found");
    }
    const lastMsg = await groupMessagesServices.glastMessage(groupId);
    res.status(200).json(lastMsg || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Reading Total Messages" });
  }
};
