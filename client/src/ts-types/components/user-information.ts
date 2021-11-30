export type FriendType = {
  imgUrl: string;
  nickname: string;
  children: JSX.Element[] | JSX.Element;
};

export type NicknameLogType = Array<{ nickname: string }>;

export type InformationPropType = {
  id: string;
  imgUrl: string;
  nickname: string;
};

export type UserProfilePropType = {
  id: string;
  imgUrl: string;
  nickname: string;
  nicknameLog: NicknameLogType;
};

export type FriendDeleteModalPropType = {
  id: string;
  nickname: string;
};

export type FriendInfoModalPropType = {
  id: string;
  nickname: string;
  imgUrl: string;
};

export type NickLogModalPropType = {
  nickname: string;
  nicknameLog: NicknameLogType;
};

export type RankingBoxPropType = {
  title: string;
  rank: { _id: string }[];
  nowSelect: string;
  filterList: string[];
};

export type MenuPropType = {
  menu: string;
};
