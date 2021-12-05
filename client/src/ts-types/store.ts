export type DeviceStateType = {
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSpeakerOn: boolean;
  videoInfo: MediaDeviceInfo | null;
  audioInfo: MediaDeviceInfo | null;
  speakerInfo: MediaDeviceInfo | null;
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  speakerDevices: MediaDeviceInfo[];
  stream: MediaStream;
  isLoading: boolean;
  isVideoLoading: boolean;
  isAudioLoading: boolean;
};

export type DeviceInitTypes = {
  videoInfo: MediaDeviceInfo | null;
  audioInfo: MediaDeviceInfo | null;
  speakerInfo: MediaDeviceInfo | null;
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  speakerDevices: MediaDeviceInfo[];
  stream: MediaStream;
};

export type FailureType = { message: string };

export type FriendInfoType = {
  _id: string;
  nickname: string;
  imgUrl: string;
};

export type FriendStateType = {
  friendList: FriendInfoType[];
  sendFriendList: FriendInfoType[];
  receiveFriendList: FriendInfoType[];
};

export type NoticeStateType = {
  errorMessage: string;
};

export type ErrorMessageType = {
  errorMessage: string;
};

export type RoomStateType = {
  roomCode: string;
  menuType: string;
  currentGame: GameInfoType;
  chatLog: Array<ChatLogType>;
  unreadChat: number;
  users: { [sid: string]: UserType };
  usersDevices: { [sid: string]: UserDevicesType };
  streams: { [sid: string]: MediaStream };
  voteTimes: { [sid: string]: number };
  hostSID: string;
  isOpen: boolean;
  isCheers: boolean;
  closeUpUser: string;
};

export type RoomHostType = {
  hostSID: string;
  isOpen: boolean;
};

export type UserDevicesType = {
  isVideoOn: boolean;
  isAudioOn: boolean;
};

export type GameInfoType = {
  title: string;
  host: string;
};

export type ChatLogType = {
  sid: string;
  msg: string;
  date: string;
};

export type UserStateType = {
  id: string;
  imgUrl: string;
  nickname: string;
  isLoadingUser: boolean;
  errorStatus: string;
};

export type UserType = {
  id: string;
  imgUrl: string;
  nickname: string;
};
