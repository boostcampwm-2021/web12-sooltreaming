import { Socket } from 'socket.io-client';
import { FRIEND_REQUEST } from 'sooltreaming-domain/constant/socketEvent';

const friend = (socket: Socket) => (closure: any) => {
  const { updateReceiveFriends } = closure;

  socket.on(FRIEND_REQUEST, (data) => {
    updateReceiveFriends(data);
  });

  const sendFriendRequest = (data) => {
    socket.emit(FRIEND_REQUEST, data);
  };

  const disconnecting = () => {
    socket.off(FRIEND_REQUEST);
  };

  return { sendFriendRequest, disconnecting };
};

export default friend;
