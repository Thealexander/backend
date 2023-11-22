import { Server as SocketIoServer } from "socket.io";
import http from "http";

export let io: SocketIoServer | null = null;
const initSocket = (server: http.Server) => {
  io = new SocketIoServer(server, {
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

export default initSocket;
