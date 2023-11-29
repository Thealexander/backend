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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class GroupService {
    createGroup(newgroup) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { participants, image, creator, name } = newgroup;
                console.info("info", newgroup);
                participants.push({ user: creator });
                const group = new interfaces_1.Group({
                    name,
                    creator,
                    participants,
                    image,
                });
                const createdGroup = yield interfaces_1.Group.create(group);
                return createdGroup;
            }
            catch (error) {
                console.error("Error creating group:", error);
                throw new Error("Error creating group");
            }
        });
    }
    readsGroups(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myGroups = yield interfaces_1.Group.find({
                    $or: [{ "participants.user": userId }, { creator: userId }],
                })
                    .populate("creator")
                    .populate("participants.user");
                return myGroups;
            }
            catch (error) {
                console.error("Error reading groups:", error);
                throw new Error("Error searching your groups");
            }
        });
    }
    getGroupInfo(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mygroupinfo = yield interfaces_1.Group.findById(groupId);
                if (!mygroupinfo)
                    return { error: "Group not found" };
                return mygroupinfo;
            }
            catch (error) {
                console.error("Error getting group info:", error);
                throw new Error("Error getting group info");
            }
        });
    }
    updateGroup(newUGroupData, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldGroupData = yield interfaces_1.Group.findById(groupId);
                if (oldGroupData === null || oldGroupData === void 0 ? void 0 : oldGroupData.image) {
                    const imagePath = path_1.default.resolve(__dirname, "../../src/Uploads/groups", oldGroupData === null || oldGroupData === void 0 ? void 0 : oldGroupData.image);
                    yield fs_extra_1.default.unlink(imagePath);
                }
                const updGroup = yield interfaces_1.Group.findByIdAndUpdate(groupId, newUGroupData);
                return updGroup;
            }
            catch (error) {
                console.error("Error updating group:", error);
                throw new Error("Error updating group");
            }
        });
    }
    exitGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Group ID:", groupId);
                const group = yield this.findGroupById(groupId);
                this.validateUserInGroup(group, userId);
                group.participants = group.participants.filter((participant) => participant.user.toString() !== userId);
                yield this.saveGroup(group);
                if (group.image && group.participants.length === 0) {
                    yield this.deleteImage(group.image);
                }
                return group;
            }
            catch (error) {
                console.error("Error exiting group:", error);
                throw new Error("Error exiting group");
            }
        });
    }
    addParticipants(groupId, participantIds, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bUGroup = yield this.findGroupById(groupId);
                //console.log("info anterior de grupo: ", bUGroup);
                if (bUGroup.creator.toString() !== userId) {
                    throw new Error("Only the group creator can add participants");
                }
                //console.info("existentes: ", bUGroup.participants);
                //console.info("nuevos: ", participantIds);
                const ngroup = new interfaces_1.Group(Object.assign(Object.assign({}, bUGroup._doc), { participants: [...bUGroup.participants, ...participantIds] }));
                const createdGroup = yield interfaces_1.Group.findByIdAndUpdate(groupId, ngroup);
                // console.info("grupo actualizado?:", ngroup);
                return createdGroup;
            }
            catch (error) {
                console.error("Error adding participants:", error);
                throw new Error("Error adding participants");
            }
        });
    }
    banParticipants(groupId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.info("data", { groupId, userId });
                const updateGroup = yield this.findGroupById(groupId);
                updateGroup.participants = updateGroup.participants.filter((participant) => participant.user.toString() !== userId);
                //  console.info("nueva data antes de guardar?", updateGroup);
                yield this.saveGroup(updateGroup);
                return updateGroup;
            }
            catch (error) {
                // console.error("Error at the moment to try to ban an user:", error);
                throw new Error("Error banning an user");
            }
        });
    }
    outOftheGroup(groupId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("id", groupId);
                const group = yield interfaces_1.Group.findById(groupId);
                const participants = ((_a = group === null || group === void 0 ? void 0 : group.participants) === null || _a === void 0 ? void 0 : _a.map((participant) => participant.user.toString())) || [];
                const response = yield interfaces_1.Users.find({ _id: { $nin: participants } }).select(["-password"]);
                if (!response) {
                    return "no se encontro ningun usuario";
                }
                else {
                    return response;
                }
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw new Error("Error sending message");
            }
        });
    }
    findGroupById(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (groupId === "exit") {
                    throw new Error("Invalid group ID");
                }
                const group = yield interfaces_1.Group.findById(groupId);
                if (!group) {
                    throw new Error("Group not found");
                }
                return group;
            }
            catch (error) {
                console.error("Error finding group by ID:", error);
                throw new Error("Error finding group by ID");
            }
        });
    }
    validateUserInGroup(group, userId) {
        const isUserInGroup = group.participants.some((participant) => participant.user.toString() === userId);
        if (!isUserInGroup) {
            throw new Error("User is not part of the group");
        }
    }
    saveGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield group.save();
                return group;
            }
            catch (error) {
                console.error("Error saving group:", error);
                throw new Error("Error saving group");
            }
        });
    }
    deleteImage(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (imagePath) {
                try {
                    const fullPath = path_1.default.resolve(__dirname, "../../src/Uploads/groups", imagePath);
                    yield fs_extra_1.default.unlink(fullPath);
                    console.log("Image deleted:", fullPath);
                }
                catch (error) {
                    console.error("Error deleting image:", error);
                    throw new Error("Error deleting image");
                }
            }
        });
    }
}
exports.default = new GroupService();
/*
 async outOftheGroup(group: IGroup) {

    try{
      console.log('')
    }
    catch(error){
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }

  }
*/
//# sourceMappingURL=group.services.js.map