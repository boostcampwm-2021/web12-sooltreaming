import {
  FriendItemBox,
  LeftBox,
  RightBox,
} from '@components/user-information/friend-list/FriendItem.style';
import type { FriendType } from '@ts-types/components/user-information';

export const FriendItem: React.FC<FriendType> = ({
  imgUrl,
  nickname,
  children,
}): React.ReactElement => {
  return (
    <FriendItemBox>
      <LeftBox>
        <img src={imgUrl} alt="프로필사진" />
        <p>{nickname}</p>
      </LeftBox>
      <RightBox>{children}</RightBox>
    </FriendItemBox>
  );
};
