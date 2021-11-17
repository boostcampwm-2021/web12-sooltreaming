import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const VIDEO_CHANGE = 'VIDEO_CHANGE';

const videoChange = ({
  io,
  socket,
  rooms,
  targetInfo,
}: {
  io: any;
  socket: Socket;
  rooms: roomType;
  targetInfo: TargetInfoType;
}) => {
  socket.on(VIDEO_CHANGE, ({ isVideoOn }) => {
    console.log('video_change', rooms);
    const { code } = targetInfo;
    const targetRoom = rooms[code];
    const sid = socket.id;
    console.log('video_change', targetRoom);
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isVideoOn };
    io.to(code).emit(VIDEO_CHANGE, { sid: socket.id, isVideoOn });
  });
  return { io, socket, rooms, targetInfo };
};

export default videoChange;
