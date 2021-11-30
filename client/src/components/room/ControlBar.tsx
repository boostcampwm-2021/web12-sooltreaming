import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { setMenuType } from '@store/room';
import { BarContainer, LineBox, ControlButton } from '@components/room/ControlBar.style';
import {
  HostIcon,
  GameIcon,
  PeopleIcon,
  SettingIcon,
  CloseUpIcon,
  CheersIcon,
  ExitIcon,
} from '@components/icons';
import ChatMenuIcon from '@components/room/chat/ChatMenuIcon';
import DeviceToggles from '@components/setting/DeviceToggles';
import Socket from '@socket/socket';
import useEnterSocket from '@hooks/socket/useEnterSocket';
import useStreamSocket from '@hooks/socket/useStreamSocket';
import type { ControlBarPropType } from '@ts-types/components/room';

const IconButton = ({ Icon, type }) => {
  return (
    <ControlButton data-type={type}>
      <Icon />
    </ControlButton>
  );
};

// 방장 개임기/ 사람 채팅 설정 클로즈업 건배
const ControlBar: React.FC<ControlBarPropType> = ({
  onClickCheers,
  activateCloseup,
  deactivateCloseup,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hostSID = useSelector((state: RootState) => state.room.hostSID);
  const closeUpUser = useSelector((state: RootState) => state.room.closeUpUser);
  const isVideoOn = useSelector((state: RootState) => state.device.isVideoOn);
  const isAudioOn = useSelector((state: RootState) => state.device.isAudioOn);

  const onClickExit = () => {
    history.replace('/');
  };

  const onClickCloseUp = () => {
    if (closeUpUser) deactivateCloseup();
    else activateCloseup();
  };
  const MENU = {
    클로즈업: onClickCloseUp,
    건배: onClickCheers,
    나가기: onClickExit,
  };
  const selectMenu = ({ target }) => {
    const menuName = target.dataset?.type;
    if (!menuName) return;
    if (MENU[menuName]) MENU[menuName]();
    else dispatch(setMenuType(menuName));
  };

  useEnterSocket();

  const { videoChange, audioChange } = useStreamSocket();
  useEffect(() => {
    videoChange(isVideoOn);
  }, [isVideoOn]);

  useEffect(() => {
    audioChange(isAudioOn);
  }, [isAudioOn]);

  return (
    <BarContainer onClick={selectMenu}>
      <LineBox>
        {hostSID === Socket.getSID() && <IconButton Icon={HostIcon} type="방장" />}
        <IconButton Icon={GameIcon} type="게임" />
      </LineBox>
      <LineBox>
        <IconButton Icon={PeopleIcon} type="참가자" />
        <ChatMenuIcon />
        <IconButton Icon={SettingIcon} type="설정" />
        <DeviceToggles />
      </LineBox>
      <LineBox>
        <IconButton Icon={CloseUpIcon} type="클로즈업" />
        <IconButton Icon={CheersIcon} type="건배" />
        <IconButton Icon={ExitIcon} type="나가기" />
      </LineBox>
    </BarContainer>
  );
};

export default ControlBar;
