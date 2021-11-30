import { createAction } from '@hooks/redux';
import type {
  RoomStateType,
  RoomHostType,
  UserDevicesType,
  GameInfoType,
  ChatLogType,
  UserType,
} from '@ts-types/store';

const initialState: RoomStateType = {
  roomCode: '',
  menuType: '',
  currentGame: { title: '', host: '' },
  chatLog: [],
  unreadChat: 0,
  users: {},
  usersDevices: {},
  streams: {},
  voteTimes: {},
  hostSID: '',
  isOpen: true,
  isCheers: false,
  closeUpUser: '',
};

export const [SET_ROOM_CODE, setRoomCode] = createAction<string>('SET_ROOM_CODE');
export const [SET_HOST, setHost] = createAction<RoomHostType>('SET_HOST');
export const [SET_ISOPEN, setIsOpen] = createAction<boolean>('SET_ISOPEN');
export const [SET_USERS, setUsers] = createAction<{
  users: { [sid: string]: UserType };
  usersDevices: { [sid: string]: UserDevicesType };
}>('SET_USERS');
export const [SET_MENUTYPE, setMenuType] = createAction<string>('SET_MENUTYPE');
export const [SET_STREAMS, setStreams] =
  createAction<{ [sid: string]: MediaStream }>('SET_STREAMS');
export const [SET_ISCHEERS, setIsCheers] = createAction<boolean>('SET_ISCHEERS');
export const [SET_CLOSEUP_USER, setCloseUpUser] = createAction<string>('SET_CLOSEUP_USER');

export const [ADD_USERS, addUsers] = createAction<{
  user: UserType;
  userDevices: UserDevicesType;
  sid: string;
}>('ADD_USERS');
export const [ADD_CHATLOG, addChatLog] = createAction<ChatLogType>('ADD_CHATLOG');
export const [ADD_STREAMS, addStreams] =
  createAction<{ [sid: string]: MediaStream }>('ADD_STREAMS');

export const [UPDATE_DEVICE_VIDEO, updateDeviceVideo] =
  createAction<{ sid: string; isVideoOn: boolean }>('UPDATE_DEVICE_VIDEO');
export const [UPDATE_DEVICE_AUDIO, updateDeviceAudio] =
  createAction<{ sid: string; isAudioOn: boolean }>('UPDATE_DEVICE_AUDIO');

export const [DELETE_USERS, deleteUsers] = createAction<string>('DELETE_USERS');
export const [RESET_ROOM_INFO, resetRoomInfo] = createAction<{}>('RESET_ROOM_INFO');

export const [TOGGLE_ISOPEN, toggleIsOpen] = createAction<{}>('TOGGLE_ISOPEN');

export const [UPDATE_ROOM_VOTETIME, updateRoomVoteTime] =
  createAction<{ sid: string; time: number }>('UPDATE_ROOM_VOTETIME');

export const [SET_CURRENT_GAME, setCurrentGame] = createAction<GameInfoType>('SET_CURRENT_GAME');
type roomAction =
  | ReturnType<typeof setRoomCode>
  | ReturnType<typeof setHost>
  | ReturnType<typeof setIsOpen>
  | ReturnType<typeof toggleIsOpen>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof addUsers>
  | ReturnType<typeof deleteUsers>
  | ReturnType<typeof addStreams>
  | ReturnType<typeof updateDeviceVideo>
  | ReturnType<typeof updateDeviceAudio>
  | ReturnType<typeof addStreams>
  | ReturnType<typeof setStreams>
  | ReturnType<typeof resetRoomInfo>
  | ReturnType<typeof addChatLog>
  | ReturnType<typeof updateRoomVoteTime>;

function roomReducer(state: RoomStateType = initialState, action: roomAction): RoomStateType {
  switch (action.type) {
    case SET_ROOM_CODE: {
      const roomCode = action.payload as string;
      return { ...state, roomCode };
    }
    case SET_HOST: {
      const { hostSID, isOpen } = action.payload as RoomHostType;
      return { ...state, hostSID, isOpen };
    }
    case SET_ISOPEN: {
      const isOpen = action.payload as boolean;
      return { ...state, isOpen };
    }
    case TOGGLE_ISOPEN: {
      const isOpen = !state.isOpen;
      return { ...state, isOpen };
    }
    case SET_USERS: {
      return {
        ...state,
        ...(action.payload as { users; usersDevices }),
      };
    }
    case SET_ISCHEERS: {
      const isCheers = action.payload as boolean;
      return { ...state, isCheers };
    }
    case SET_CLOSEUP_USER: {
      const closeUpUser = action.payload as string;
      return { ...state, closeUpUser };
    }
    case ADD_USERS: {
      const { sid, user, userDevices } = action.payload as {
        sid: string;
        user: UserType;
        userDevices: UserDevicesType;
      };
      const newUsers = { ...state.users, [sid]: user };
      const newUsersDevices = { ...state.usersDevices, [sid]: userDevices };
      return { ...state, users: newUsers, usersDevices: newUsersDevices };
    }
    case DELETE_USERS: {
      const sid = action.payload as string;
      if (!(sid in state.users) || !(sid in state.streams)) return { ...state };
      const newUsers = { ...state.users };
      delete newUsers[sid];
      const newStreams = { ...state.streams };
      delete newStreams[sid];
      return { ...state, users: newUsers, streams: newStreams };
    }
    case UPDATE_DEVICE_VIDEO: {
      const { sid, isVideoOn } = action.payload as { sid: string; isVideoOn: boolean };
      if (!(sid in state.users)) return { ...state };
      const newDevices = { ...state.usersDevices[sid], isVideoOn };
      const newUsersDevices = { ...state.usersDevices, [sid]: newDevices };
      return { ...state, usersDevices: newUsersDevices };
    }
    case UPDATE_DEVICE_AUDIO: {
      const { sid, isAudioOn } = action.payload as { sid: string; isAudioOn: boolean };
      if (!(sid in state.users)) return { ...state };
      const newDevices = { ...state.usersDevices[sid], isAudioOn };
      const newUsersDevices = { ...state.usersDevices, [sid]: newDevices };
      return { ...state, usersDevices: newUsersDevices };
    }
    case ADD_STREAMS: {
      const { sid, stream } = action.payload as { sid: string; stream: MediaStream };
      const newStreams = { ...state.streams, [sid]: stream };
      return { ...state, streams: newStreams };
    }
    case SET_STREAMS: {
      const streams = action.payload as { [sid: string]: MediaStream };
      return { ...state, streams };
    }
    case SET_MENUTYPE: {
      const menu = action.payload as string;
      const menuType = menu === state.menuType ? '' : menu;
      let unreadChat = state.unreadChat;
      if (menu === '채팅') unreadChat = 0;
      return { ...state, menuType, unreadChat };
    }
    case RESET_ROOM_INFO: {
      return {
        roomCode: '',
        menuType: '',
        currentGame: { title: '', host: '' },
        chatLog: [],
        unreadChat: 0,
        users: {},
        usersDevices: {},
        streams: {},
        voteTimes: {},
        hostSID: '',
        isOpen: true,
        isCheers: false,
        closeUpUser: '',
      };
    }
    case ADD_CHATLOG: {
      const data = { ...(action.payload as ChatLogType) };
      const newChatLog = [...state.chatLog, data];
      let unreadChat = state.unreadChat;
      if (state.menuType !== '채팅') unreadChat += 1;
      return { ...state, chatLog: newChatLog, unreadChat };
    }
    case UPDATE_ROOM_VOTETIME: {
      const { sid, time } = action.payload as { sid: string; time: number };
      if (!sid || !time) return state;
      const newVoteTimes = { ...state.voteTimes, [sid]: time };
      return {
        ...state,
        voteTimes: newVoteTimes,
      };
    }
    case SET_CURRENT_GAME: {
      const newGameState = action.payload as GameInfoType;
      return { ...state, currentGame: newGameState };
    }
    default:
      return state;
  }
}

export default roomReducer;
