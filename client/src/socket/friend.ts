import { Socket } from 'socket.io-client';
import { FRIEND_REQUEST } from 'sooltreaming-domain/constant/socketEvent';

const friend = (socket: Socket) => (closure: any) => {
  const { updateReceiveFriends } = closure;

  socket.on(FRIEND_REQUEST, () => {
    updateReceiveFriends();
  });

  const sendFriendRequest = (receiverSID) => {
    socket.emit(FRIEND_REQUEST, receiverSID);
  };

  const disconnecting = () => {
    socket.off(FRIEND_REQUEST);
  };

  return { sendFriendRequest, disconnecting };
};

export default friend;
