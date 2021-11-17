import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';

const VIDEO_CHANGE = 'VIDEO_CHANGE';

const videoChange = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(VIDEO_CHANGE, ({ chatRoomCode, sid, nowVideoOn }) => {
    let code = '';
    code = chatRoomCode;
    console.log(rooms[code], '해당 방에 들어가있는 사람'); // 실시간으로 잘 바뀌는지 확인하는 부분
    io.to(code).emit(VIDEO_CHANGE, { sid, nowVideoOn });
  });
  return { io, socket, rooms };
};

export default videoChange;
