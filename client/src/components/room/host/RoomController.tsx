import React from 'react';
import { CopyIcon } from '@components/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

import {
  Wrapper,
  RowWrapper,
  IconButton,
  ToggleButton,
  DialogButton,
} from './RoomController.style';

const RoomController = ({toggleRoomEntry}) => {
  const code = useSelector((state: RootState) => state.room.roomCode);
  const isOpen = useSelector((state: RootState) => state.room.isOpen);

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const requestToggleIsOpen = () => toggleRoomEntry();

  return (
    <Wrapper>
      <RowWrapper>
        <span>방 코드 번호 : {code}</span>
        <IconButton onClick={copyURL}>
          <CopyIcon />
        </IconButton>
      </RowWrapper>
      <RowWrapper>
        <span>방 접속 제한 : </span>
        <ToggleButton onClick={requestToggleIsOpen}>
          <DialogButton isSelected={isOpen}>{isOpen ? 'Open' : 'Close'}</DialogButton>
        </ToggleButton>
      </RowWrapper>
    </Wrapper>
  );
};

export default RoomController;
