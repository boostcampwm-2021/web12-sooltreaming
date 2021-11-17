import React from 'react';
import { XIcon } from '@components/icons';
import { ToggleButton, IconDiv } from '@components/setting/DeviceToggleButton.style';

type DeviceToggleButtonTypes = {
  isDeviceOn: boolean;
  setIsDeviceOn: any;
  Icon: React.ReactElement | any;
};

const DeviceToggleButton: React.FC<DeviceToggleButtonTypes> = ({
  Icon,
  isDeviceOn,
  setIsDeviceOn,
}) => {
  return (
    <>
      <ToggleButton onClick={() => setIsDeviceOn((prev) => !prev)}>
        <IconDiv>{!isDeviceOn && <XIcon />}</IconDiv>
        <IconDiv>
          <Icon />
        </IconDiv>
      </ToggleButton>
    </>
  );
};

export default DeviceToggleButton;
