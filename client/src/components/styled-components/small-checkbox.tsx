import React, { FormEvent } from 'react';
import styled from 'styled-components';

export interface CheckBoxProps {
  checked: boolean,
  onChange: (event: FormEvent) => void;
}

interface SmallCheckboxProps extends CheckBoxProps{
  id?: string;
  isDisabled?: boolean;
}

const CheckBox = styled.input`

  & + label {
      font-size: 14px;
      line-height: 21px;
      display: block;
      cursor: pointer;
      margin-left: 4px;
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
