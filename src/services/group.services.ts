import { Group, IGroup, Users } from "../interfaces";
import fs from "fs-extra";
import path from "path";

class GroupService {
  async createGroup(newgroup: IGroup) {
    try {
      const { participants, image, creator, name } = newgroup;
      console.info("info", newgroup);
      participants.push({ user: creator });

      const group: IGroup = new Group({
        name,
        creator,
        participants,
        image,
      });
      const createdGroup = await Group.create(group);
      return createdGroup;
    } catch (error) {
      console.error("Error creating group:", error);
      throw new Error("Error creating group");
    }
  }

  async readsGroups(userId: string) {
    try {
      const myGroups = await Group.find({
        $or: [{ "participants.user": userId }, { creator: userId }],
      })
        .populate("creator")
        .populate("participants.user");
      return myGroups;
    } catch (error) {
      console.error("Error reading groups:", error);
      throw new Error("Error searching your groups");
    }
  }

  async getGroupInfo(groupId: string) {
    try {
      const mygroupinfo = await Group.findById(groupId);
      if (!mygroupinfo) return { error: "Group not found" };
      return mygroupinfo;
    } catch (error) {
      console.error("Error getting group info:", error);
      throw new Error("Error getting group info");
    }
  }

  async updateGroup(newUGroupData: IGroup, groupId: string) {
    try {
      const oldGroupData = await Group.findById(groupId);
      if (oldGroupData?.image) {
        const imagePath = path.resolve(
          __dirname,
          "../../src/Uploads/groups",
          oldGroupData?.image
        );
        await fs.unlink(imagePath);
      }
      const updGroup = await Group.findByIdAndUpdate(groupId, newUGroupData);
      return updGroup;
    } catch (error) {
      console.error("Error updating group:", error);
      throw new Error("Error updating group");
    }
  }

  async exitGroup(userId: string, groupId: string) {
    try {
      console.log("Group ID:", groupId);
      const group = await this.findGroupById(groupId);
      this.validateUserInGroup(group, userId);

      group.participants = group.participants.filter(
        (participant) => participant.user.toString() !== userId
      );
      await this.saveGroup(group);

      if (group.image && group.participants.length === 0) {
        await this.deleteImage(group.image);
      }
      return group;
    } catch (error) {
      console.error("Error exiting group:", error);
      throw new Error("Error exiting group");
    }
  }
  async addParticipants(
    groupId: string,
    participantIds: string[],
    userId: string
  ) {
    try {
      const bUGroup = await this.findGroupById(groupId);
      //console.log("info anterior de grupo: ", bUGroup);
      if (bUGroup.creator.toString() !== userId) {
        throw new Error("Only the group creator can add participants");
      }
      //console.info("existentes: ", bUGroup.participants);
      //console.info("nuevos: ", participantIds);

      const ngroup: IGroup = new Group({
        ...bUGroup._doc,
        participants: [...bUGroup.participants, ...participantIds],
      });
      const createdGroup = await Group.findByIdAndUpdate(groupId, ngroup);

      // console.info("grupo actualizado?:", ngroup);

      return createdGroup;
    } catch (error) {
      console.error("Error adding participants:", error);
      throw new Error("Error adding participants");
    }
  }
  async banParticipants(groupId: string, userId: string) {
    try {
      // console.info("data", { groupId, userId });

      const updateGroup = await this.findGroupById(groupId);

      updateGroup.participants = updateGroup.participants.filter(
        (participant) => participant.user.toString() !== userId
      );

      //  console.info("nueva data antes de guardar?", updateGroup);
      await this.saveGroup(updateGroup);
      return updateGroup;
    } catch (error) {
      // console.error("Error at the moment to try to ban an user:", error);
      throw new Error("Error banning an user");
    }
  }
  async outOftheGroup(groupId: string) {
    try {
      console.log("id", groupId);
      const group = await Group.findById(groupId);
      const participants =
        group?.participants?.map((participant) =>
          participant.user.toString()
        ) || [];
      const response = await Users.find({ _id: { $nin: participants } }).select(
        ["-password"]
      );

      if (!response) {
        return "no se encontro ningun usuario";
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }

  private async findGroupById(groupId: string) {
    try {
      if (groupId === "exit") {
        throw new Error("Invalid group ID");
      }
      const group = await Group.findById(groupId);
      if (!group) {
        throw new Error("Group not found");
      }
      return group;
    } catch (error) {
      console.error("Error finding group by ID:", error);
      throw new Error("Error finding group by ID");
    }
  }

  private validateUserInGroup(group: IGroup, userId: string) {
    const isUserInGroup = group.participants.some(
      (participant) => participant.user.toString() === userId
    );
    if (!isUserInGroup) {
      throw new Error("User is not part of the group");
    }
  }

  private async saveGroup(group: IGroup) {
    try {
      await group.save();
      return group;
    } catch (error) {
      console.error("Error saving group:", error);
      throw new Error("Error saving group");
    }
  }

  private async deleteImage(imagePath: string | undefined) {
    if (imagePath) {
      try {
        const fullPath = path.resolve(
          __dirname,
          "../../src/Uploads/groups",
          imagePath
        );
        await fs.unlink(fullPath);
        console.log("Image deleted:", fullPath);
      } catch (error) {
        console.error("Error deleting image:", error);
        throw new Error("Error deleting image");
      }
    }
  }
}

export default new GroupService();

/*
 async outOftheGroup(group: IGroup) {

    try{
      console.log('')
    }
    catch(error){
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }

  }
*/
