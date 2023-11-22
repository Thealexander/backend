"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
exports.io = null;
const initSocket = (server) => {
    exports.io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    // io.on("connection", (socket: Socket) => {
    //   console.log(`${socket.id} connected.`);
    //   socket.on("disconnect", () => {
    //     console.log("usuario desconectado");
    //   });
    //   socket.on("subscribe", (room: string) => {
    //     socket.join(room);
    //   });
    //   socket.on("unsubscribe", (room: string) => {
    //     socket.leave(room);
    //   });
    // });
};
exports.default = initSocket;
//# sourceMappingURL=socketServer.js.map