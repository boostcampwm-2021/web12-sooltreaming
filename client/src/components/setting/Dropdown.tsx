import React, { useState } from 'react';
import DownIcon from '@components/icons/DownIcon';
import { Wrapper, MenuButton, Menu, MenuItem, Text } from './Dropdown.style.js';

type menuType = {
  menu: string;
  menuList: Array<string>;
  setMenu: Function;
};

const Dropdown: React.FC<menuType> = ({ menu, menuList, setMenu }) => {
  const [isActive, setActive] = useState(false);

  const toggleMenu = () => {
    setActive((prev) => !prev);
  };

  const choiceMenu = (event) => {
    const value = event.target?.innerText;
    setMenu('value', value);
    toggleMenu();
  };

  return (
    <Wrapper>
      <MenuButton onClick={toggleMenu}>
        <Text>{menu}</Text>
        <DownIcon />
      </MenuButton>
      {isActive && (
        <Menu>
          {menuList.map((menu, index) => (
            <MenuItem key={index} onClick={choiceMenu}>
              {menu}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};

export default Dropdown;
