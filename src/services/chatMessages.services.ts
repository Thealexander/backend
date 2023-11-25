import { IChatMessage, ChatMessage } from "../interfaces";
import { io } from "../models/socketServer";

class ChatMessageService {
  async sendTM(chatMessage: IChatMessage, userId: string) {
    try {
      const { message, chat } = chatMessage;
      const chat_id = chatMessage.chat.toString();
      const user = userId;
      // console.info("body", { message, chat, user });

      const chat_message: IChatMessage = new ChatMessage({
        chat,
        user,
        message,
        type: "TEXT",
      });

      await ChatMessage.create(chat_message);
      const dataUser = await chat_message.populate("user");

      io?.sockets.in(chat_id).emit("message", dataUser);
      io?.sockets.in(`${chat_id}_notify`).emit("message_notify", dataUser);
      //console.log("Message sent:", chat_message);
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }

  async sendIM(chatMessage: IChatMessage, userId: string) {
    try {
      const { message, chat } = chatMessage;
      const chat_id = chatMessage.chat.toString();
      const user = userId;
      //console.info("body", { message, chat, user });
      console.log("Message sent:", chat_id);
      const chat_message: IChatMessage = new ChatMessage({
        chat,
        user,
        message,
        type: "IMAGE",
      });
      console.log("Message sent:", chat_message);

      await ChatMessage.create(chat_message);
      const dataUser = await chat_message.populate("user");

      io?.sockets.in(chat_id).emit("message", dataUser);
      io?.sockets.in(`${chat_id}_notify`).emit("message_notify", dataUser);
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }
  async getMessages(chatId: string) {
    // console.info("id", chatId);
    try {
      const chatMessages = await ChatMessage.find({ chat: chatId })
        .sort({
          createdAt: 1,
        })
        .populate("user");
      const total = await ChatMessage.find({ chat: chatId }).countDocuments();
      //console.info("chatBdy", chatMessages);
      return { chatMessages, total };
    } catch (error) {
      console.error("Error reading messages:", error);
      throw new Error("Error reading Messages");
    }
  }

  async getTotalMessages(chatId: string) {
    try {
      const total = await ChatMessage.find({ chat: chatId }).countDocuments();
      return total;
    } catch (error) {
      console.error("Error reading Total messages:", error);
      throw new Error("Error reading Total Messages");
    }
  }
  async lastMessage(chatId: string) {
    try {
      const lastMsg = await ChatMessage.findOne({ chat: chatId }).sort({
        createdAt: -1,
      });
      return lastMsg;
    } catch (error) {
      console.error("Error reading Total messages:", error);
      throw new Error("Error reading Total Messages");
    }
  }
}

export default new ChatMessageService();
