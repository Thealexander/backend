"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.refreshAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshTokens = new Set();
const refreshTokenLimits = new Map();
const refreshAccessToken = (req, res) => {
    try {
        const refreshToken = req.header("refresh-token");
        const usageLimit = 5;
        // Validar refreshToken
        if (!refreshToken || !refreshTokens.has(refreshToken)) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }
        if (!refreshTokenLimits.has(refreshToken)) {
            refreshTokenLimits.set(refreshToken, 1);
        }
        else {
            const usageCount = refreshTokenLimits.get(refreshToken) || 0;
            refreshTokenLimits.set(refreshToken, usageCount + 1);
            // Verificar si el refreshToken ha alcanzado su límite de uso
            if (usageCount >= usageLimit) {
                refreshTokens.delete(refreshToken);
                refreshTokenLimits.delete(refreshToken);
                return res.status(401).json({ error: "Refresh token limit exceeded" });
            }
        }
        // Si el refreshToken es válido, genera un nuevo token de acceso
        const payload = { userId: req.userId };
        const oldRefreshToken = refreshToken;
        const newToken = generateAccessToken(Object.assign({}, payload));
        // Actualizar refreshToken en el conjunto
        refreshTokens.delete(refreshToken);
        refreshTokens.add(newToken.refreshToken);
        console.log('Old Refresh Token:', oldRefreshToken);
        console.log('New Refresh Token:', newToken.refreshToken);
        return res.json({
            accessToken: newToken.accessToken,
            refreshToken: newToken.refreshToken,
        });
    }
    catch (error) {
        console.error("Error during token refresh:", error);
        return res.status(500).json({ error: "Error refreshing token" });
    }
};
exports.refreshAccessToken = refreshAccessToken;
const generateAccessToken = (payload) => {
    // Lógica para generar un nuevo token de acceso y refreshToken
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.RANDOM_KEY || "", {
        expiresIn: "7d",
    });
    // Generar un refreshToken único para cada solicitud
    const refreshToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { uniqueId: Math.random().toString(36).substring(7) }), process.env.RANDOM_KEY || "", {
        expiresIn: "30d",
    });
    // Agregar el refreshToken al conjunto y establecer el límite de uso inicial
    refreshTokens.add(refreshToken);
    refreshTokenLimits.set(refreshToken, 1);
    return { accessToken, refreshToken };
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=refreshToken.js.map