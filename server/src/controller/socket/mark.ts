import { createLog } from '@service/user';
import { MARK_BROADCAST } from 'sooltreaming-domain/constant/socketEvent';
import type { SocketPropType } from '@src/types';

const mark = ({ io, socket, rooms, targetInfo }: SocketPropType): SocketPropType => {
  socket.on(MARK_BROADCAST, ({ x, y }) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    io.to(code).emit(MARK_BROADCAST, { x, y });
    const id = rooms[code].users[socket.id].id;
    createLog(id, MARK_BROADCAST);
  });
  return { io, socket, rooms, targetInfo };
};

export default mark;
