import styled from 'styled-components';

export const SelectHeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #B6B6B6;
`;

export const SelectHeader = styled.div`
  width: 90%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  p{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;

    font-weight: Bold;
    font-size: min(4vw,28px);

    margin: 0px;
  }
`;

export const BtnStyle = styled.button`
  font-size: min(4vw,28px);

  background-color: transparent;
  border: none;
  color: #58964F;

  &:hover {
    filter: invert(88%) sepia(1%) saturate(4121%) hue-rotate(12deg) brightness(62%) contrast(79%);
    cursor: pointer;
  }
`;
