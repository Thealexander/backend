import { Chat, IChat, ChatMessage } from "../interfaces";

class ChatService {
  async createChat(chat: IChat) {
    try {
      const p_one = await Chat.findOne({
        member_one: chat.member_one,
        member_two: chat.member_two,
      });
      console.log("pone", p_one);

      const p_two = await Chat.findOne({
        member_one: chat.member_two,
        member_two: chat.member_one,
      });

      console.log("ptwo", p_two);
      if (p_one || p_two) {
        return { chatExists: true };
      }
      const { member_one, member_two } = await Chat.create(chat);
      console.log("info", { member_one, member_two });

      return { chat: { member_one, member_two } };
    } catch (error) {
      console.error("Error creating chat:", error);
      throw new Error("Error creating chat");
    }
  }

  async readChats(userId: string) {
    try {
      const chats = await Chat.find({
        $or: [{ member_one: userId }, { member_two: userId }],
      })
        .populate("member_one")
        .populate("member_two");

      const arraysChat = [];
      for await (const chat of chats) {
        const response = await ChatMessage.findOne({ chat: chat._id }).sort({
          createdAt: -1,
        });
        arraysChat.push({
          ...chat._doc,
          lastMessage_date: response?.createdAt || null,
        });
      }
      return arraysChat;
    } catch (error) {
      console.error("Error reading chats:", error);
      throw new Error("Error reading chats");
    }
  }

  async deleteChat(chatId: string) {
    try {
      console.log("chatid", chatId);
      const deletedChat = await Chat.findByIdAndDelete(chatId);
      return deletedChat;
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw new Error("Error deleting chat");
    }
  }

  async readChat(chatId: string) {
    try {
      const chat = await Chat.findById(chatId)
        .populate("member_one")
        .populate("member_two");

      if (!chat) {
        throw new Error("Chat not found");
      }

      return { chat };
    } catch (error) {
      console.error("Error reading chat:", error);
      throw new Error("Error reading chat");
    }
  }
}

export default new ChatService();
