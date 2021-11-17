import React from 'react';
import DeviceToggleButton from '@components/setting/DeviceToggleButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setVideoPower, setAudioPower, setSpeakerPower } from '@store/device';

import {
  HostIcon,
  GameIcon,
  PeopleIcon,
  ChatIcon,
  SettingIcon,
  VideoIcon,
  MicIcon,
  SpeakerIcon,
  CloseUpIcon,
  CheersIcon,
} from '@components/icons';
import { Wrapper, Div, Button } from '@components/room/ControlBar.style';

const IconButton = (Icon: React.ReactNode, className: string) => {
  return <Button className={className}>{Icon}</Button>;
};

export type ControlBarPropTypes = {
  onClickCheers: any;
  onClickCloseup: any;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
};

// 방장 개임기/ 사람 채팅 설정 클로즈업 건배
const ControlBar: React.FC<ControlBarPropTypes> = ({
  onClickCheers,
  onClickCloseup,
  setMenuType,
}) => {
  const dispatch = useDispatch();
  const { isVideoOn, isAudioOn, isSpeakerOn } = useSelector((state: RootState) => state.device);

  const MENU = {
    클로즈업: onClickCloseup,
    건배: onClickCheers,
  };
  const selectedMenu = ({ target }) => {
    const menuName = target.classList[2];
    if (!menuName) return;
    if (MENU[menuName]) MENU[menuName]();
    else setMenuType((prev) => (prev === menuName ? '' : menuName));
  };

  return (
    <Wrapper onClick={selectedMenu}>
      <Div>
        {IconButton(<HostIcon />, '방장')}
        {IconButton(<GameIcon />, '게임')}
      </Div>

      <Div>
        {IconButton(<PeopleIcon />, '참가자')}
        {IconButton(<ChatIcon />, '채팅')}
        {IconButton(<SettingIcon />, '설정')}

        <DeviceToggleButton
          Icon={VideoIcon}
          isDeviceOn={isVideoOn}
          setIsDeviceOn={() => {
            dispatch(setVideoPower({ isVideoOn: !isVideoOn }));
          }}
        />
        <DeviceToggleButton
          Icon={MicIcon}
          isDeviceOn={isAudioOn}
          setIsDeviceOn={() => {
            dispatch(setAudioPower({ isAudioOn: !isAudioOn }));
          }}
        />
        <DeviceToggleButton
          Icon={SpeakerIcon}
          isDeviceOn={isSpeakerOn}
          setIsDeviceOn={() => {
            dispatch(setSpeakerPower({ isSpeakerOn: !isSpeakerOn }));
          }}
        />
      </Div>

      <Div>
        {IconButton(<CloseUpIcon />, '클로즈업')}
        {IconButton(<CheersIcon />, '건배')}
      </Div>
    </Wrapper>
  );
};

export default ControlBar;
