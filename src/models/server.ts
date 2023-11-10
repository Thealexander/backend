import express, { Application } from "express";
import cors from "cors";
import http from 'http';
import initSocket from './socketServer';

import userRoutes from "../routes/usuario";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  private server: http.Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.server = http.createServer(this.app);
    this.middlewares();

    //rutas
    this.routes();
    initSocket(this.server);
  }
  private middlewares() {
    //cors
    this.app.use(cors());
    //body read
    this.app.use(express.json());
    //public folder
    this.app.use(express.static('public'));
  }
  private routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en puerto " + this.port);
    });
  }
}
export default Server;
