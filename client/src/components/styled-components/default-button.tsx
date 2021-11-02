/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';

interface DefaultButtonProps {
    customColor : string,
    text : string,
    size : 'small' | 'medium' | 'large'
}

const sizes = {
  small: { width: 224, height: 56 },
  medium: { width: 224, height: 56 },
  large: { width: 224, height: 56 },
};

const CustomDefaultButton = styled(Button)`
    background-color : ${(props : DefaultButtonProps) => props.customColor};
    width : ${(props : DefaultButtonProps) => sizes[props.size].width}px;
    height: ${(props : DefaultButtonProps) => sizes[props.size].height}px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    font-family: "Bangers";
`;

function DefaultButton({ customColor, text, size } : DefaultButtonProps) {
  return (
    <button type="button">
      {text}
    </button>
  );
}

export default DefaultButton;
