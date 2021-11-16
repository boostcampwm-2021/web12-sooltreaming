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
type RoomHostType = {
  hostId: string;
  isOpen: boolean;
};

type IsOpenType = {
  isOpen: boolean;
};

export const [SET_HOST, setHost] = createAction<RoomHostType>('SET_HOST');
export const [SET_ISOPEN, setIsOpen] = createAction<IsOpenType>('SET_ISOPEN');
export const [RESET_ROOM_INFO, resetRoomInfo] = createAction<{}>('RESET_ROOM_INFO');

type roomAction = ReturnType<typeof setHost> | ReturnType<typeof setIsOpen> | ReturnType<typeof resetRoomInfo> ;

function roomReducer(
  state: RoomStateType = initialState,
  action: roomAction,
): RoomStateType {
  switch (action.type) {
    case SET_HOST: {
      const { hostId, isOpen } = action.payload as RoomHostType;
      return {
        ...state,
        hostId,
        isOpen,
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
