import React from 'react';
import { Link } from 'react-router-dom';

import { IconAndLink } from '@interfaces/index';
import { Cookies } from 'react-cookie';

interface Params {
  [key: string]: any
}

export const makeIconToLink = ({
  Component, link, key, size = 48, color = 'black',
}: IconAndLink) => (
  <Link to={link} key={key}>
    <Component size={size} color={color} />
  </Link>
);

export const generateURLQuery = (params: Params) => Object.keys(params)
  .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');

// Date객체 -> 시간 : 분 string 으로 변환
export const makeDateToHourMinute = (date : Date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
export const makeDateToMonthDate = (date: Date) => `${String(date.getMonth() + 1)}월${String(date.getDate())}일`;

const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const testEmailValidation = (string: string): boolean => emailRule.test(string);

export const deepCopy = (object: Object) => {
  const objectStr = JSON.stringify(object);
  return JSON.parse(objectStr);
};

export function bindTrailingArgs(fn: any, ...boundArgs: any[]) {
  // eslint-disable-next-line func-names
  return function (...args: any[]) {
    return fn(...args, ...boundArgs);
  };
}

export const isEmptyArray = (array: any[]) => !array.length;

const cookies = new Cookies();

const removeAccessToken = async () => {
  cookies.remove('accessToken');
};

export const signOutHandler = async () => {
  removeAccessToken();
  window.location.replace('/');
};
