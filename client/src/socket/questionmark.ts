import { Socket } from 'socket.io-client';

const QUESTION = 'QUESTION';

const questionMark = (socket: Socket) => (closure: any) => {
  const { setMarks, removeQuestionMark } = closure;
  let count = 0;

  socket.on(QUESTION, ({ x, y }) => {
    count++;
    removeQuestionMark(count);
    setMarks((prev) => {
      return { ...prev, [count]: { x, y } };
    });
  });

  const addQuestionMark = (position) => {
    socket.emit(QUESTION, position);
  };

  const disconnecting = () => {
    socket.off(QUESTION);
  };

  return { addQuestionMark, disconnecting };
};

export default questionMark;
