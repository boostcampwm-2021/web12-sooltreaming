import React, { useState } from 'react';
import { SendingForm } from './ChatForm.style';
import { PaperPlaneIcon } from '@components/icons';

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
      <input value={message ?? ''} onChange={({ target }) => setMessage(target?.value ?? '')} />
      <button onClick={onSubmitMessage}>
        <PaperPlaneIcon />
      </button>
    </SendingForm>
  );
};

export default ChatForm;
