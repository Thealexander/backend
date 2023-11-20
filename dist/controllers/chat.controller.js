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
exports.createChat = void 0;
const services_1 = require("../services");
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChatResponse = yield services_1.ChatService.createChat(req.body);
        const newChat = newChatResponse.chat;
        console.log('test', newChat);
        res.status(201).json(newChat);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating New Chat" });
    }
});
exports.createChat = createChat;
//# sourceMappingURL=chat.controller.js.map