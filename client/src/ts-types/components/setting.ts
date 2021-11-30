export type SettingPropType = {
  renderRoom: Function;
};

export type settingDropdownPropType = {
  menuList: MediaDeviceInfo[];
  selected: MediaDeviceInfo | null;
  setSelected: Function;
};

export type SettingTogglePropType = {
  isDeviceOn: boolean;
  setIsDeviceOn: Function;
  Icon: Function;
};
