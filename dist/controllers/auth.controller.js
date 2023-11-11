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
exports.logout = exports.profile = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_interface_1 = __importDefault(require("../interfaces/users.interface"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt();
        const hashpassword = yield bcrypt_1.default.hash(req.body.password, salt);
        req.body.password = hashpassword;
        req.body.username = req.body.username.toLowerCase();
        // req.body.email && (req.body.email = req.body.email.toLowerCase());
        // (!req.body.email) ? res.status(400).json({ error: "Email is required" }) : req.body.email = req.body.email.toLowerCase();
        // Generar token
        console.log("secrect Key", process.env.RANDOM_KEY);
        const token = jsonwebtoken_1.default.sign({ userId: req.body._id }, process.env.RANDOM_KEY || "", {
            expiresIn: "7",
        });
        const user = yield users_interface_1.default.create(req.body);
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
        const user = yield users_interface_1.default.findOne({
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
        // Obtener el usuario asociado al token
        const user = yield users_interface_1.default.findById(req.userId);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching profile" });
    }
});
exports.profile = profile;
const logout = (req, res) => {
    res.send("logout");
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map