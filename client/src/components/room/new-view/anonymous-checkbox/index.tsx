import React, { useEffect, useRef } from 'react';

import SmallCheckbox, { CheckBoxProps } from '@common/small-checkbox';
import { AnonymousCheckBoxLayout, Text } from './style';

function AnonymousCheckBox({
  checked, onChange, roomType, text,
}: CheckBoxProps) {
  const smallCheckboxLayoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!smallCheckboxLayoutRef.current) return;
    smallCheckboxLayoutRef.current.style.visibility = (roomType === 'closed') ? 'hidden' : 'visible';
  }, [roomType]);

  return (
    <AnonymousCheckBoxLayout ref={smallCheckboxLayoutRef}>
      <SmallCheckbox id="c1" checked={checked} onChange={onChange} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={'c1' as string}>
        <Text>{text}</Text>
      </label>
    </AnonymousCheckBoxLayout>
  );
}

export default AnonymousCheckBox;
