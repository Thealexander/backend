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
                const { member_one, member_two } = yield interfaces_1.Chat.create(chat);
                const p_one = yield interfaces_1.Chat.findOne({
                    p_o: member_one,
                    p_t: member_two,
                });
                const p_two = yield interfaces_1.Chat.findOne({
                    p_o: member_two,
                    p_t: member_one,
                });
                if (p_one || p_two) {
                    throw new Error("Ya existe un chat de ambos users");
                }
                return { chat: { member_one, member_two } };
            }
            catch (error) {
                console.error("Error creating chat:", error);
                throw new Error("Error creating chat");
            }
        });
    }
}
exports.default = new ChatService();
//# sourceMappingURL=chats.service.js.map