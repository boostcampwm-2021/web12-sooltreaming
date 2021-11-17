import React from 'react';
import { Wrapper } from '@components/setting/SettingMenu.style';
import DeviceToggleButton from '@components/setting/DeviceToggleButton';
import SettingDropdown from '@components/setting/SettingDropdown';
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
  return (
    <Wrapper>
      <DeviceToggleButton Icon={Icon} isDeviceOn={isDeviceOn} setIsDeviceOn={setIsDeviceOn} />
      <SettingDropdown menuList={menuList} selected={selected} setSelected={setSelected} />
    </Wrapper>
  );
};

export default SettingMenu;
