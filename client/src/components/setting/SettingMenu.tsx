import React, { useState } from 'react';
import Dropdown from '@components/setting/Dropdown';

import { Wrapper, NoneButton } from './SettingMenu.style.js';

type settingMenuTypeProps = {
  menuList: Array<string>;
  Icon: React.ReactElement | any;
}

const SettingMenu: React.FC<settingMenuTypeProps> = ({ menuList, Icon }) => {
  const [menu, setMenu] = useState({
    isActive: true,
    value: menuList[0]
  });

  const toggleMenu = (type, value) => {
    setMenu((prev) => {
      return {
        ...prev, 
        [type]: value
      }
    });
  };

  return (
    <Wrapper>
      <NoneButton onClick={() => toggleMenu('isActive', !menu.isActive)}>
        <Icon 
          state={menu.isActive}
        />
      </NoneButton>
      <Dropdown 
        menu={menu.value}
        menuList={menuList} 
        setMenu={toggleMenu}
      />
    </Wrapper>
  );
};


export default SettingMenu;
