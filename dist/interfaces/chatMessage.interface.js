"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChatMessageSchema = new mongoose_1.default.Schema({
    chat: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Chats",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["TEXT", "IMAGE"],
    },
}, {
    timestamps: true,
});
const ChatMessage = mongoose_1.default.model("ChatMessages", ChatMessageSchema);
exports.default = ChatMessage;
//# sourceMappingURL=chatMessage.interface.js.map