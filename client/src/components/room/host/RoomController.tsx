import React from 'react';
import { CopyIcon } from '@components/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

import {
  ColumnBox,
  RowBox,
  IconButton,
  ToggleButton,
  DialogButton,
} from '@components/room/host/RoomController.style';

const copyURL = (): void => {
  navigator.clipboard.writeText(window.location.href);
};

const RoomController = ({ toggleRoomEntry }): React.ReactElement => {
  const code = useSelector((state: RootState) => state.room.roomCode);
  const isOpen = useSelector((state: RootState) => state.room.isOpen);

  return (
    <ColumnBox>
      <RowBox>
        <span>방 코드 번호 : {code}</span>
        <IconButton onClick={copyURL}>
          <CopyIcon />
        </IconButton>
      </RowBox>
      <RowBox>
        <span>방 접속 제한 : </span>
        <ToggleButton onClick={toggleRoomEntry}>
          <DialogButton isSelected={isOpen}>{isOpen ? 'Open' : 'Close'}</DialogButton>
        </ToggleButton>
      </RowBox>
    </ColumnBox>
  );
};

export default RoomController;
