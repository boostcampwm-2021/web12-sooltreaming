import { Socket } from 'socket.io-client';

const CHEERS = 'CHEERS';

const animation = (socket: Socket) => (closure: any) => {
  const { setIsCheers } = closure;
  console.log(setIsCheers);
  console.log(socket, '접속소켓');

  socket.on(CHEERS, () => {
    console.log('이벤트받았다~');
    setIsCheers(true);
    setTimeout(() => {
      setIsCheers(false);
    }, 5000);
  });

  const activateCheers = (mydata) => {
    socket.emit(CHEERS, mydata);
  };

  const disconnecting = () => {
    socket.off(CHEERS);
  };

  return { activateCheers, disconnecting };
};

export default animation;
