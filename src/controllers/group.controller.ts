import { Request, Response } from "express";
import { groupServices } from "../services";

export const createGroup = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error("User not found");
    }
    const newgroup = req.body;
    newgroup.creator = req.userId as string;
    newgroup.participants = JSON.parse(req.body.participants).map(
      (userId: string) => ({ user: userId })
    );

    if (req.file) {
      newgroup.image = req.file.filename;
    }
    // console.log("controlador", { newgroup  });

    const createdGroup = await groupServices.createGroup(newgroup);

    res.status(200).json(createdGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
export const readsGroups = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error("User not found");
    }
    const userId = req.userId as string;
    const myGroups = await groupServices.readsGroups(userId);
    res.status(200).json(myGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error searching your groups" });
  }
};
export const getGroupInfo = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error("User not found");
    }
    if (!req.params.groupId) {
      throw new Error("Grupo doesn't find");
    }
    const groupId = req.params.groupId;
    const myGroupInfo = await groupServices.getGroupInfo(groupId);
    res.status(200).json(myGroupInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error("User not found");
    }
    if (!req.params.groupId) {
      throw new Error("Grupo not found");
    }
    const newUGroupData = req.body;
    const groupId = req.params.groupId;

    if (req.file) {
      const imgPath = req.file.filename;
      newUGroupData.imgGroup = imgPath;
    }
    console.log("info", newUGroupData, groupId);

    const updGroup = await groupServices.updateGroup(newUGroupData, groupId);

    res.status(200).json(updGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
export const exitGroup = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error("User not found");
    }

    const userId = req.userId as string;
    const groupId = req.params.groupId;

    const updatedGroup = await groupServices.exitGroup(userId, groupId);

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error exiting group" });
  }
};
/*
export const exitGroup = async (req: Request, res: Response) => {

  try {
    res.status(200).json("test");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
*/
