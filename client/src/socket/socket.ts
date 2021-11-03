import io from 'socket.io-client';

function Socket() {
  const socket = io('http://localhost:5000', {
    closeOnBeforeunload: false,
    withCredentials: true,
  });

  function connect() {
    if (!socket.connected) socket.connect();
  }
  function disconnect() {
    socket.disconnect();
  }

  return {
    connect,
    disconnect,
  };
}

export default Socket();
