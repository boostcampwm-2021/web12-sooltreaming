export type DropdownPropType = {
  renderButton: (prop?: any) => React.ReactNode;
  renderItem: (prop?: any) => React.ReactNode;
  itemList: any[];
};

export type ModalPosType = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export type ModalPropType = {
  children: any;
  isOpen: boolean;
  renderCenter?: boolean;
  isRelative?: boolean;
  relativePos?: ModalPosType;
  absolutePos?: ModalPosType;
};
