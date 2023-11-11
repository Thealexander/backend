"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidation = (req, res, next) => {
    try {
        const token = req.header("auth-token");
        if (!token) {
            return res
                .status(401)
                .json({ error: "Access denied. Token not provided." });
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.RANDOM_KEY || "");
        req.userId = payload.userId;
        /*
        console.log("Token verification successful:", {
          userId: (req as ExtendedRequest).userId,
        });
        */
        next();
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ error: "Access denied. Invalid token." });
    }
};
exports.tokenValidation = tokenValidation;
//# sourceMappingURL=validatetoken.js.map