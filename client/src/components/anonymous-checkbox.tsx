import React from 'react';
import styled from 'styled-components';

import SmallCheckbox, { CheckBoxProps } from '@styled-components/small-checkbox';

const AnonymousCheckBoxLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

function AnonymousCheckBox({ checked, onChange }: CheckBoxProps) {
  return (
    <AnonymousCheckBoxLayout>
      <SmallCheckbox id="c1" checked={checked} onChange={onChange} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={'c1' as string}>Allow anonymous ?</label>
    </AnonymousCheckBoxLayout>
  );
}

export default AnonymousCheckBox;
