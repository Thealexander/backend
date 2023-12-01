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
exports.glastMessage = exports.ggetTotalMessages = exports.ggetMessages = exports.gsendIM = exports.gsendTM = void 0;
const services_1 = require("../services");
const gsendTM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.info("info", req.body);
        console.info("user", req.userId);
        const messageBody = req.body;
        const user = req.userId;
        if (!user) {
            throw new Error("User not found");
        }
        yield services_1.groupMessagesServices.gsendTM(messageBody, user);
        res.status(201).json({ msg: "ok" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Message" });
    }
});
exports.gsendTM = gsendTM;
const gsendIM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield services_1.groupMessagesServices.gsendIM(messageBody, user);
        res.status(201).json({ msg: "ok" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Message" });
    }
});
exports.gsendIM = gsendIM;
const ggetMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = req.params.group;
        //console.log("mensajes", groupId);
        if (!groupId) {
            throw new Error("Group not found");
        }
        //console.info("id: ", groupId);
        const { groupMessages, total } = yield services_1.groupMessagesServices.ggetMessages(groupId);
        //console.log("mensajes", messages);
        res.status(200).json({ groupMessages, total });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Reading Messages" });
    }
});
exports.ggetMessages = ggetMessages;
const ggetTotalMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = req.params.group;
        if (!groupId) {
            throw new Error("Group not found");
        }
        const total = yield services_1.groupMessagesServices.ggetTotalMessages(groupId);
        res.status(200).json(total);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Reading Total Messages" });
    }
});
exports.ggetTotalMessages = ggetTotalMessages;
const glastMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.group;
    try {
        if (!groupId) {
            throw new Error("Group not found");
        }
        const lastMsg = yield services_1.groupMessagesServices.glastMessage(groupId);
        res.status(200).json(lastMsg || {});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error Reading Total Messages" });
    }
});
exports.glastMessage = glastMessage;
//# sourceMappingURL=groupMessages.controller.js.map