import { GroupMessage, IGroupMessage } from "../interfaces";
import { io } from "../models/socketServer";

class GroupMessageServices {
  async gsendTM(gMessage: IGroupMessage, userId: string) {
    try {
      const { message, group } = gMessage;
      const group_id = gMessage.group.toString();
      const user = userId;
       console.info("body", { message, group_id, user });

      const g_message: IGroupMessage = new GroupMessage({
        group,
        user,
        message,
        type: "TEXT",
      });

      await GroupMessage.create(g_message);
      const dataUser = await g_message.populate("user");

      io?.sockets.in(group_id).emit("message", dataUser);
      io?.sockets.in(`${group_id}_notify`).emit("message_notify", dataUser);
      //console.log("Message sent:", chat_message);
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }

  async gsendIM(gMessage: IGroupMessage, userId: string) {
    try {
      const { message, group } = gMessage;
      const group_id = gMessage.group.toString();
      const user = userId;
      //console.info("body", { message, group_id, user });
      //console.log("Message sent:", group_id);
      const g_message: IGroupMessage = new GroupMessage({
        group,
        user,
        message,
        type: "IMAGE",
      });
      //console.log("Message sent:", chat_message);

      await GroupMessage.create(g_message);
      const dataUser = await g_message.populate("user");

      io?.sockets.in(group_id).emit("message", dataUser);
      io?.sockets.in(`${group_id}_notify`).emit("message_notify", dataUser);
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }
  async ggetMessages(groupId: string) {
    // console.info("id", group_id);
    try {
      const gMessages = await GroupMessage.find({ group: groupId })
        .sort({
          createdAt: 1,
        })
        .populate("user");
      const total = await GroupMessage.find({
        group: groupId,
      }).countDocuments();
      //console.info("chatBdy", chatMessages);
      return { groupMessages: gMessages, total };
    } catch (error) {
      console.error("Error reading messages:", error);
      throw new Error("Error reading Messages");
    }
  }

  async ggetTotalMessages(groupId: string) {
    try {
      const total = await GroupMessage.find({
        group: groupId,
      }).countDocuments();
      return total;
    } catch (error) {
      console.error("Error reading Total messages:", error);
      throw new Error("Error reading Total Messages");
    }
  }
  async glastMessage(groupId: string) {
    try {
      const lastMsg = await GroupMessage.findOne({ group: groupId }).sort({
        createdAt: -1,
      });
      return lastMsg;
    } catch (error) {
      console.error("Error reading Total messages:", error);
      throw new Error("Error reading Total Messages");
    }
  }
}

export default new GroupMessageServices();
