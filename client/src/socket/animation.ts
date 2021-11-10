import { Socket } from 'socket.io-client';

const CHEERS = 'CHEERS';

const animation = (socket: Socket) => (closure: any) => {
  const { setIsCheers } = closure;
  console.log(setIsCheers);

  socket.on(CHEERS, () => {
    console.log('이벤트받았다~');
    setIsCheers(true);
    setTimeout(() => {
      setIsCheers(false);
    }, 5000);
  });

  const activateCheers = () => socket.emit(CHEERS);

  const disconnecting = () => {
    socket.off(CHEERS);
  };

  return { activateCheers, disconnecting };
};

export default animation;
