import { Socket } from 'socket.io-client';

const CHEERS = 'CHEERS';
const CLOSEUP = 'CLOSEUP';
const CANCEL_CLOSEUP = 'CANCEL_CLOSEUP';
const EXIST_CLOSEUP = 'EXIST_CLOSEUP';
const animation = (socket: Socket) => (closure: any) => {
  const { setIsCheers, setCloseupUser } = closure;

  socket.on(CHEERS, () => {
    setIsCheers(true);
    setTimeout(() => {
      setIsCheers(false);
    }, 5000);
  });

  socket.on(CLOSEUP, (sid) => {
    setCloseupUser(sid);
  });

  socket.on(CANCEL_CLOSEUP, () => {
    setCloseupUser('');
  });

  socket.on(EXIST_CLOSEUP, (closeupUser) => {
    setCloseupUser(closeupUser);
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
    socket.off(CANCEL_CLOSEUP);
  };

  return { activateCheers, activateCloseup, deactivateCloseup, disconnecting };
};

export default animation;
