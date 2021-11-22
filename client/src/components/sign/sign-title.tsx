import React from 'react';
import styled from 'styled-components';

interface SignTitleProps {
  title: string;
}

const TitleDiv = styled.div`
  width: max-content;
  font-size: min(6vw, 60px);
  text-align: center;
  
`;

function SignTitle({
  title,
}: SignTitleProps) {
  return (
    <TitleDiv>{ title }</TitleDiv>
  );
}

export default SignTitle;
