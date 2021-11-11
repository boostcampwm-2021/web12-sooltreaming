import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '@components/Header';
import { Wrapper, Button, CancleButton, Row } from './Setting.style.js';
import SettingWindow from '@components/setting/SettingWindow';
import ChatRoom from '@components/chat-room/ChatRoom';
import Loading from '@components/custom/Loading';
import customRTC from '@src/utils/customRTC';

const Setting: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [stream, setStream] = useState<MediaStream>(new MediaStream());
  const history = useHistory();

  useEffect(() => {
    const initDevice = async () => {
      const newStream = await customRTC.initStream();
      setIsLoading(false);
      setStream(newStream);
    };
    initDevice();

    return () => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  const joining = () => {
    setIsFirst(false);
  };

  const cancle = () => {
    history.replace('/');
  };

  return isLoading ? (
    <Loading />
  ) : isFirst ? (
    <Wrapper>
      <Header />
      <SettingWindow stream={stream} setStream={setStream} />
      <Row>
        <CancleButton onClick={cancle}>취소</CancleButton>
        <Button onClick={joining}>입장</Button>
      </Row>
    </Wrapper>
  ) : (
    <ChatRoom stream={stream} setStream={setStream} />
  );
};

export default Setting;
