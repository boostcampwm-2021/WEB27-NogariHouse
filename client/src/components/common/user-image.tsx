/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface userImageProps {
  src: string,
  size: 'default' | 'others'
}

const sizes = {
  default: { widthSize: 60, heightSize: 60 },
  others: { widthSize: 40, heightSize: 40 },
};

const ImageLayout = styled.img`
  width: ${(props:userImageProps) => (sizes[props.size].widthSize)}px;
  height: ${(props:userImageProps) => (sizes[props.size].heightSize)}px;;
  border-radius: 30%;
  overflow: hidden;
  background-color: #6F8A87;
`;

function UserImage(props : userImageProps) {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <ImageLayout src={props.src} size={props.size} />
  );
}

export default UserImage;
