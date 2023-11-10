import { Server as SocketIoServer, Socket } from 'socket.io';
import http from 'http';

const initSocket = (server: http.Server) => {
  const io = new SocketIoServer(server);

  io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} connected.`);

    socket.on('disconnect', () =>{
      console.log("usuario desconectado");
    });

    socket.on('subscribe', (room:string) => {
      socket.join(room);
    });
    socket.on('unsubscribe', (room:string)  => {
      socket.leave(room);
    })


  });
};

export default initSocket;
