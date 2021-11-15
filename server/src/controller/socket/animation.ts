import { Socket } from 'socket.io';
import { getTimeString } from '@utils/time';
import type { roomType } from '@loader/socket';

const CHEERS = 'CHEERS';
const QUESTION_MARK = 'QUESTION_MARK';

const animation = ({ io, socket, rooms }: { io: any; socket: Socket; rooms: roomType }) => {
  socket.on(CHEERS, ({ chatRoomCode, user }) => {
    let code = '';
    code = chatRoomCode;
    io.emit(CHEERS);
  });
  return { io, socket, rooms };
};

export default animation;
