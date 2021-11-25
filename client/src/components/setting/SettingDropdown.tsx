import React from 'react';
import Dropdown from '@components/custom/Dropdown';
import { DownIcon } from '@components/icons';
import { MenuButton, MenuItem } from '@components/setting/SettingDropdown.style';
import { filterLabel } from '@utils/regExpr';

type settingDropdownTypeProps = {
  menuList: MediaDeviceInfo[];
  selected: MediaDeviceInfo | any;
  setSelected: any;
};

const SettingDropdown: React.FC<settingDropdownTypeProps> = ({
  menuList,
  selected,
  setSelected,
}) => {
  const choiceMenu = (toggleDropdown, item) => () => {
    setSelected(item);
    toggleDropdown();
  };

  return (
    <Dropdown
      renderButton={() => (
        <MenuButton>
          <span>{filterLabel(selected?.label)}</span>
          <DownIcon />
        </MenuButton>
      )}
      renderItem={({ closeDropdown, item }) => (
        <MenuItem key={`Device-${item?.label}`} onClick={choiceMenu(closeDropdown, item)}>
          {filterLabel(item?.label)}
        </MenuItem>
      )}
      itemList={menuList}
    />
  );
};

export default SettingDropdown;
