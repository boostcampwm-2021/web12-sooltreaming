import {
  Friend,
  LeftBox,
  RightBox,
} from '@components/user-information/friend-list/FriendItem.style';

type FriendType = {
  imgUrl: string;
  nickname: string;
  children: JSX.Element[] | JSX.Element;
};

export const FriendItem: React.FC<FriendType> = ({ imgUrl, nickname, children }) => {
  return (
    <Friend>
      <LeftBox>
        <img src={imgUrl} alt="프로필사진" />
        <p>{nickname}</p>
      </LeftBox>
      <RightBox>{children}</RightBox>
    </Friend>
  );
};
