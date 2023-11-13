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
exports.updateOwnProfile = exports.getMe = exports.deleteUser = exports.updateUser = exports.createUser = exports.readUser = exports.readAllUsers = void 0;
const services_1 = require("../services");
const readAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const allUsers = yield services_1.UserService.readAllUsers(userId);
        res.json(allUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error reading all users" });
    }
});
exports.readAllUsers = readAllUsers;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params._id;
    //console.log("id_controller", userId);
    try {
        const user = yield services_1.UserService.readUser(userId);
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "User not found" });
    }
});
exports.readUser = readUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log("body", req.body);
        const newUserResponse = yield services_1.UserService.createUser(req.body);
        const newUser = newUserResponse.user;
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating user" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params._id;
    try {
        const updatedUser = yield services_1.UserService.updateUser(userId, req.body);
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "User not found" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params._id;
    try {
        //const deletedUser = await UserService.deleteUser(userId);
        //res.json(deletedUser);
        yield services_1.UserService.deleteUser(userId);
        res.json({ message: "Usuario ha sido eliminado con éxito" });
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "User not found" });
    }
});
exports.deleteUser = deleteUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const user = yield services_1.UserService.getMe(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Error in getMeController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getMe = getMe;
const updateOwnProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const updatedProfile = req.body;
        const updatedUser = yield services_1.UserService.updateOwnProfile(userId, updatedProfile);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found or error updating profile" });
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error("Error in Updating profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateOwnProfile = updateOwnProfile;
//# sourceMappingURL=users.controller.js.map