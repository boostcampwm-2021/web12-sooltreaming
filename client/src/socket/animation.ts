import { Socket } from 'socket.io-client';
import {
  CHEERS_BROADCAST,
  CLOSEUP_ON,
  CLOSEUP_OFF,
  CLOSEUP_BREAK,
} from 'sooltreaming-domain/constant/socketEvent';

const animation = (socket: Socket) => (closure: any) => {
  const { updateCheers, updateCloseUpUser } = closure;

  socket.on(CHEERS_BROADCAST, () => {
    updateCheers(true);
    setTimeout(() => {
      updateCheers(false);
    }, 5000);
  });

  socket.on(CLOSEUP_ON, (sid) => {
    updateCloseUpUser(sid);
  });

  socket.on(CLOSEUP_OFF, () => {
    updateCloseUpUser('');
  });

  socket.on(CLOSEUP_BREAK, (closeupUser) => {
    updateCloseUpUser(closeupUser);
  });

  const activateCheers = (mydata) => {
    socket.emit(CHEERS_BROADCAST, mydata);
  };

  const deactivateCloseup = () => {
    socket.emit(CLOSEUP_OFF);
  };

  const activateCloseup = () => {
    socket.emit(CLOSEUP_ON);
  };

  const disconnecting = () => {
    socket.off(CHEERS_BROADCAST);
    socket.off(CLOSEUP_ON);
    socket.off(CLOSEUP_OFF);
  };

  return { activateCheers, activateCloseup, deactivateCloseup, disconnecting };
};

export default animation;
