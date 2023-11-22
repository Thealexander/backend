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
exports.sendCMessage = void 0;
const services_1 = require("../services");
const sendCMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.info("info", req.body);
        // console.info("user", req.userId);
        const messageBody = req.body;
        const user = req.userId;
        if (!user) {
            // Manejar el caso en el que req.userId es undefined
            throw new Error("User not found");
        }
        yield services_1.ChatMessageService.sendCMessage(messageBody, user);
        res.status(201).json({ msg: 'ok' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Message" });
    }
});
exports.sendCMessage = sendCMessage;
//export const sendImageMessage = async (req: Request, res: Response) => {};
//# sourceMappingURL=chatMessage.controller.js.map