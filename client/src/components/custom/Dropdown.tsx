import React, { useState } from 'react';
import { Container, ItemList, ItemListBox, ToggleButton } from './Dropdown.style.js';

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
    <Container onMouseEnter={() => setIsMouseOn(true)} onMouseLeave={() => setIsMouseOn(false)}>
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
