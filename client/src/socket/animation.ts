import { Socket } from 'socket.io-client';

const CHEERS = 'CHEERS';
const CLOSEUP = 'CLOSEUP';
const CANCEL_CLOSEUP = 'CANCEL_CLOSEUP';
const animation = (socket: Socket) => (closure: any) => {
  const { setIsCheers, setCloseupUser, setIsCloseup } = closure;

  socket.on(CHEERS, () => {
    setIsCheers(true);
    setTimeout(() => {
      setIsCheers(false);
    }, 5000);
  });

  socket.on(CLOSEUP, (sid) => {
    setCloseupUser(sid);
    setIsCloseup(true);
  });

  socket.on(CANCEL_CLOSEUP, () => {
    setCloseupUser('');
    setIsCloseup(false);
  });

  const activateCheers = (mydata) => {
    socket.emit(CHEERS, mydata);
  };

  const deactivateCloseup = (mydata) => {
    socket.emit(CANCEL_CLOSEUP, mydata.chatRoomCode);
  };

  const activateCloseup = (mydata) => {
    socket.emit(CLOSEUP, mydata);
  };

  const disconnecting = () => {
    socket.off(CHEERS);
    socket.off(CLOSEUP);
  };

  return { activateCheers, activateCloseup, deactivateCloseup, disconnecting };
};

export default animation;
