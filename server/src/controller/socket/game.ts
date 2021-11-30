import { createLog } from '@service/user';
import { UPDOWN_START, LIAR_START, GAME_STOP } from 'sooltreaming-domain/constant/socketEvent';
import { STATUS_VOTE_NORMAL, KEYWORDS, LIAR_KEYWORD } from '@src/constant';
import { UP_DOWN, LIAR } from 'sooltreaming-domain/constant/gameName';
import type { SocketPropType } from '@src/types';

const game = ({ io, socket, rooms, targetInfo }: SocketPropType): SocketPropType => {
  socket.on(UPDOWN_START, (startingSID) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    const userKeys = Object.keys(rooms[code].users);
    if (userKeys.length < 2 || rooms[code].game.title || rooms[code].status !== STATUS_VOTE_NORMAL)
      return;

    rooms[code].game = { title: UP_DOWN, host: startingSID };
    const randomNum = Math.floor(Math.random() * 50) + 1;

    io.to(code).emit(UPDOWN_START, startingSID, randomNum);
    createLog(rooms[code].users[startingSID].id, UPDOWN_START);
  });

  socket.on(LIAR_START, (startingSID) => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    const userKeys = Object.keys(rooms[code].users);
    if (userKeys.length < 2 || rooms[code].game.title || rooms[code].status !== STATUS_VOTE_NORMAL)
      return;

    rooms[code].game = { title: LIAR, host: startingSID };
    const usersSID = Object.keys(rooms[code].users); // 방 안의 유저들의 sid들을 모아놓은 string 배열
    const randomSID = usersSID[Math.floor(Math.random() * Object.keys(rooms[code].users).length)];
    const randomKeyword = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];

    usersSID.forEach((elem) => {
      if (elem === randomSID) io.to(elem).emit(LIAR_START, startingSID, LIAR_KEYWORD);
      else io.to(elem).emit(LIAR_START, startingSID, randomKeyword);
    });
  });

  socket.on(GAME_STOP, () => {
    const { code } = targetInfo;
    if (!(code in rooms)) return;

    rooms[code].game = { title: '', host: '' };
    io.to(code).emit(GAME_STOP);
  });
  return { io, socket, rooms, targetInfo };
};

export default game;
