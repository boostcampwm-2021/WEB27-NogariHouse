import styled from 'styled-components';

export interface IUserImageProps {
    src: string,
    size: 'default' | 'others'
  }

const sizes = {
  default: { widthSize: 60, heightSize: 60 },
  others: { widthSize: 40, heightSize: 40 },
};

export const ImageLayout = styled.img`
  width: ${(props:IUserImageProps) => (sizes[props.size].widthSize)}px;
  height: ${(props:IUserImageProps) => (sizes[props.size].heightSize)}px;;
  border-radius: 30%;
  overflow: hidden;
  background-color: #6F8A87;
`;
