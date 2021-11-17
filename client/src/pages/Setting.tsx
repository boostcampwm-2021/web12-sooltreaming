import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { requestInitInfo } from '@store/device';
import { setRoomCode } from '@store/room';
import Header from '@components/Header';
import { Wrapper, Button, CancleButton, Row } from '@pages/Setting.style.js';
import PrevSetting from '@components/setting/PrevSetting';
import ChatRoom from '@components/room/';
import Loading from '@components/custom/Loading';

const Setting: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const stream = useSelector((state: RootState) => state.device.stream);
  const isLoading = useSelector((state: RootState) => state.device.isLoading);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const history = useHistory();
  const { code } = useParams();

  useEffect(() => {
    dispatch(requestInitInfo({}));
    dispatch(setRoomCode(code));
  }, []);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream]);

  const onClickJoin = () => {
    setIsFirst(false);
  };

  const onClickCancel = () => {
    history.replace('/');
  };

  if (isLoading) return <Loading />;
  if (isFirst)
    return (
      <Wrapper>
        <Header />
        <PrevSetting />
        <Row>
          <CancleButton onClick={onClickCancel}>취소</CancleButton>
          <Button onClick={onClickJoin}>입장</Button>
        </Row>
      </Wrapper>
    );
  return <ChatRoom />;
};

export default Setting;
