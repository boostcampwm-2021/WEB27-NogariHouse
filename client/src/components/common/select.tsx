import styled from 'styled-components';

export const SelectDiv = styled.div`
  width: 90%;
  height: 50px;

  position: relative;

  p {
    position: absolute;
    margin: 15px 20px 0px 30px;

    font-size: 20px;
    font-weight: bold;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #DCD9CD;

    &:hover {
      background-color: #CECABB;
    }
  }
`;

export const SelectInputBar = styled.input`
  position: absolute;
  top: 11px;
  left: 90px;

  width: 300px;
  height: 30px;

  border: none;
  font-size: 18px;
  font-family: 'Nunito';

  &:focus {
    outline: none;
  }
`;

export const SelectedUserDiv = styled.div`
  margin: 0% 15% 0% 15%;


  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const SelectUserComponent = styled.div`
  margin: 0px 10px 5px 0px;
  padding: 0px 10px;
  background-color: #F1F0E4;
  border-radius: 30px;

  line-height: 30px;
  font-family: 'Nunito';
  color: #819C88;

  cursor: pointer;
`;
