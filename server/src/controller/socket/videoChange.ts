import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';

const VIDEO_CHANGE = 'VIDEO_CHANGE';

const videoChange = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(VIDEO_CHANGE, ({ chatRoomCode, sid, nowVideoOn }) => {
    let code = '';
    code = chatRoomCode;
    io.to(code).emit(VIDEO_CHANGE, { sid, nowVideoOn });
  });
  return { io, socket, rooms };
};

export default videoChange;
