import { Socket } from 'socket.io';
import type { roomType } from '@loader/socket';
import type { TargetInfoType } from '@controller/socket/entering';

const START_UPDOWN = 'START_UPDOWN';
const STOP_UPDOWN = 'STOP_UPDOWN';
const STATUS_NORMAL = 'STATUS_NORMAL';

const gaming = ({
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
  socket.on(START_UPDOWN, (startingSID) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    const userKeys = Object.keys(rooms[code].users);
    if (userKeys.length < 2 || rooms[code].game.title || rooms[code].status !== STATUS_NORMAL)
      return;

    rooms[code].game = { title: '업다운', host: startingSID };
    io.emit(START_UPDOWN, startingSID);
  });

  socket.on(STOP_UPDOWN, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    rooms[code].game = { title: '', host: '' };
    io.emit(STOP_UPDOWN);
  });
  return { io, socket, rooms, targetInfo };
};

export default gaming;
