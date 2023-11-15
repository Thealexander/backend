"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateOwnProfile = exports.getMe = exports.logout = exports.profile = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const middlewares_1 = require("../middlewares");
const refreshToken_1 = require("../helpers/refreshToken");
const interfaces_1 = require("../interfaces/");
const imgHelper_1 = require("../helpers/imgHelper");
//import { IUser } from '../interfaces/users.interface';
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt();
        const hashpassword = yield bcrypt_1.default.hash(req.body.password, salt);
        req.body.password = hashpassword;
        req.body.avatar = "";
        req.body.username = req.body.username.toLowerCase();
        // req.body.email && (req.body.email = req.body.email.toLowerCase());
        // (!req.body.email) ? res.status(400).json({ error: "Email is required" }) : req.body.email = req.body.email.toLowerCase();
        // Generar token
        //console.log("secrect Key", process.env.RANDOM_KEY);
        const token = jsonwebtoken_1.default.sign({ userId: req.body._id }, process.env.RANDOM_KEY || "", {
            expiresIn: "7",
        });
        const user = yield interfaces_1.Users.create(req.body);
        res.status(201).json({ user, token });
        // res.header('auth-token', token).json(user);
        console.log(req.body);
    }
    catch (error) {
        console.log(req.body);
        console.error(error);
        res.status(500).json({ error: "Error creating user" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar usuario por nombre de usuario
        const user = yield interfaces_1.Users.findOne({
            username: req.body.username.toLowerCase(),
        });
        // Verificar si el usuario existe
        if (!user)
            return res.status(400).json({ error: "Invalid username or password" });
        // Verificar la contraseña
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json({ error: "Invalid username or password" });
        // Generar token para el usuario existente
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.RANDOM_KEY || "", {
            expiresIn: "7d",
        });
        res.json({ user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error during login" });
    }
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield interfaces_1.Users.findById(req.userId);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        // Check if the access token is about to expire
        const expirationThreshold = 60 * 5; // 5 minutes
        const currentTime = Math.floor(Date.now() / 1000);
        const userExp = user.exp;
        if (userExp !== undefined) {
            const payload = jsonwebtoken_1.default.verify(userExp.toString(), process.env.RANDOM_KEY || "");
            req.exp = payload.exp;
            if (req.exp - currentTime < expirationThreshold) {
                // If the access token is about to expire, refresh it
                const newToken = (0, refreshToken_1.refreshAccessToken)(req, res);
                if ("accessToken" in newToken) {
                    return res.json({
                        user,
                        accessToken: newToken.accessToken,
                    });
                }
            }
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching profile" });
    }
});
exports.profile = profile;
const logout = (req, res) => {
    try {
        // Invalidar el token actual
        const token = req.header("auth-token");
        if (token) {
            (0, middlewares_1.removeFromInvalidTokens)(token);
            // Limpiar el userId del objeto de solicitud (request)
            req.userId = undefined;
            // Envía una respuesta con código 204 (No Content) para indicar éxito sin contenido adicional
            res.status(204).end();
        }
        else {
            // Si no se proporciona un token, devuelve un código 400 (Bad Request) u otro código apropiado
            res.status(400).json({ error: "Token not provided" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error during logout" });
    }
};
exports.logout = logout;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield interfaces_1.Users.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const expirationThreshold = 60 * 5; // 5 minutos
        const currentTime = Math.floor(Date.now() / 1000);
        const userExp = user.exp;
        if (userExp !== undefined) {
            // Verificar si el token de acceso está a punto de expirar
            const payload = jsonwebtoken_1.default.verify(userExp.toString(), process.env.RANDOM_KEY || "");
            req.exp = payload.exp;
            if (req.exp - currentTime < expirationThreshold) {
                // Si el token de acceso está a punto de expirar, refrescarlo
                const newToken = (0, refreshToken_1.refreshAccessToken)(req, res);
                if ("accessToken" in newToken) {
                    return res.json({
                        user,
                        accessToken: newToken.accessToken,
                    });
                }
            }
        }
        // Si no se refresca el token, solo envía el usuario
        return res.json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching profile" });
    }
});
exports.getMe = getMe;
const updateOwnProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield interfaces_1.Users.findById(req.userId);
        console.log("Usuario existente", existingUser);
        console.log("Contenido de req.file", req.file);
        const newUserData = req.body;
        console.log("Usuario existente", newUserData);
        if (req.file && (existingUser === null || existingUser === void 0 ? void 0 : existingUser.avatar)) {
            const imgPath = (0, imgHelper_1.getFilePath)(req.file);
            console.log(imgPath);
            newUserData.avatar = imgPath;
            if (existingUser === null || existingUser === void 0 ? void 0 : existingUser.avatar) {
                fs.unlink(existingUser.avatar, (err) => {
                    if (err) {
                        console.error("Error deleting previous avatar:", err);
                    }
                    else {
                        console.log("Previous avatar deleted successfully");
                    }
                });
            }
        }
        else if (!newUserData.avatar) {
            newUserData.avatar = existingUser === null || existingUser === void 0 ? void 0 : existingUser.avatar;
        }
        if (newUserData.password) {
            const salt = yield bcrypt_1.default.genSalt();
            newUserData.password = yield bcrypt_1.default.hash(newUserData.password, salt);
        }
        const updateUser = yield interfaces_1.Users.findByIdAndUpdate(req.userId, newUserData, {
            new: true,
        });
        if (!updateUser) {
            throw new Error("Fail updating New data to the existing User");
        }
        else {
            res.status(201).json(updateUser);
        }
    }
    catch (error) {
        console.error(`Error updating own profile for user with ID ${req.userId}:`, error);
        res.status(500).json({ error: "Error updating your profile" });
    }
});
exports.updateOwnProfile = updateOwnProfile;
//# sourceMappingURL=auth.controller.js.map