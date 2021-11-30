import React from 'react';

import { TitleDiv } from './style';

type TSignTitleProps = {
  title: string;
}

function SignTitle({
  title,
}: TSignTitleProps) {
  return (
    <TitleDiv>{ title }</TitleDiv>
  );
}

export default SignTitle;
