import styled from 'styled-components';

export const CustomTitleForm = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`;

export const TitleInputbar = styled.input`
background: none;
color: #58964F;
font-size: 18px;
padding: 10px 10px 10px 5px;
display: block;
border: none;
border-radius: 0;
border-bottom: 1px solid #58964F;
&:focus {
  outline: none;
}
`;

export const CheckboxLayout = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width: 100%;
`;

export const TitleInputbarLabel = styled.label`
font-size: 12px;
color: #B6B6B6;
`;
