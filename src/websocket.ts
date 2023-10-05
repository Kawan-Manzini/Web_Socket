import { io } from "./http";

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
}
interface Message {
  room: string;
  username: string;
  text: string;
  createdAt: Date;
}

const users: RoomUser[] = [];
const messages: Message[] = [];


// io representa a aplicaçao inteira
io.on("connection", socket => {
  //Socket é algo unico emitido pelo cliente
  socket.on("select_room", (data, callback) => {
    const userInRoom = users.find(user => user.username === data.username && user.room === data.room);
    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        username: data.username,
        socket_id: data.id
      });
    }
    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom);
  });

  socket.on("message", data => {
    //salvar as mensagens 
    const message: Message = {
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: new Date(),
    };
    messages.push(message);
    io.to(data.room).emit("message", message);
  });
});

function getMessagesRoom(room: string){
  const messagesRoom = messages.filter(message => message.room === room);
  return messagesRoom;
}

