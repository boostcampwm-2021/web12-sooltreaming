import { Socket } from 'socket.io-client';
import { MARK_BROADCAST } from 'sooltreaming-domain/constant/socketEvent';

const mark = (socket: Socket) => (closure: any) => {
  const { setMarks, removeQuestionMark } = closure;
  let count = 0;

  socket.on(MARK_BROADCAST, ({ x, y }) => {
    count++;
    removeQuestionMark(count);
    setMarks((prev) => {
      return { ...prev, [count]: { x, y } };
    });
  });

  const addQuestionMark = (position) => {
    socket.emit(MARK_BROADCAST, position);
  };

  const disconnecting = () => {
    socket.off(MARK_BROADCAST);
  };

  return { addQuestionMark, disconnecting };
};

export default mark;
