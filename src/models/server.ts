import express, { Application, Request, Response } from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import path from "path";
//import bodyParser from "body-parser";

import initSocket from "./socketServer";
import {
  authRoutes,
  chatRoutes,
  userRoutes,
  chatMessagesRoutes,
  groupRoutes,
  groupMessagesRoutes,
} from "../routes";
import cn from "./db";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/users",
    auth: "/api/auth",
    chat: "/api/chats",
    chatMessages: "/api/chats/messages",
    groups: "/api/group",
    gmessages: "/api/gmessages",
  };

  private server: http.Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.server = http.createServer(this.app);

    if (process.env.NODE_ENV === "development") {
      this.app.use(morgan("dev"));
    }

    this.middlewares();

    //Servicios a cargar
    cn();
    initSocket(this.server);
    this.routes();
    //console.log(this.app._router.stack)
  }
  private middlewares(): void {
    //cors
    this.app.use(cors());
    //body read
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //public folder
    const publicF = path.join(__dirname, "..", "dist", "public"); // Ajusta la ruta según la estructura de tu proyecto
    this.app.use(express.static(publicF));
  }
  private routes(): void {
    this.app.use(this.apiPaths.usuarios, userRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.chat, chatRoutes);
    this.app.use(this.apiPaths.chatMessages, chatMessagesRoutes);
    this.app.use(this.apiPaths.groups, groupRoutes);
    this.app.use(this.apiPaths.gmessages, groupMessagesRoutes);
   
   
    //404 error
    this.app.use((req: Request, res: Response) => {
      res.status(404).send("Not Found");
    });

    // Error handling middleware
    this.app.use((err: Error, req: Request, res: Response) => {
      console.error(err.stack);
      res.status(500).send("Something went wrong!");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en puerto " + this.port);
    });
  }
}
export default Server;
