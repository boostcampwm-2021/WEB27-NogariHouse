import styled from 'styled-components';

export const Box = styled.button`
  width : 25%;
  height : 100%;
  background-color:${(props : {isSelected : boolean}) => (props.isSelected ? '#FFF' : '#E9E5E5')};
  border-radius: 30px;
  display : flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border:none;
  box-shadow: ${(props : {isSelected : boolean}) => (props.isSelected ? '0px 2px 1px' : 'none')};
`;

export const BoxText = styled.div`
  font-size: 14px;
`;
