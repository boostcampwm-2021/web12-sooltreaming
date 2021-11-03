const TYPE = {
  JOIN_CHAT_ROOM: 'join_chat_room',
  JOIN_ROOM_ERROR: 'join_room_error',
  CREATE_CHAT_ROOM: 'create_chat_room',
};

const chatRoom = (socket) => (closure) => {
  console.log(socket, closure);
  const { setMessage, history } = closure;

  socket.on(TYPE.JOIN_CHAT_ROOM, (roomCode) => {
    history.push(`/chatRoom/${roomCode}`);
  });
  socket.on(TYPE.JOIN_ROOM_ERROR, (errorMessage) => {
    setMessage(errorMessage);
  });

  const emitChatRoom = (type, data) => {
    socket.emit(type, data);
  };

  return {
    emitChatRoom,
  };
};

export default chatRoom;
