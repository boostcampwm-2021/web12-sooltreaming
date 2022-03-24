import { Socket } from 'socket.io-client';
import { MARK_BROADCAST } from 'sooltreaming-domain/constant/socketEvent';

const mark = (socket: Socket) => (closure: any) => {
  const { setMarks, removeQuestionMark } = closure;
  let count = 0;
  let marks = {};
  let timeout;

  socket.on(MARK_BROADCAST, ({ x, y }) => {
    marks[++count] = { x, y };
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        Object.keys(marks).forEach((cnt) => {
          removeQuestionMark(cnt);
        });
        setMarks((prev) => {
          return { ...prev, ...marks };
        });
        marks = {};
      }, 100);
    }
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
