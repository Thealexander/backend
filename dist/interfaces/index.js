"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMessage = exports.Group = exports.Chat = exports.ChatMessage = exports.Users = void 0;
const users_interface_1 = __importDefault(require("./users.interface"));
exports.Users = users_interface_1.default;
const chat_interface_1 = __importDefault(require("./chat.interface"));
exports.Chat = chat_interface_1.default;
const chatMessage_interface_1 = __importDefault(require("./chatMessage.interface"));
exports.ChatMessage = chatMessage_interface_1.default;
const group_interface_1 = __importDefault(require("./group.interface"));
exports.Group = group_interface_1.default;
const groupMessages_interface_1 = __importDefault(require("./groupMessages.interface"));
exports.GroupMessage = groupMessages_interface_1.default;
//# sourceMappingURL=index.js.map