import React, { useEffect, useState, useRef } from 'react';
import Socket from '@socket/socket';

const Chat: React.FC = () => {
  useEffect(() => {
    const socket = Socket;

    return () => {
      socket.disconnect();
    };
  }, []);
  return <div className="Chat"></div>;
};

export default Chat;
