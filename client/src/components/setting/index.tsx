import React, { useRef } from 'react';
import {
  SettingContainer,
  Contents,
  PreviewCamera,
  ControlBox,
  LineBox,
  EnterButton,
  CancelButton,
} from '@src/components/setting/index.style';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import Header from '@components/Header';
import useTicketSocket from '@src/hooks/socket/useTicketSocket';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';
import DeviceSelections from '@src/components/setting/DeviceSelections';
import DeviceToggles from '@src/components/setting/DeviceToggles';

type SettingPropTypes = {
  renderRoom: Function;
};

const Setting: React.FC<SettingPropTypes> = ({ renderRoom }) => {
  const history = useHistory();
  const stream = useSelector((state: RootState) => state.device.stream);
  const previewFace = useRef<HTMLVideoElement>(null);

  const { successValidtaion } = useTicketSocket();
  useUpdateSpeaker(previewFace);
  useToggleSpeaker(previewFace);
  useUpdateStream(previewFace, stream);

  const onClickJoin = () => {
    successValidtaion();
    renderRoom();
  };
  const onClickCancel = () => {
    history.replace('/');
  };

  return (
    <SettingContainer>
      <Header />
      <Contents>
        <PreviewCamera ref={previewFace} width="400" height="400" autoPlay playsInline />
        <ControlBox>
          <section>
            <DeviceToggles />
          </section>
          <section>
            <DeviceSelections />
          </section>
        </ControlBox>
      </Contents>
      <LineBox>
        <EnterButton onClick={onClickJoin}>입장</EnterButton>
        <CancelButton onClick={onClickCancel}>취소</CancelButton>
      </LineBox>
    </SettingContainer>
  );
};

export default Setting;
