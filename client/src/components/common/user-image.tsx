import React from 'react';
import styled from 'styled-components';

interface IUserImageProps {
  src: string,
  size: 'default' | 'others'
}

const sizes = {
  default: { widthSize: 60, heightSize: 60 },
  others: { widthSize: 40, heightSize: 40 },
};

const ImageLayout = styled.img`
  width: ${(props:IUserImageProps) => (sizes[props.size].widthSize)}px;
  height: ${(props:IUserImageProps) => (sizes[props.size].heightSize)}px;;
  border-radius: 30%;
  overflow: hidden;
  background-color: #6F8A87;
`;

function UserImage(props : IUserImageProps) {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <ImageLayout src={props.src} size={props.size} />
  );
}

export default UserImage;
