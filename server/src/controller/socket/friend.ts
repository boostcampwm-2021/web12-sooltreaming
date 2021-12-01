import { FRIEND_REQUEST } from 'sooltreaming-domain/constant/socketEvent';
import type { SocketPropType } from '@src/types';

const friend = ({ io, socket, rooms, targetInfo }: SocketPropType): SocketPropType => {
  socket.on(FRIEND_REQUEST, ({ sid, id, imgUrl, nickname }) => {
    io.to(sid).emit(FRIEND_REQUEST, { id, imgUrl, nickname });
  });
  return { io, socket, rooms, targetInfo };
};

export default friend;
