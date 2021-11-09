import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '@components/Header';
import { Wrapper, Button, CancleButton, Row } from './Setting.style.js';

import SettingWindow from '@components/setting/SettingWindow';
import ChatRoom from '@components/chat-room/ChatRoom';

const Setting: React.FunctionComponent = () => {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const history = useHistory();

  const joining = () => {
    setIsFirst(false);
  };

  const cancle = () => {
    history.replace('/');
  };

  if (isFirst)
    return (
      <Wrapper>
        <Header />
        <SettingWindow />
        <Row>
          <CancleButton onClick={cancle}>취소</CancleButton>
          <Button onClick={joining}>입장</Button>
        </Row>
      </Wrapper>
    );
  return <ChatRoom />;
};

export default Setting;
