import { createAction } from '@hooks/redux';

type RoomStateType = {
  hostId: string;
  isOpen: boolean;
};
const initialState: RoomStateType = {
  hostId: '',
  isOpen: true,
};

// 확장성을 생각해 별도의 Type 지정
type RoomType = {
  hostId: string;
};

type IsOpenType = {
  isOpen: boolean;
};

export const [SET_HOSTID, setHostID] = createAction<RoomType>('SET_HOSTID');
export const [SET_ISOPEN, setIsOpen] = createAction<IsOpenType>('SET_ISOPEN');
export const [RESET_ROOM_INFO, resetRoomInfo] = createAction<{}>('RESET_ROOM_INFO');

type roomAction = ReturnType<typeof setHostID> | ReturnType<typeof setIsOpen> | ReturnType<typeof resetRoomInfo> ;

function roomReducer(
  state: RoomStateType = initialState,
  action: roomAction,
): RoomStateType {
  switch (action.type) {
    case SET_HOSTID: {
      const { hostId } = action.payload as RoomType;
      return {
        ...state,
        hostId,
      };
    }
    case SET_ISOPEN: {
      const { isOpen } = action.payload as IsOpenType;
      return {
        ...state,
        isOpen,
      };
    }
    case RESET_ROOM_INFO: {
      return {
        hostId: '',
        isOpen: true,
      };
    }
    default:
      return state;
  }
}

export default roomReducer;
