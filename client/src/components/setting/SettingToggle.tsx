import React from 'react';
import { XIcon } from '@components/icons';
import { ToggleButton } from '@components/setting/SettingToggle.style';

type SettingToggleTypes = {
  isDeviceOn: boolean;
  setIsDeviceOn: any;
  Icon: React.ReactElement | any;
};

const SettingToggle: React.FC<SettingToggleTypes> = ({ Icon, isDeviceOn, setIsDeviceOn }) => {
  return (
    <ToggleButton onClick={() => setIsDeviceOn((prev) => !prev)}>
      <Icon />
      {!isDeviceOn && <XIcon />}
    </ToggleButton>
  );
};

export default SettingToggle;
