"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
//import bodyParser from "body-parser";
const socketServer_1 = __importDefault(require("./socketServer"));
const routes_1 = require("../routes");
const db_1 = __importDefault(require("./db"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/users',
            auth: '/api/auth',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.server = http_1.default.createServer(this.app);
        if (process.env.NODE_ENV === "development") {
            this.app.use((0, morgan_1.default)("dev"));
        }
        this.middlewares();
        //Servicios a cargar
        (0, db_1.default)();
        (0, socketServer_1.default)(this.server);
        this.routes();
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //body read
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        //public folder
        const publicF = path_1.default.join(__dirname, "..", "dist", "public"); // Ajusta la ruta según la estructura de tu proyecto
        this.app.use(express_1.default.static(publicF));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, routes_1.userRoutes);
        this.app.use(this.apiPaths.auth, routes_1.authRoutes);
        //404 error
        this.app.use((req, res) => {
            res.status(404).send("Not Found");
        });
        // Error handling middleware
        this.app.use((err, req, res) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Corriendo en puerto " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map