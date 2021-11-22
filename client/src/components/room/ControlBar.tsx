import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@src/store';
import { setMenuType } from '@store/room';
import { Wrapper, LineBox, ControlButton } from '@components/room/ControlBar.style';
import {
  HostIcon,
  GameIcon,
  PeopleIcon,
  ChatIcon,
  SettingIcon,
  CloseUpIcon,
  CheersIcon,
  ExitIcon,
} from '@components/icons';
import DeviceToggles from '@components/setting/DeviceToggles';
import Socket from '@socket/socket';
import useUser from '@hooks/socket/useUser';
import useIsStreamOnOff from '@src/hooks/socket/useIsStreamOnOff';

const IconButton = ({ Icon, type }) => {
  return (
    <ControlButton className={type}>
      <Icon />
    </ControlButton>
  );
};

export type ControlBarPropTypes = {
  onClickCheers: Function;
  activateCloseup: Function;
  deactivateCloseup: Function;
};

// 방장 개임기/ 사람 채팅 설정 클로즈업 건배
const ControlBar: React.FC<ControlBarPropTypes> = ({
  onClickCheers,
  activateCloseup,
  deactivateCloseup,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const menuType = useSelector((state: RootState) => state.room.menuType);
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
    const menuName = target.classList[2];
    if (!menuName) return;
    if (MENU[menuName]) MENU[menuName]();
    else {
      const menu = menuType === menuName ? '' : menuName;
      dispatch(setMenuType(menu));
    }
  };

  useUser();

  const { videoChange, audioChange } = useIsStreamOnOff();
  useEffect(() => {
    videoChange(isVideoOn);
  }, [isVideoOn]);

  useEffect(() => {
    audioChange(isAudioOn);
  }, [isAudioOn]);

  return (
    <Wrapper onClick={selectMenu}>
      <LineBox>
        {hostSID === Socket.getSID() && <IconButton Icon={HostIcon} type="방장" />}
        <IconButton Icon={GameIcon} type="게임" />
      </LineBox>
      <LineBox>
        <IconButton Icon={PeopleIcon} type="참가자" />
        <IconButton Icon={ChatIcon} type="채팅" />
        <IconButton Icon={SettingIcon} type="설정" />
        <DeviceToggles />
      </LineBox>
      <LineBox>
        <IconButton Icon={CloseUpIcon} type="클로즈업" />
        <IconButton Icon={CheersIcon} type="건배" />
        <IconButton Icon={ExitIcon} type="나가기" />
      </LineBox>
    </Wrapper>
  );
};

export default ControlBar;
