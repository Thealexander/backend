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
exports.readChat = exports.deleteChat = exports.readChats = exports.createChat = void 0;
const services_1 = require("../services");
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChatResponse = yield services_1.ChatService.createChat(req.body);
        console.log("existe?", newChatResponse.chatExists);
        if (!newChatResponse.chatExists) {
            const newChat = newChatResponse.chat;
            console.log("info", newChat);
            res.status(201).json(newChat);
        }
        else {
            return res
                .status(200)
                .json({ msg: "Ya existe un chat de ambos usuarios" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating New Chat" });
    }
});
exports.createChat = createChat;
const readChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Asegúrate de tener esta ruta definida en tu archivo de rutas
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const chats = yield services_1.ChatService.readChats(userId);
        res.status(200).json(chats);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error reading chats" });
    }
});
exports.readChats = readChats;
const deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.info("chat req id", req.params.id);
        const chatId = req.params.id; // Asegúrate de tener esta ruta definida en tu archivo de rutas
        yield services_1.ChatService.deleteChat(chatId);
        res.status(200).json({ msg: "chat eliminado" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting chat" });
    }
});
exports.deleteChat = deleteChat;
const readChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Asumo que tienes el userId almacenado en req.userId
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const chatId = req.params.id;
        console.info("chat req id", req.params.id);
        const result = yield services_1.ChatService.readChat(chatId);
        const chat = result.chat;
        res.status(200).json({ chat });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error reading chat" });
    }
});
exports.readChat = readChat;
//# sourceMappingURL=chat.controller.js.map