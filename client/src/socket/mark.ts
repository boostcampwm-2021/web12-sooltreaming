import { Socket } from 'socket.io-client';
import { MARK_BROADCAST } from 'sooltreaming-domain/constant/socketEvent';

const mark = (socket: Socket) => (closure: any) => {
  const { setMarks, removeQuestionMark } = closure;
  let count = 0;
  let marks = {};
  let frame;

  socket.on(MARK_BROADCAST, ({ x, y }) => {
    marks[++count] = { x, y };
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      Object.keys(marks).forEach((cnt) => {
        removeQuestionMark(cnt);
      });
      setMarks((prev) => {
        return { ...prev, ...marks };
      });
      marks = {};
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
