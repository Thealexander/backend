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
                console.info("new group", participants);
                //TODO: reparar almacenamiento de imagen, no se guarda en la carpeta correcta
                const group = new interfaces_1.Group({
                    name,
                    creator,
                    participants,
                    image,
                });
                const createdGroup = yield interfaces_1.Group.create(group);
                return createdGroup;
                // console.log("group", group);
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw new Error("Error sending message");
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
                //console.log("grupos", myGroups);
                return myGroups;
            }
            catch (error) {
                console.error("Error reading groupds:", error);
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
                //console.info("grupo:", mygroupinfo);
                return mygroupinfo;
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw new Error("Error sending message");
            }
        });
    }
    updateGroup(newUGroupData, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldGroupData = yield interfaces_1.Group.findById(groupId);
                console.log("data anterior", oldGroupData);
                //TODO: verificar la carpeta en donde se almacena las imagenes
                if (oldGroupData === null || oldGroupData === void 0 ? void 0 : oldGroupData.image) {
                    const imagePath = path_1.default.resolve(__dirname, "../../src/Uploads/groups", oldGroupData === null || oldGroupData === void 0 ? void 0 : oldGroupData.image);
                    yield fs_extra_1.default.unlink(imagePath);
                    console.log("Ruta del archivo a eliminar:", imagePath);
                }
                console.log("data nueva", newUGroupData);
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
                const group = yield interfaces_1.Group.findById(groupId);
                if (!group) {
                    throw new Error("Group not found");
                }
                const isUserInGroup = group.participants.some((participant) => participant.user.toString() === userId);
                if (!isUserInGroup) {
                    throw new Error("User is not part of the group");
                }
                group.participants = group.participants.filter((participant) => participant.user.toString() !== userId);
                yield group.save();
                return group;
            }
            catch (error) {
                console.error("Error exiting group:", error);
                throw new Error("Error exiting group");
            }
        });
    }
}
exports.default = new GroupService();
/*
 async exitGroup(group: IGroup) {

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