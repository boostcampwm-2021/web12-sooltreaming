import React, { MouseEventHandler } from 'react';

export type QuestionMarkPropType = {
  x: number;
  y: number;
};

export type ChatItemPropType = {
  isSelf: boolean;
  message: string;
  date: string;
  sid: string;
};

export type ChatPropType = {
  sendMessage: Function;
};

export type GameBoxPropType = {
  icon: React.ReactNode;
  title: string;
  start: MouseEventHandler;
};

export type GamesPropType = {
  startGamesRef: React.MutableRefObject<Object>;
};

export type LiarGamePropType = {
  keywordRef: React.MutableRefObject<string>;
};

export type UpdownGamePropType = {
  randomNumRef: React.MutableRefObject<string>;
};

export type OtherVideoPropType = {
  className: string;
  otherStream: MediaStream;
  sid: string;
};

export type ScaffoldPropType = {
  startVoteRef: React.MutableRefObject<Function>;
};

export type VotersPropType = {
  total: number;
  approves: number;
  rejects: number;
};

export type ControlBarPropType = {
  onClickCheers: Function;
  activateCloseup: Function;
  deactivateCloseup: Function;
};

export type RoomMenuPropType = {
  startVoteRef: React.MutableRefObject<Function>;
  startGamesRef: React.MutableRefObject<Object>;
  onclickRequestFriend: (prop: {
    sid: string;
    id: string;
    imgUrl: string;
    nickname: string;
  }) => Promise<void>;
};
