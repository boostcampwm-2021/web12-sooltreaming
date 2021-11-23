import {
  Friend,
} from '@components/user-information/FriendItem.style';

type FriendType = {
  imgUrl: string;
  nickname: string;
  children: JSX.Element[] | JSX.Element;
}

export const FriendItem: React.FC<FriendType> = ({imgUrl, nickname, children}) => {
  return(       
    <Friend>
      <div className="left-items">
        <img src={imgUrl} alt="프로필사진" />
        <p>{nickname}</p>
      </div>
      <div className="right-items">
        {children}
      </div>
    </Friend>
  );
}