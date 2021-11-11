import { Socket } from 'socket.io-client';

const CHEERS = 'CHEERS';

const animation = (socket: Socket) => (closure: any) => {
  const { setIsCheers } = closure;

  socket.on(CHEERS, () => {
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
