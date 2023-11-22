"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const socketServer_1 = require("../models/socketServer");
class ChatMessageService {
    sendCMessage(chatMessage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, chat } = chatMessage;
                const chat_id = chatMessage.chat.toString();
                const user = userId;
                // console.info("body", { message, chat, user });
                const chat_message = new interfaces_1.ChatMessage({
                    chat,
                    user,
                    message,
                    type: "TEXT",
                });
                yield interfaces_1.ChatMessage.create(chat_message);
                const dataUser = yield chat_message.populate("user");
                //console.info("user", dataUser);
                //sockets
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(chat_id).emit("message", dataUser);
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(`${chat_id}_notify`).emit("message_notify", dataUser);
                //console.log("Message sent:", chat_message);
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw new Error("Error sending message");
            }
        });
    }
}
exports.default = new ChatMessageService();
//# sourceMappingURL=chatMessages.services.js.map