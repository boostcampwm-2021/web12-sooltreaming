import React, { useState, useRef } from 'react';
import { Container, ItemList, ItemListBox, ToggleButton } from './Dropdown.style.js';

interface dropdownPropTypes {
  renderButton: (prop?: any) => React.ReactNode;
  renderItem: (prop?: any) => React.ReactNode;
  itemList: any[];
}

const Dropdown: React.FC<dropdownPropTypes> = ({ renderButton, renderItem, itemList }) => {
  const [isActive, setActive] = useState(false);
  const isMouseOn = useRef(false);

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
