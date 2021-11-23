import { Socket } from 'socket.io-client';
import { REQUEST_FRIEND } from 'sooltreaming-domain/constant/socketEvent';

const requestFriend = (socket: Socket) => (closure: any) => {
  const { updateReceiveFriends } = closure;

  socket.on(REQUEST_FRIEND, () => {
    updateReceiveFriends();
  });

  const sendFriendRequest = (receiverSID) => {
    socket.emit(REQUEST_FRIEND, receiverSID);
  };

  const disconnecting = () => {
    socket.off(REQUEST_FRIEND);
  };

  return { sendFriendRequest, disconnecting };
};

export default requestFriend;
