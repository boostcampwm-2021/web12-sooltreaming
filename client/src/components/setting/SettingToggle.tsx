import React from 'react';
import { XIcon } from '@components/icons';
import { ToggleButton } from '@components/setting/SettingToggle.style';
import type { SettingTogglePropType } from '@ts-types/components/setting';

const SettingToggle: React.FC<SettingTogglePropType> = ({ Icon, isDeviceOn, setIsDeviceOn }) => {
  return (
    <ToggleButton onClick={() => setIsDeviceOn((prev) => !prev)}>
      <Icon />
      {!isDeviceOn && <XIcon />}
    </ToggleButton>
  );
};

export default SettingToggle;
