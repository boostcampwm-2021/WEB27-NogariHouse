import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface IconAndLink {
    Component:IconType,
    link: string,
    size?: number,
    color?: string,
  }

export const makeIconToLink = ({
  Component, link, size = 48, color = 'black',
}: IconAndLink) => (
  <Link to={link}>
    <Component size={size} color={color} />
  </Link>
);

// Date객체 -> 시간 : 분 string 으로 변환
export const makeDateToHourMinute = (date : Date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
