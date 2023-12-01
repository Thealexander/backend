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
class GroupMessageServices {
    gsendTM(gMessage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, group } = gMessage;
                const group_id = gMessage.group.toString();
                const user = userId;
                console.info("body", { message, group_id, user });
                const g_message = new interfaces_1.GroupMessage({
                    group,
                    user,
                    message,
                    type: "TEXT",
                });
                yield interfaces_1.GroupMessage.create(g_message);
                const dataUser = yield g_message.populate("user");
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(group_id).emit("message", dataUser);
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(`${group_id}_notify`).emit("message_notify", dataUser);
                //console.log("Message sent:", chat_message);
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw new Error("Error sending message");
            }
        });
    }
    gsendIM(gMessage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, group } = gMessage;
                const group_id = gMessage.group.toString();
                const user = userId;
                //console.info("body", { message, group_id, user });
                //console.log("Message sent:", group_id);
                const g_message = new interfaces_1.GroupMessage({
                    group,
                    user,
                    message,
                    type: "IMAGE",
                });
                //console.log("Message sent:", chat_message);
                yield interfaces_1.GroupMessage.create(g_message);
                const dataUser = yield g_message.populate("user");
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(group_id).emit("message", dataUser);
                socketServer_1.io === null || socketServer_1.io === void 0 ? void 0 : socketServer_1.io.sockets.in(`${group_id}_notify`).emit("message_notify", dataUser);
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw new Error("Error sending message");
            }
        });
    }
    ggetMessages(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.info("id", group_id);
            try {
                const gMessages = yield interfaces_1.GroupMessage.find({ group: groupId })
                    .sort({
                    createdAt: 1,
                })
                    .populate("user");
                const total = yield interfaces_1.GroupMessage.find({
                    group: groupId,
                }).countDocuments();
                //console.info("chatBdy", chatMessages);
                return { groupMessages: gMessages, total };
            }
            catch (error) {
                console.error("Error reading messages:", error);
                throw new Error("Error reading Messages");
            }
        });
    }
    ggetTotalMessages(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield interfaces_1.GroupMessage.find({
                    group: groupId,
                }).countDocuments();
                return total;
            }
            catch (error) {
                console.error("Error reading Total messages:", error);
                throw new Error("Error reading Total Messages");
            }
        });
    }
    glastMessage(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastMsg = yield interfaces_1.GroupMessage.findOne({ group: groupId }).sort({
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
exports.default = new GroupMessageServices();
//# sourceMappingURL=groupMessages.services.js.map