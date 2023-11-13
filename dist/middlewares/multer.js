"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: "./src/Uploads",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    // Solo permitir archivos de imagen
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
        // const error = new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        //return next(error);
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