import { Socket } from 'socket.io-client';

const QUESTION = 'QUESTION';

const questionmark = (socket: Socket) => (closure: any) => {
  const { setMarks } = closure;
  let count = 0;

  socket.on(QUESTION, ({ x, y }) => {
    const mia = new Audio(`/audios/mia-ping.mp3`);
    setMarks((prev) => {
      mia.play();
      count++;
      return { ...prev, [count]: { x, y } };
    });
  });

  const questionMark = (mydata) => {
    console.log(mydata);
    socket.emit(QUESTION, mydata);
  };

  const disconnecting = () => {
    socket.off(QUESTION);
  };

  return { questionMark, disconnecting };
};

export default questionmark;
