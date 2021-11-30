import { MouseEventHandler } from 'react';

export type UsersPropType = {
  startVoteRef: React.MutableRefObject<Function>;
  onclickRequestFriend: (prop?: any) => MouseEventHandler;
};
