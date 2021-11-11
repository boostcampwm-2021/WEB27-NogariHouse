import React from 'react';
import styled from 'styled-components';

interface SignTitleProps {
  title: string;
}

const TitleDiv = styled.div`
  height: 70px;
  width: calc(740px*100vw/1440px);
  font-size: 4rem;
  min-width: 650px;
`;

function SignTitle({
  title,
}: SignTitleProps) {
  return (
    <TitleDiv>{ title }</TitleDiv>
  );
}

export default SignTitle;
