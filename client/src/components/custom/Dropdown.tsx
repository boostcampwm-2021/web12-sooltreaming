import React, { useState } from 'react';
import { Wrapper, ItemList, ItemListWrapper, ToggleButton } from './Dropdown.style.js';

interface dropdownPropTypes {
  renderButton: (prop?: any) => React.ReactNode;
  renderItem: (prop?: any) => React.ReactNode;
  itemList: any[];
}

const Dropdown: React.FC<dropdownPropTypes> = ({ renderButton, renderItem, itemList }) => {
  const [isActive, setActive] = useState(false);
  const [isMouseOn, setIsMouseOn] = useState(false);

  const toggleDropdown = () => {
    setActive((prev) => !prev);
  };
  const closeDropdown = () => {
    if (isMouseOn) return;
    setActive(false);
  };

  return (
    <Wrapper onMouseEnter={() => setIsMouseOn(true)} onMouseLeave={() => setIsMouseOn(false)}>
      <ToggleButton onClick={toggleDropdown} onBlur={closeDropdown}>
        {renderButton()}
      </ToggleButton>
      {isActive && (
        <ItemListWrapper>
          <ItemList>
            {itemList.map((item) => renderItem({ closeDropdown: () => setActive(false), item }))}
          </ItemList>
        </ItemListWrapper>
      )}
    </Wrapper>
  );
};

export default Dropdown;
