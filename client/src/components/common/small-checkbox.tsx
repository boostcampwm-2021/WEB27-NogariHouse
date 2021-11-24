import React, { FormEvent } from 'react';
import styled from 'styled-components';

export interface CheckBoxProps {
  checked: boolean,
  onChange: (event: FormEvent) => void,
  roomType?: string,
}

interface SmallCheckboxProps extends CheckBoxProps{
  id?: string,
  isDisabled?: boolean,
}

const CheckBox = styled.input`
  & {
    display: none;
  }

  & + label {
      position: absolute; 
      top: 0px; 
      right: 55px; 
      width: 15px;
      height: 15px;
      float: left;
      border-radius: 6px;
      border: 2px solid #bcbcbc;
      cursor: pointer;
    }

    & + label span {
      position: absolute; 
      top: -2px; 
      left: 20px; 
      display: block; 
      font-weight: bold;
      user-select: none;
    }

    &:checked + label {
      background-color: #4A6970;
    }
`;

function SmallCheckbox({
  id, isDisabled, onChange, checked,
}: SmallCheckboxProps) {
  return (
    <CheckBox type="checkbox" id={id} disabled={isDisabled} checked={checked} onChange={onChange} />
  );
}

export default SmallCheckbox;
