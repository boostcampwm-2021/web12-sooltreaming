import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const CHANGE_VIDEO = 'CHANGE_VIDEO';
const CHANGE_AUDIO = 'CHANGE_AUDIO';

const streamChange = ({
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
    const { code } = targetInfo;
    const targetRoom = rooms[code];
    const sid = socket.id;
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isVideoOn };
    io.to(code).emit(CHANGE_VIDEO, { sid: socket.id, isVideoOn });
  });

  socket.on(CHANGE_AUDIO, ({ isAudioOn }) => {
    const { code } = targetInfo;
    const targetRoom = rooms[code];
    const sid = socket.id;
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isAudioOn };
    io.to(code).emit(CHANGE_AUDIO, { sid: socket.id, isAudioOn });
  });

  return { io, socket, rooms, targetInfo };
};

export default streamChange;
