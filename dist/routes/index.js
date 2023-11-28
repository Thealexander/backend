"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRoutes = exports.chatMessagesRoutes = exports.chatRoutes = exports.userRoutes = exports.authRoutes = void 0;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.authRoutes = auth_routes_1.default;
const user_routes_1 = __importDefault(require("./user.routes"));
exports.userRoutes = user_routes_1.default;
const chat_routes_1 = __importDefault(require("./chat.routes"));
exports.chatRoutes = chat_routes_1.default;
const chatMessage_routes_1 = __importDefault(require("./chatMessage.routes"));
exports.chatMessagesRoutes = chatMessage_routes_1.default;
const group_routes_1 = __importDefault(require("./group.routes"));
exports.groupRoutes = group_routes_1.default;
//# sourceMappingURL=index.js.map