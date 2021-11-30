import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SendingForm } from '@components/room/chat/ChatForm.style';
import { PaperPlaneIcon } from '@components/icons';
import { RootState } from '@src/store';
import { useSelector } from 'react-redux';
import type { ChatPropType } from '@ts-types/components/room';

const ChatForm: React.FC<ChatPropType> = ({ sendMessage }): React.ReactElement => {
  const { code } = useParams();
  const [message, setMessage] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);

  const onSubmitMessage = (e) => {
    if (message) {
      sendMessage({
        msg: message,
        chatRoomCode: code,
        user,
      });
      setMessage('');
    }
  };

  return (
    <SendingForm onSubmit={(e) => e.preventDefault()}>
      <input value={message ?? ''} onChange={({ target }) => setMessage(target?.value ?? '')} />
      <button onClick={onSubmitMessage}>
        <PaperPlaneIcon />
      </button>
    </SendingForm>
  );
};

export default ChatForm;
