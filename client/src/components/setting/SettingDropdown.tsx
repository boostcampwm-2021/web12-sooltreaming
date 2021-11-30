import React from 'react';
import Dropdown from '@components/custom/Dropdown';
import { DownIcon } from '@components/icons';
import { MenuButton, MenuItem } from '@components/setting/SettingDropdown.style';
import { filterLabel } from '@utils/regExpr';
import type { SettingDropdownPropType } from '@ts-types/components/setting';

const SettingDropdown: React.FC<SettingDropdownPropType> = ({
  menuList,
  selected,
  setSelected,
}): React.ReactElement => {
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
