import React, { useRef } from 'react';
import {
  SettingContainer,
  Contents,
  PreviewCamera,
  ControlBox,
  LineBox,
  EnterButton,
  CancelButton,
} from '@components/setting/index.style';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import Header from '@components/Header';
import useTicketSocket from '@hooks/socket/useTicketSocket';
import useUpdateSpeaker from '@hooks/useUpdateSpeaker';
import useUpdateStream from '@hooks/useUpdateStream';
import useToggleSpeaker from '@hooks/useToggleSpeaker';
import DeviceSelections from '@components/setting/DeviceSelections';
import DeviceToggles from '@components/setting/DeviceToggles';
import type { SettingPropType } from '@ts-types/components/setting';

const Setting: React.FC<SettingPropType> = ({ renderRoom }): React.ReactElement => {
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
