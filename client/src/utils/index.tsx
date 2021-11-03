import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface IconAndLink {
    Component:IconType,
    link: string,
    size?: number,
    color?: string,
  }

// eslint-disable-next-line import/prefer-default-export
export const makeIconToLink = ({
  Component, link, size = 48, color = 'black',
}: IconAndLink) => (
  <Link to={link}>
    <Component size={size} color={color} />
  </Link>
);
