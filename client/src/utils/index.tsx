import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface IconAndLink {
    Component:IconType,
    key: string | number,
    link: string,
    size?: number,
    color?: string,
  }

export const makeIconToLink = ({
  Component, link, key, size = 48, color = 'black',
}: IconAndLink) => (
  <Link to={link} key={key}>
    <Component size={size} color={color} />
  </Link>
);

// Date객체 -> 시간 : 분 string 으로 변환
export const makeDateToHourMinute = (date : Date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const testEmailValidation = (string: string): boolean => emailRule.test(string);
