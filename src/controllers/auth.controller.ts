import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { removeFromInvalidTokens } from "../middlewares/tokenValidations";
import { refreshAccessToken } from "../helpers/refreshToken";
import Users, { IUser } from "../interfaces/users.interface";
import { IPayload } from "../interfaces/payload.interface";
dotenv.config();

interface ExtendedRequest extends Request {
  exp?: number;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashpassword;
    req.body.username = req.body.username.toLowerCase();
    // req.body.email && (req.body.email = req.body.email.toLowerCase());
    // (!req.body.email) ? res.status(400).json({ error: "Email is required" }) : req.body.email = req.body.email.toLowerCase();

    // Generar token
    console.log("secrect Key", process.env.RANDOM_KEY);
    const token: string = jwt.sign(
      { userId: req.body._id },
      process.env.RANDOM_KEY || "",
      {
        expiresIn: "7",
      }
    );

    const user = await Users.create(req.body as IUser);
    res.status(201).json({ user, token });
    // res.header('auth-token', token).json(user);
    console.log(req.body);
  } catch (error) {
    console.log(req.body);
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};
export const signin = async (req: Request, res: Response) => {
  try {
    // Buscar usuario por nombre de usuario
    const user = await Users.findOne({
      username: req.body.username.toLowerCase(),
    });

    // Verificar si el usuario existe
    if (!user)
      return res.status(400).json({ error: "Invalid username or password" });

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid username or password" });

    // Generar token para el usuario existente
    const token: string = jwt.sign(
      { userId: user._id },
      process.env.RANDOM_KEY || "",
      {
        expiresIn: "7d",
      }
    );
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during login" });
  }
};

export const profile = async (req: ExtendedRequest, res: Response) => {
  try {
    const user = await Users.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if the access token is about to expire
    const expirationThreshold = 60 * 5; // 5 minutes
    const currentTime = Math.floor(Date.now() / 1000);

    const userExp = user.exp;
    if (userExp !== undefined) {
      const payload = jwt.verify(
        userExp.toString(),
        process.env.RANDOM_KEY || ""
      ) as IPayload;
      (req as ExtendedRequest).exp = payload.exp;

      if (req.exp! - currentTime < expirationThreshold) {
        // If the access token is about to expire, refresh it
        const newToken = refreshAccessToken(req, res);

        if ("accessToken" in newToken) {
          return res.json({
            user,
            accessToken: newToken.accessToken,
          });
        }
      }
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Invalidar el token actual
    const token = req.header("auth-token");
    if (token) {
      removeFromInvalidTokens(token);

      // Limpiar el userId del objeto de solicitud (request)
      req.userId = undefined;

      // Envía una respuesta con código 204 (No Content) para indicar éxito sin contenido adicional
      res.status(204).end();
    } else {
      // Si no se proporciona un token, devuelve un código 400 (Bad Request) u otro código apropiado
      res.status(400).json({ error: "Token not provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during logout" });
  }
};
