import React, {useState, useMemo} from 'react'
import {useParams} from 'react-router-dom';
import { FRONT_BASE_URL } from '@src/constant/envs';
import { CopyIcon } from '@components/icons';

import { Wrapper, RowWrapper, IconButton, ToggleButton, DialogButton } from './RoomController.style';


const RoomController = () => {
  const { code } = useParams();
  const [selected, setSelected] = useState(true);
  
  const roomUrl = useMemo(() => `${FRONT_BASE_URL}/chatRoom/${code}`, [code]);

  const copyURL = () => {
    navigator.clipboard.writeText(roomUrl);
  }

  const toggleSelected = () => {
    setSelected((prev) => !prev);
  }

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
          <ToggleButton onClick={toggleSelected}>
            <DialogButton isSelected={selected}>
              {selected ? "Open" : "Close"}
            </DialogButton>
          </ToggleButton>
      </RowWrapper>
    </Wrapper>
  )
}

export default RoomController
