import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '@components/Header';
import { Wrapper, Button, CancleButton, Row } from './Setting.style.js';

import SettingWindow from '@components/setting/SettingWindow';

const Setting: React.FunctionComponent = () => {

  const history = useHistory();

  const joining = () => {
    history.replace('/');
  };

  const cancle = () => {
    history.goBack();
  }

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
};

export default Setting;
