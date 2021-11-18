import React from 'react';
import DeviceToggleButton from '@components/setting/DeviceToggleButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@src/store';
import { setVideoPower, setAudioPower, setSpeakerPower } from '@store/device';
import { setMenuType } from '@store/room';

import useIsStreamOnOff from '@src/hooks/socket/useIsStreamOnOff';

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
  ExitIcon,
} from '@components/icons';
import { Wrapper, Div, Button } from '@components/room/ControlBar.style';
import Socket from '@socket/socket';

const IconButton = (Icon: React.ReactNode, className: string) => {
  return <Button className={className}>{Icon}</Button>;
};

export type ControlBarPropTypes = {
  onClickCheers: any;
  onClickCloseup: any;
};

// 방장 개임기/ 사람 채팅 설정 클로즈업 건배
const ControlBar: React.FC<ControlBarPropTypes> = ({ onClickCheers, onClickCloseup }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const menuType = useSelector((state: RootState) => state.room.menuType);
  const { isVideoOn, isAudioOn, isSpeakerOn } = useSelector((state: RootState) => state.device);

  const onClickExit = () => {
    history.replace('/');
  };

  const hostSID = useSelector((state: RootState) => state.room.hostSID);
  const MENU = {
    클로즈업: onClickCloseup,
    건배: onClickCheers,
    나가기: onClickExit,
  };
  const selectedMenu = ({ target }) => {
    const menuName = target.classList[2];
    if (!menuName) return;
    if (MENU[menuName]) MENU[menuName]();
    else {
      const menu = menuType === menuName ? '' : menuName;
      dispatch(setMenuType(menu));
    }
  };

  const { videoChange, audioChange } = useIsStreamOnOff();
  return (
    <Wrapper onClick={selectedMenu}>
      <Div>
        {hostSID === Socket.getSID() ? IconButton(<HostIcon />, '방장') : <></>}
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
            videoChange(!isVideoOn);
            dispatch(setVideoPower({ isVideoOn: !isVideoOn }));
          }}
        />
        <DeviceToggleButton
          Icon={MicIcon}
          isDeviceOn={isAudioOn}
          setIsDeviceOn={() => {
            audioChange(!isAudioOn);
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
        {IconButton(<ExitIcon />, '나가기')}
      </Div>
    </Wrapper>
  );
};

export default ControlBar;
