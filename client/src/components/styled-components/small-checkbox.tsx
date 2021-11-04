import React from 'react';
import styled from 'styled-components';

interface SmallCheckboxProps {
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

function SmallCheckbox({ id, isDisabled }: SmallCheckboxProps) {
  return (
    <CheckBox type="checkbox" id={id} disabled={isDisabled} />
  );
}

export default SmallCheckbox;
