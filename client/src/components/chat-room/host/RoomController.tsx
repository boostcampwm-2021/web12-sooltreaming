import React, { useMemo, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { FRONT_BASE_URL } from '@src/constant/envs';
import { CopyIcon } from '@components/icons';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';

import { setIsOpen } from '@store/room';
import {setNoticeMessage} from '@store/notice';

import Socket from '@socket/socket';

import { Wrapper, RowWrapper, IconButton, ToggleButton, DialogButton } from './RoomController.style';


const RoomController = () => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const isOpen = useSelector((state: RootState) => state.room.isOpen);
  const roomUrl = useMemo(() => `${FRONT_BASE_URL}/chatRoom/${code}`, [code]);
  const roomController = useRef<any>(() => {});
  
  const errorControl = (message) => {
    dispatch(setNoticeMessage({ errorMessage: message }));
  };

  const copyURL = () => {
    navigator.clipboard.writeText(roomUrl);
  }

  const requestToggleIsOpen = () => {
    roomController.current(code);
  }

  const toggleIsOpen = () => {
    dispatch(setIsOpen({ isOpen: !isOpen }));
  }

  useEffect(() => {
    const functions = Socket.roomControl({errorControl, toggleIsOpen});
    roomController.current = functions.toggleRoomEntry;
    return () => {
      functions.disconnecting();
    };
  })

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
            <DialogButton isSelected={isOpen}>
              {isOpen ? "Open" : "Close"}
            </DialogButton>
          </ToggleButton>
      </RowWrapper>
    </Wrapper>
  )
}

export default RoomController
