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
exports.exitGroup = exports.updateGroup = exports.getGroupInfo = exports.readsGroups = exports.createGroup = void 0;
const services_1 = require("../services");
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            throw new Error("User not found");
        }
        const newgroup = req.body;
        newgroup.creator = req.userId;
        newgroup.participants = JSON.parse(req.body.participants).map((userId) => ({ user: userId }));
        if (req.file) {
            newgroup.image = req.file.filename;
        }
        // console.log("controlador", { newgroup  });
        const createdGroup = yield services_1.groupServices.createGroup(newgroup);
        res.status(200).json(createdGroup);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Group" });
    }
});
exports.createGroup = createGroup;
const readsGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            throw new Error("User not found");
        }
        const userId = req.userId;
        const myGroups = yield services_1.groupServices.readsGroups(userId);
        res.status(200).json(myGroups);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error searching your groups" });
    }
});
exports.readsGroups = readsGroups;
const getGroupInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            throw new Error("User not found");
        }
        if (!req.params.groupId) {
            throw new Error("Grupo doesn't find");
        }
        const groupId = req.params.groupId;
        const myGroupInfo = yield services_1.groupServices.getGroupInfo(groupId);
        res.status(200).json(myGroupInfo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting group info" });
    }
});
exports.getGroupInfo = getGroupInfo;
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            throw new Error("User not found");
        }
        if (!req.params.groupId) {
            throw new Error("Grupo not found");
        }
        const newUGroupData = req.body;
        const groupId = req.params.groupId;
        if (req.file) {
            const imgPath = req.file.filename;
            newUGroupData.imgGroup = imgPath;
        }
        console.log("info", newUGroupData, groupId);
        const updGroup = yield services_1.groupServices.updateGroup(newUGroupData, groupId);
        res.status(200).json(updGroup);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating group" });
    }
});
exports.updateGroup = updateGroup;
const exitGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(404).json({ error: "User not found" });
        }
        const userId = req.userId;
        const groupId = req.params.groupId;
        const group = yield services_1.groupServices.exitGroup(userId, groupId);
        res.status(200).json(group);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error exiting group" });
    }
});
exports.exitGroup = exitGroup;
/*
export const exitGroup = async (req: Request, res: Response) => {

  try {
    res.status(200).json("test");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Message" });
  }
};
*/
//# sourceMappingURL=group.controller.js.map