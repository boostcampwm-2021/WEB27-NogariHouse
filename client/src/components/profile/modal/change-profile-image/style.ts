import styled from 'styled-components';

export const ChangePofileImageLayout = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

export const PreviewProfileImage = styled.img`
width: 150px;
height: 150px;
min-height: 150px;
object-fit: cover;
border-radius: 30px;
border: 0.1px solid #b8b8b8;

&:hover{
  cursor: pointer;
};
`;

export const CustomForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
height: 100%;
`;

export const ButtonsLayout = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 120px;
`;

export const CustomInput = styled.input`
display: none;

& + label {
    width: 200x;
    height: 200px;
    cursor: pointer;
}
`;
