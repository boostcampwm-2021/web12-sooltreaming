import { Socket } from 'socket.io-client';

const CHEERS = 'CHEERS';
const CLOSEUP = 'CLOSEUP';
const CANCEL_CLOSEUP = 'CANCEL_CLOSEUP';
const EXIST_CLOSEUP = 'EXIST_CLOSEUP';
const animation = (socket: Socket) => (closure: any) => {
  const { updateCheers, updateCloseUpUser } = closure;

  socket.on(CHEERS, () => {
    updateCheers(true);
    setTimeout(() => {
      updateCheers(false);
    }, 5000);
  });

  socket.on(CLOSEUP, (sid) => {
    updateCloseUpUser(sid);
  });

  socket.on(CANCEL_CLOSEUP, () => {
    updateCloseUpUser('');
  });

  socket.on(EXIST_CLOSEUP, (closeupUser) => {
    updateCloseUpUser(closeupUser);
  });

  const activateCheers = (mydata) => {
    socket.emit(CHEERS, mydata);
  };

  const deactivateCloseup = () => {
    socket.emit(CANCEL_CLOSEUP);
  };

  const activateCloseup = () => {
    socket.emit(CLOSEUP);
  };

  const disconnecting = () => {
    socket.off(CHEERS);
    socket.off(CLOSEUP);
    socket.off(CANCEL_CLOSEUP);
  };

  return { activateCheers, activateCloseup, deactivateCloseup, disconnecting };
};

export default animation;
