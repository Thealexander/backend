import { Group, IGroup } from "../interfaces";
import fs from "fs-extra";
import path from "path";

class GroupService {
  async createGroup(newgroup: IGroup) {
    try {
      const { participants, image, creator, name } = newgroup;

      console.info("new group", participants);
      //TODO: reparar almacenamiento de imagen, no se guarda en la carpeta correcta
      const group: IGroup = new Group({
        name,
        creator,
        participants,
        image,
      });
      const createdGroup = await Group.create(group);
      return createdGroup;
      // console.log("group", group);
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }

  async readsGroups(userId: string) {
    try {
      const myGroups = await Group.find({
        $or: [{ "participants.user": userId }, { creator: userId }],
      })
        .populate("creator")
        .populate("participants.user");
      //console.log("grupos", myGroups);
      return myGroups;
    } catch (error) {
      console.error("Error reading groupds:", error);
      throw new Error("Error searching your groups");
    }
  }
  async getGroupInfo(groupId: string) {
    try {
      const mygroupinfo = await Group.findById(groupId);
      if (!mygroupinfo) return { error: "Group not found" };

      //console.info("grupo:", mygroupinfo);
      return mygroupinfo;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }

  async updateGroup(newUGroupData: IGroup, groupId: string) {
    try {
      const oldGroupData = await Group.findById(groupId);
      console.log("data anterior", oldGroupData);
      //TODO: verificar la carpeta en donde se almacena las imagenes
      if (oldGroupData?.image) {
        const imagePath = path.resolve(
          __dirname,
          "../../src/Uploads/groups",
          oldGroupData?.image
        );
        await fs.unlink(imagePath);
        console.log("Ruta del archivo a eliminar:", imagePath);
      }
      console.log("data nueva", newUGroupData);
      const updGroup = await Group.findByIdAndUpdate(groupId, newUGroupData);
      return updGroup;
    } catch (error) {
      console.error("Error updating group:", error);
      throw new Error("Error updating group");
    }
  }

  async exitGroup(userId: string, groupId: string) {
    try {
      const group = await Group.findById(groupId);

      if (!group) {
        throw new Error("Group not found");
      }
      const isUserInGroup = group.participants.some(
        (participant) => participant.user.toString() === userId
      );

      if (!isUserInGroup) {
        throw new Error("User is not part of the group");
      }

      group.participants = group.participants.filter(
        (participant) => participant.user.toString() !== userId
      );

      await group.save();

      return group;
    } catch (error) {
      console.error("Error exiting group:", error);
      throw new Error("Error exiting group");
    }
  }
}

export default new GroupService();

/*
 async exitGroup(group: IGroup) {

    try{
      console.log('')
    }
    catch(error){
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }

  }
*/
