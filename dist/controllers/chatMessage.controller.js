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
exports.lastMessage = exports.getTotalMessages = exports.getMessages = exports.sendIM = exports.sendTM = void 0;
const services_1 = require("../services");
const sendTM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.info("info", req.body);
        // console.info("user", req.userId);
        const messageBody = req.body;
        const user = req.userId;
        if (!user) {
            throw new Error("User not found");
        }
        yield services_1.ChatMessageService.sendTM(messageBody, user);
        res.status(201).json({ msg: "ok" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Message" });
    }
});
exports.sendTM = sendTM;
const sendIM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.info("info", req.body);
        // console.info("user", req.userId);
        const messageBody = req.body;
        const user = req.userId;
        if (!user) {
            throw new Error("User not found");
        }
        if (req.file) {
            const imgPath = req.file.filename;
            //console.info("imagen", imgPath);
            messageBody.message = imgPath;
        }
        yield services_1.ChatMessageService.sendIM(messageBody, user);
        res.status(201).json({ msg: "ok" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Message" });
    }
});
exports.sendIM = sendIM;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.params.chat;
        //console.log("mensajes", chatId);
        if (!chatId) {
            throw new Error("Chat not found");
        }
        //console.info("id: ", chatId);
        const { chatMessages, total } = yield services_1.ChatMessageService.getMessages(chatId);
        //console.log("mensajes", messages);
        res.status(200).json({ chatMessages, total });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Reading Messages" });
    }
});
exports.getMessages = getMessages;
const getTotalMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.params.chat;
        if (!chatId) {
            throw new Error("Chat not found");
        }
        const total = yield services_1.ChatMessageService.getTotalMessages(chatId);
        res.status(200).json(total);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Reading Total Messages" });
    }
});
exports.getTotalMessages = getTotalMessages;
const lastMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = req.params.chat;
    try {
        if (!chatId) {
            throw new Error("Chat not found");
        }
        const lastMsg = yield services_1.ChatMessageService.lastMessage(chatId);
        res.status(200).json(lastMsg || {});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Reading Total Messages" });
    }
});
exports.lastMessage = lastMessage;
//# sourceMappingURL=chatMessage.controller.js.map