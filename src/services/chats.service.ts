import { Chat, IChat } from "../interfaces";
class ChatService {
  async createChat(chat: IChat) {
    try {
      const { member_one, member_two } = await Chat.create(chat);

      const p_one = await Chat.findOne({
        p_o: member_one,
        p_t: member_two,
      });
      const p_two = await Chat.findOne({
        p_o: member_two,
        p_t: member_one,
      });

      if (p_one || p_two) {
        throw new Error("Ya existe un chat de ambos users");
      }
      return { chat: { member_one, member_two } };
    } catch (error) {
      console.error("Error creating chat:", error);
      throw new Error("Error creating chat");
    }
  }
}

export default new ChatService();
