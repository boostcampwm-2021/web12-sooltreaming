import React, { useState } from 'react';
import { SendingForm } from './ChatForm.style';

type ChatFormPropTypes = {
  emits: any;
};

const ChatForm: React.FC<ChatFormPropTypes> = ({ emits }) => {
  const [message, setMessage] = useState<string>('');

  const onSubmitMessage = () => {
    emits.current?.sendMessage({ message });
    setMessage('');
  };

  return (
    <SendingForm onSubmit={(e) => e.preventDefault()}>
      <input value={message ?? ''} onChange={(e) => setMessage(e?.target?.value ?? '')} />
      <button onClick={onSubmitMessage}>
        <img src="/images/paper-plane.svg" alt="" />
      </button>
    </SendingForm>
  );
};

export default ChatForm;
