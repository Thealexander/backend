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
class ChatService {
    createChat(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p_one = yield interfaces_1.Chat.findOne({
                    member_one: chat.member_one,
                    member_two: chat.member_two,
                });
                console.log("pone", p_one);
                const p_two = yield interfaces_1.Chat.findOne({
                    member_one: chat.member_two,
                    member_two: chat.member_one,
                });
                console.log("ptwo", p_two);
                if (p_one || !p_two) {
                    return { chatExists: true };
                }
                const { member_one, member_two } = yield interfaces_1.Chat.create(chat);
                console.log("info", { member_one, member_two });
                return { chat: { member_one, member_two } };
            }
            catch (error) {
                console.error("Error creating chat:", error);
                throw new Error("Error creating chat");
            }
        });
    }
    readChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield interfaces_1.Chat.find({
                    $or: [{ member_one: userId }, { member_two: userId }],
                })
                    .populate("member_one")
                    .populate("member_two");
                return chats;
            }
            catch (error) {
                console.error("Error reading chats:", error);
                throw new Error("Error reading chats");
            }
        });
    }
    deleteChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("chatid", chatId);
                const deletedChat = yield interfaces_1.Chat.findByIdAndDelete(chatId);
                return deletedChat;
            }
            catch (error) {
                console.error("Error deleting chat:", error);
                throw new Error("Error deleting chat");
            }
        });
    }
    readChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield interfaces_1.Chat.findById(chatId)
                    .populate("member_one")
                    .populate("member_two");
                if (!chat) {
                    throw new Error("Chat not found");
                }
                return { chat };
            }
            catch (error) {
                console.error("Error reading chat:", error);
                throw new Error("Error reading chat");
            }
        });
    }
}
exports.default = new ChatService();
//# sourceMappingURL=chats.service.js.map