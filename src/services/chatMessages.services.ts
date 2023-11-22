import { IChatMessage, ChatMessage } from "../interfaces";
import { io } from "../models/socketServer";

class ChatMessageService {
  async sendCMessage(chatMessage: IChatMessage, userId: string) {
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

      //console.info("user", dataUser);
      //sockets
      io?.sockets.in(chat_id).emit("message", dataUser);
      io?.sockets.in(`${chat_id}_notify`).emit("message_notify", dataUser);
      //console.log("Message sent:", chat_message);
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  }

  //    async sendImageMessage(cmessageId: string) {}
}

export default new ChatMessageService();
