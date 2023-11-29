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
    res.status(500).json({ error: "Error creating Group" });
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
    res.status(500).json({ error: "Error getting group info" });
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
    res.status(500).json({ error: "Error updating group" });
  }
};
export const exitGroup = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = req.userId as string;
    const groupId = req.params.groupId;

    const group = await groupServices.exitGroup(userId, groupId);

    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error exiting group" });
  }
};

export const addParticipants = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ error: "User not found" });
    }
    //console.info("groupId: ", req.params.groupId);
    //console.info("participants", req.body.participants);
    if (!req.params.groupId || !req.body.participants) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    const userId = req.userId as string;
    const groupId = req.params.groupId;
    const participants = req.body.participants.map((userId: string) => ({
      user: userId,
    }));
    // console.log("participantes", participants);

    const updatedGroup = await groupServices.addParticipants(
      groupId,
      participants,
      userId
    );

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding all participants" });
  }
};

export const banParticipants = async (req: Request, res: Response) => {
  try {
    //console.info("info:", req.body);
    if (!req.userId) {
      throw new Error("User not found");
    }

    const { groupId, userId } = req.body;

    // console.info("info", { groupId, userId });
    await groupServices.banParticipants(groupId, userId);

    res.status(200).json({ msg: "usuario baneado con exito" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Error banning user" });
  }
};

export const outOftheGroup = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error("User not found");
    }
    const { groupId } = req.params;

    const response = await groupServices.outOftheGroup(groupId);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
/*
export const outOftheGroup = async (req: Request, res: Response) => {

  try {
    res.status(200).json("test");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
*/
