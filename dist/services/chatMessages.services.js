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
    sendTM(chatMessage, userId) {
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
    sendIM(chatMessage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, chat } = chatMessage;
                const chat_id = chatMessage.chat.toString();
                const user = userId;
                //console.info("body", { message, chat, user });
                //console.log("Message sent:", chat_id);
                const chat_message = new interfaces_1.ChatMessage({
                    chat,
                    user,
                    message,
                    type: "IMAGE",
                });
                //console.log("Message sent:", chat_message);
                yield interfaces_1.ChatMessage.create(chat_message);
                const dataUser = yield chat_message.populate("user");
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(chat_id).emit("message", dataUser);
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(`${chat_id}_notify`).emit("message_notify", dataUser);
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw new Error("Error sending message");
            }
        });
    }
    getMessages(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.info("id", chatId);
            try {
                const chatMessages = yield interfaces_1.ChatMessage.find({ chat: chatId })
                    .sort({
                    createdAt: 1,
                })
                    .populate("user");
                const total = yield interfaces_1.ChatMessage.find({ chat: chatId }).countDocuments();
                //console.info("chatBdy", chatMessages);
                return { chatMessages, total };
            }
            catch (error) {
                console.error("Error reading messages:", error);
                throw new Error("Error reading Messages");
            }
        });
    }
    getTotalMessages(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield interfaces_1.ChatMessage.find({ chat: chatId }).countDocuments();
                return total;
            }
            catch (error) {
                console.error("Error reading Total messages:", error);
                throw new Error("Error reading Total Messages");
            }
        });
    }
    lastMessage(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastMsg = yield interfaces_1.ChatMessage.findOne({ chat: chatId }).sort({
                    createdAt: -1,
                });
                return lastMsg;
            }
            catch (error) {
                console.error("Error reading Total messages:", error);
                throw new Error("Error reading Total Messages");
            }
        });
    }
}
exports.default = new ChatMessageService();
//# sourceMappingURL=chatMessages.services.js.map