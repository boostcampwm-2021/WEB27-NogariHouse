import React from 'react';
import styled from 'styled-components';

import SmallCheckbox, { CheckBoxProps } from '@common/small-checkbox';

const AnonymousCheckBoxLayout = styled.div`
  position: relative; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  width: 150px;
  font-size: 14px;
  line-height: 21px;
  display: block;
  margin-left: 4px;
`;

function AnonymousCheckBox({ checked, onChange }: CheckBoxProps) {
  return (
    <AnonymousCheckBoxLayout>
      <SmallCheckbox id="c1" checked={checked} onChange={onChange} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={'c1' as string}>
        <Text>Allow anonymous ?</Text>
      </label>
    </AnonymousCheckBoxLayout>
  );
}

export default AnonymousCheckBox;
