import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const ChatRoom: React.FunctionComponent<RouteComponentProps> = (props) => {
  const chatRoomCode = props.match.params.code;

  useEffect(() => {
    // TODO 주소 검증, 사용자 검증
  }, [props]);

  return (
    <div>
      <span>{chatRoomCode}</span>
    </div>
  );
};

export default ChatRoom;
