import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { IPayload } from "../interfaces";

const refreshTokens: Set<string> = new Set();
const refreshTokenLimits: Map<string, number> = new Map();

interface ExtendedRequest extends Request {
  userId?: string;
}
const refreshAccessToken = (req: ExtendedRequest, res: Response) => {
  try {
    const refreshToken = req.header("refresh-token");
    const usageLimit = 5;

    // Validar refreshToken
    if (!refreshToken || !refreshTokens.has(refreshToken)) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    if (!refreshTokenLimits.has(refreshToken)) {
      refreshTokenLimits.set(refreshToken, 1);
    } else {
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
    const payload = { userId: req.userId } as IPayload;
    const oldRefreshToken = refreshToken;
    const newToken = generateAccessToken({...payload});

    // Actualizar refreshToken en el conjunto
    refreshTokens.delete(refreshToken);
    refreshTokens.add(newToken.refreshToken);

    console.log('Old Refresh Token:', oldRefreshToken);
    console.log('New Refresh Token:', newToken.refreshToken);

    return res.json({
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
      });
      
  } catch (error) {
    console.error("Error during token refresh:", error);
    return res.status(500).json({ error: "Error refreshing token" });
  }
};

const generateAccessToken = (payload: IPayload) => {
  // Lógica para generar un nuevo token de acceso y refreshToken
  const accessToken = jwt.sign(payload, process.env.RANDOM_KEY || "", {
    expiresIn: "7d",
  });

  // Generar un refreshToken único para cada solicitud
  const refreshToken = jwt.sign(
    { ...payload, uniqueId: Math.random().toString(36).substring(7) },
    process.env.RANDOM_KEY || "",
    {
      expiresIn: "30d",
    }
  );

  // Agregar el refreshToken al conjunto y establecer el límite de uso inicial
  refreshTokens.add(refreshToken);
  refreshTokenLimits.set(refreshToken, 1);

  return { accessToken, refreshToken };
};

 

export { refreshAccessToken, generateAccessToken };
