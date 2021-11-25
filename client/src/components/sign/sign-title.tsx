import React from 'react';
import styled from 'styled-components';

type TSignTitleProps = {
  title: string;
}

const TitleDiv = styled.div`
  width: max-content;
  font-size: min(6vw, 60px);
  text-align: center;
  
`;

function SignTitle({
  title,
}: TSignTitleProps) {
  return (
    <TitleDiv>{ title }</TitleDiv>
  );
}

export default SignTitle;
