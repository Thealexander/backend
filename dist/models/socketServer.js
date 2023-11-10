"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected.`);
        socket.on('disconnect', () => {
            console.log("usuario desconectado");
        });
        socket.on('subscribe', (room) => {
            socket.join(room);
        });
        socket.on('unsubscribe', (room) => {
            socket.leave(room);
        });
    });
};
exports.default = initSocket;
//# sourceMappingURL=socketServer.js.map