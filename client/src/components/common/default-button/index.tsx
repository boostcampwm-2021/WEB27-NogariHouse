import React from 'react';

import { CustomDefaultButton, DefaultButtonProps } from './style';

const DefaultButton = React.memo(({
  buttonType,
  children,
  size,
  isDisabled,
  onClick,
  font,
}: DefaultButtonProps) => (
  <CustomDefaultButton
    type="button"
    buttonType={buttonType}
    size={size}
    disabled={isDisabled}
    onClick={onClick}
    font={font}
  >
    {children}
  </CustomDefaultButton>
));

export default DefaultButton;
