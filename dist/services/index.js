"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = exports.UserService = void 0;
const users_services_1 = __importDefault(require("./users.services"));
exports.UserService = users_services_1.default;
const chats_service_1 = __importDefault(require("./chats.service"));
exports.ChatService = chats_service_1.default;
//# sourceMappingURL=index.js.map