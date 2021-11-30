import styled from 'styled-components';

import { ModalBox } from '@styles/modal';

export const CustomEventRegisterModal = styled(ModalBox)`
  top: 15vh;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;
  min-height: 500px;
  padding: 0px;
  background-color:white;
  border-radius: 30px;
  background-color: #F1F0E4;
`;

export const ModalHeader = styled.div`
  margin: 20px;
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

export const CustomEventForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CustomFormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
`;

export const CancelButton = styled.button`
  color : #58964F;
  border: none;
  background-color: #F1F0E4;
  &:hover {
    cursor: pointer;
  }
`;

export const PublishButton = styled.button`
  color :  #586A9A;
  border: none;
  background-color: #F1F0E4;
  &:hover {
    cursor: pointer;
  }
  :disabled{
    color : #B6B6B6;
    &:hover {
      cursor: default;
    }
  }
`;

export const CustomInput = styled.input`
  border: none;
  background-color: #FFF;
  width: 80%;
  &:focus {outline:none;}
  margin: 5px;
`;

export const CustomInputDiv = styled.div`
  display: flex;
  height:20px;
  width: 80%;
  margin: 5px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    }
`;

export const CustomTextArea = styled.textarea`
  border: none;
  background-color: #FFF;
  width: 80%;
  height: 200px;
  margin: 5px;
  &:focus {outline:none;}
`;

export const SelectUserComponent = styled.div`
  padding: 0px 5px;
  background-color: #F1F0E4;
  border-radius: 30px;

  font-family: 'Nunito';
  color: #819C88;

  cursor: default;
`;

export const InputDescSpan = styled.span`
  color : gray;
`;

export const AddGuestSpan = styled.span`
  color : gray;
  &:hover {
    cursor: pointer;
  }
`;
