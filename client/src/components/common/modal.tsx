import { opacityFromTo, slideYFromTo } from '@src/assets/styles/keyframe';
import styled from 'styled-components';

export const ModalBox = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  top: 20%;
  display: flex;
  flex-direction: column;
  background-color: #F1F0E4;
  border-radius: 32px;
  padding: 56px;
  margin-left: calc(25% - 56px);
  box-shadow: rgb(0 0 0 / 55%) 0px 10px 25px;
  z-index: 990;
  opacity: 1;
  
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${slideYFromTo(300, 0)};
  animation-fill-mode: forward;
`;

// 모달 아래에 존재 할 Background
export const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  z-index: 980;
  background: gray;
  opacity: 0.8;
  overflow: hidden;

  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-name: ${opacityFromTo(0, 0.8)};
`;
