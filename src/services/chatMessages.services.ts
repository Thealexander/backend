import { IChatMessage, ChatMessage } from "../interfaces";
 

 

 class ChatMessageService {
    async sendCMessage(chatMessage: IChatMessage) {
      try{
         const message=  await ChatMessage.create(chatMessage)
         console.log(message);
      }
      catch(error){
         console.error("Error sending message:", error);
         throw new Error("Error sending message");
      }


    }

    async readCMessage(cmessageId: string) {}


 }

 export default new ChatMessageService();