import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const CHANGE_VIDEO = 'CHANGE_VIDEO';

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
  socket.on(CHANGE_VIDEO, ({ isVideoOn }) => {
    console.log('video_change', rooms);
    const { code } = targetInfo;
    const targetRoom = rooms[code];
    const sid = socket.id;
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isVideoOn };
    io.to(code).emit(CHANGE_VIDEO, { sid: socket.id, isVideoOn });
  });
  return { io, socket, rooms, targetInfo };
};

export default videoChange;
