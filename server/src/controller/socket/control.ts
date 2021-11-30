import { ERROR } from '@src/constant';
import {
  CONTROL_AUTHORITY_ERROR,
  CONTROL_TOGGLE_ENTRY,
  CONTROL_OTHER_VIDEO_OFF,
  CONTROL_OTHER_AUDIO_OFF,
  STREAM_FORCE_CHANGE_VIDEO,
  STREAM_FORCE_CHANGE_AUDIO,
  TICKET_FAILURE,
} from 'sooltreaming-domain/constant/socketEvent';
import type { SocketPropType } from '@src/types';

const control = ({ io, socket, rooms, targetInfo }: SocketPropType): SocketPropType => {
  socket.on(CONTROL_TOGGLE_ENTRY, () => {
    const { code } = targetInfo;

    if (rooms[code].hostSID !== socket.id)
      return socket.emit(CONTROL_AUTHORITY_ERROR, ERROR.PERMISSION_DENIED);

    const state = rooms[code].isOpen;
    if (state) {
      rooms[code].waiters.forEach((sid) => {
        io.to(sid).emit(TICKET_FAILURE, { message: '방장이 방을 닫았습니다.' });
      });
      rooms[code].waiters = [];
    }

    rooms[code].isOpen = !state;
    socket.emit(CONTROL_TOGGLE_ENTRY, true);
  });

  socket.on(CONTROL_OTHER_VIDEO_OFF, ({ sid, isVideoOn }) => {
    const { code } = targetInfo;

    if (rooms[code].hostSID !== socket.id)
      return socket.emit(CONTROL_AUTHORITY_ERROR, ERROR.PERMISSION_DENIED);
    const targetRoom = rooms[code];
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isVideoOn };
    io.to(code).emit(STREAM_FORCE_CHANGE_VIDEO, { sid, isVideoOn });
  });

  socket.on(CONTROL_OTHER_AUDIO_OFF, ({ sid, isAudioOn }) => {
    const { code } = targetInfo;

    if (rooms[code].hostSID !== socket.id)
      return socket.emit(CONTROL_AUTHORITY_ERROR, ERROR.PERMISSION_DENIED);
    const targetRoom = rooms[code];
    targetRoom.usersDevices[sid] = { ...targetRoom.usersDevices[sid], isAudioOn };
    io.to(code).emit(STREAM_FORCE_CHANGE_AUDIO, { sid, isAudioOn });
  });

  return { io, socket, rooms, targetInfo };
};

export default control;
