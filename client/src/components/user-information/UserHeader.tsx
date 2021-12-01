import {
  HeaderBox,
  Title,
  SecondHeaderBox,
  MenuList,
  MenuItem,
} from '@components/user-information/UserHeader.style';
import { useHistory } from 'react-router-dom';

const LISTED_MENU = ['information', 'friendList', 'ranking'];
const MENU_NAME = {
  information: '내 정보',
  friendList: '친구 목록',
  ranking: '랭킹',
};

const UserHeader: React.FC<any> = ({ menu, defineMenu }): React.ReactElement => {
  const history = useHistory();

  const goBack = () => {
    history.push('/');
  };

  return (
    <>
      <HeaderBox>
        <img src="/images/LeftIcon.png" alt="뒤로가기" onClick={goBack} />
        <Title>마이 페이지</Title>
      </HeaderBox>
      <SecondHeaderBox>
        <MenuList>
          {LISTED_MENU.map((menuType) => (
            <MenuItem
              key={`UserMenu-${menuType}`}
              isSelected={menu === menuType}
              onClick={defineMenu(menuType)}
            >
              {MENU_NAME[menuType]}
            </MenuItem>
          ))}
        </MenuList>
      </SecondHeaderBox>
    </>
  );
};

export default UserHeader;
