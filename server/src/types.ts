import type { Socket } from 'socket.io';
import type { SchemaDefinitionProperty } from 'mongoose';

// controller : passport
export type GithubProfileType = {
  login: string;
  avatar_url: string;
};

export type NaverProfileType = {
  email: string;
  nickname: string;
  profile_image: string;
  age: number | undefined;
  birthday: any;
};

// controller : socket
export type TargetInfoType = {
  code: string;
};

export type RoomType = {
  [code: string]: {
    hostSID: string;
    isOpen: boolean;
    waiters: Array<string>;
    closeupUser: string;
    users: {
      [sid: string]: {
        id: string;
        nickname: string;
        imgURL: string;
        enterTime: number;
      };
    };
    usersDevices: {
      [sid: string]: {
        [deviceOn: string]: boolean;
      };
    };
    status: string;
    vote: {
      trial: NodeJS.Timeout | null;
      defendant: string;
      cool: { [sid: string]: number };
      voteBox: {
        [sid: string]: { isApprove: boolean; isVoted: boolean };
      };
    };
    game: {
      title: string;
      host: string;
    };
  };
};

export type SocketPropType = {
  io: any;
  socket: Socket;
  rooms: RoomType;
  targetInfo: TargetInfoType;
};

export type EnterPropType = {
  io: any;
  socket: Socket;
  rooms: RoomType;
};

// models
export type LiarGameKeywords = {
  keyword: string;
};

export type NicknameLog = {
  userId: SchemaDefinitionProperty<string>;
  nickname: string;
};

export type UserType = {
  githubId: string;
  naverId: string;
  nickname: string;
  imgUrl: string;

  chatCount: number;
  hookCount: number;
  pollCount: number;
  closeupCount: number;
  dieCount: number;
  cheersCount: number;
  starterCount: number;
  totalSeconds: number;

  title: Array<String>;

  sendFriend: Array<String>;
  receiveFriend: Array<String>;
  friend: Array<String>;
};
