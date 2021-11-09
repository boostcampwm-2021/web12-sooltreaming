import React, { useState } from 'react';
import Dropdown from '@components/custom/Dropdown';
import { DownIcon, XIcon } from '@components/icons';
import { Wrapper, ToggleButton, MenuButton, MenuItem, IconDiv } from './SettingMenu.style';

type settingMenuTypeProps = {
  menuList: MediaDeviceInfo[];
  selected: MediaDeviceInfo | any;
  setSelected: any;
  isDeviceOn: boolean;
  setIsDeviceOn: any;
  Icon: React.ReactElement | any;
};

const SettingMenu: React.FC<settingMenuTypeProps> = ({
  menuList,
  selected,
  setSelected,
  isDeviceOn,
  setIsDeviceOn,
  Icon,
}) => {
  const choiceMenu = (toggleDropdown, item) => () => {
    setSelected(item);
    toggleDropdown();
  };

  return (
    <Wrapper>
      <ToggleButton onClick={() => setIsDeviceOn((prev) => !prev)}>
        <IconDiv>{!isDeviceOn && <XIcon />}</IconDiv>
        <IconDiv>
          <Icon />
        </IconDiv>
      </ToggleButton>
      <Dropdown
        renderButton={() => (
          <MenuButton>
            <span>{selected.label}</span>
            <DownIcon />
          </MenuButton>
        )}
        renderItem={({ closeDropdown, item }) => (
          <MenuItem key={item.label} onClick={choiceMenu(closeDropdown, item)}>
            {item.label}
          </MenuItem>
        )}
        itemList={menuList}
      />
    </Wrapper>
  );
};

export default SettingMenu;
