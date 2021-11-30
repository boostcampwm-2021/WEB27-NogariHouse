import React from 'react';

import { IUserImageProps, ImageLayout } from './style';

function UserImage({ src, size } : IUserImageProps) {
  return (
    <ImageLayout src={src} size={size} />
  );
}

export default UserImage;
