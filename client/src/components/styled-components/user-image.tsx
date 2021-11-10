/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface userImageProps {
  profileUrl: string,
}

function UserImage(props : userImageProps) {
  const ImageLayout = styled.img`
    width: 60px;
    min-width: 48px;
    height: 60px;
    border-radius: 30%;
    overflow: hidden;
    background-color: #6F8A87;
  `;

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <ImageLayout src={props.profileUrl} />
  );
}

export default UserImage;
