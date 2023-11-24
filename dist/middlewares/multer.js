"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const eDir = (req, file, cb) => {
    const folder = req.params.folder || "images"; // Usar "profiles" como valor predeterminado si no se proporciona un parámetro de carpeta
    const destination = path_1.default.join(__dirname, "../Uploads", folder);
    cb(null, destination);
};
const storage = multer_1.default.diskStorage({
    destination: eDir,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
    }
};
const limits = {
    fileSize: 1024 * 1024 * 5, // 5MB límite de tamaño
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => fileFilter(req, file, cb),
    limits: limits,
});
exports.default = upload;
//# sourceMappingURL=multer.js.map