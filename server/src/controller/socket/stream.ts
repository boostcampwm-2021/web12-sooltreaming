import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/enter';
import { STREAM_CHANGE_VIDEO, STREAM_CHANGE_AUDIO } from 'sooltreaming-domain/constant/socketEvent';

const stream = ({
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
  socket.on(STREAM_CHANGE_VIDEO, ({ isVideoOn }) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    const targetRoom = rooms[code];
    const sid = socket.id;
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isVideoOn };
    io.to(code).emit(STREAM_CHANGE_VIDEO, { sid: socket.id, isVideoOn });
  });

  socket.on(STREAM_CHANGE_AUDIO, ({ isAudioOn }) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;
    const targetRoom = rooms[code];
    const sid = socket.id;
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isAudioOn };
    io.to(code).emit(STREAM_CHANGE_AUDIO, { sid: socket.id, isAudioOn });
  });

  return { io, socket, rooms, targetInfo };
};

export default stream;
