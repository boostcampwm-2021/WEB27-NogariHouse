import scrollbarStyle from '@src/assets/styles/scrollbar-style';
import styled from 'styled-components';

const SignBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
  ${scrollbarStyle};
`;

export default SignBody;
