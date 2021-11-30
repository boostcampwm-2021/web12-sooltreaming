import React, { useState, useRef } from 'react';
import {
  Container,
  ItemList,
  ItemListBox,
  ToggleButton,
} from '@components/custom/Dropdown.style.js';
import type { dropdownPropType } from '@ts-types/components/custom';

const Dropdown: React.FC<dropdownPropType> = ({ renderButton, renderItem, itemList }) => {
  const [isActive, setActive] = useState<boolean>(false);
  const isMouseOn = useRef<boolean>(false);

  const toggleDropdown = () => {
    setActive((prev) => !prev);
  };
  const closeDropdown = () => {
    if (isMouseOn.current) return;
    setActive(false);
  };

  return (
    <Container
      onMouseEnter={() => (isMouseOn.current = true)}
      onMouseLeave={() => (isMouseOn.current = false)}
    >
      <ToggleButton onClick={toggleDropdown} onBlur={closeDropdown}>
        {renderButton()}
      </ToggleButton>
      {isActive && (
        <ItemListBox>
          <ItemList>
            {itemList.map((item) => renderItem({ closeDropdown: () => setActive(false), item }))}
          </ItemList>
        </ItemListBox>
      )}
    </Container>
  );
};

export default Dropdown;
