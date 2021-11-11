import styled from 'styled-components';

import { spinner } from '@styles/keyframe';

export default styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: #c4c0ae;
  border-bottom-color: #c4c0ae;
  animation: ${spinner()} .8s ease infinite;
`;
