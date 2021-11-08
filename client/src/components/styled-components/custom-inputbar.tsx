import styled from 'styled-components';

export const CustomInputBar = styled.input`
  border: none;
  background-color: #ffffff;
  width: 100%;
  height: 60px;
  &:focus {
    outline: none;
  }
  margin: 10px;
  font-size: 30px;
  padding: 0 30px;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 #d6d6d6;
`;

export const CustomInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin: 20px;
`;
