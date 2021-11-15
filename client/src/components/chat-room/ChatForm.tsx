import React, { useState } from 'react';
import { SendingForm } from './ChatForm.style';
import { PaperPlaneIcon } from '@components/icons';

type ChatFormPropTypes = {
  emits: any;
  code: string;
  user: object;
};

const ChatForm: React.FC<ChatFormPropTypes> = ({ emits, code, user }) => {
  const [message, setMessage] = useState<string>('');

  const onSubmitMessage = (e) => {
    if (message) {
      emits.current({
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
