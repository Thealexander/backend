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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
                if (p_one || p_two) {
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
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield interfaces_1.Chat.find({
                    $or: [{ member_one: userId }, { member_two: userId }],
                })
                    .populate("member_one")
                    .populate("member_two");
                const arraysChat = [];
                try {
                    for (var _d = true, chats_1 = __asyncValues(chats), chats_1_1; chats_1_1 = yield chats_1.next(), _a = chats_1_1.done, !_a; _d = true) {
                        _c = chats_1_1.value;
                        _d = false;
                        const chat = _c;
                        const response = yield interfaces_1.ChatMessage.findOne({ chat: chat._id }).sort({
                            createdAt: -1,
                        });
                        arraysChat.push(Object.assign(Object.assign({}, chat._doc), { lastMessage_date: (response === null || response === void 0 ? void 0 : response.createdAt) || null }));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = chats_1.return)) yield _b.call(chats_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return arraysChat;
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