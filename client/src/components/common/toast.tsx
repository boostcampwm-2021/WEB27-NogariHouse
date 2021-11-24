/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  MdCheckCircle, MdError, MdInfo, MdWarning,
} from 'react-icons/md';

import toastListState from '@atoms/toast-list';
import { toastXFromTo } from '@styles/keyframe';
import { IconType } from 'react-icons';

const NotificationContainer = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;

  top: 12px;
  right: 12px;
  transition: transform .6s ease-in-out;
  animation: ${toastXFromTo} .7s;
`;

const Notification = styled.div`
  background: #fff;
  transition: .3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 30px;
  margin-bottom: 15px;
  width: 300px;
  max-height: 100px;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 10px #999;
  color: #000;
  opacity: .9;
  background-position: 15px;
  background-repeat: no-repeat;

  height: 50px;
  width: 365px;
  color: #fff;
  padding: 20px 15px 10px 10px;

  &:hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: pointer  
  }
`;

const NotificationContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NotificationTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`;

const NotificationMessage = styled.p`
  margin: 0;
  text-align: left;
  height: 18px;
  margin-left: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NotificationButton = styled.button`
  position: relative;
  right: -.3em;
  top: -.3em;
  float: right;
  font-weight: 700;
  color: #fff;
  outline: none;
  border: none;
  text-shadow: 0 1px 0 #fff;
  opacity: .8;
  line-height: 1;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;
`;

function Toast() {
  const [toastList, setToastList] = useRecoilState(toastListState);

  const deleteToast = (id: number) => {
    const newToastList = toastList.filter((toast) => (toast.id !== id));
    setToastList(newToastList);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToast(toastList[0].id as number);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList]);

  const TypeWithIcon = {
    success: { component: MdCheckCircle, color: '#5cb85c' },
    danger: { component: MdError, color: '#d9534f' },
    info: { component: MdInfo, color: '#5bc0de' },
    warning: { component: MdWarning, color: '#f0ad4e' },
  };

  return (
    <NotificationContainer>
      {
        toastList.map((toastItem, i) => {
          const Icon : IconType = TypeWithIcon[toastItem.type].component;
          const backgroundColor = TypeWithIcon[toastItem.type].color;
          return (
            <Notification key={i} style={{ backgroundColor }}>
              {/* eslint-disable-next-line react/jsx-no-bind */}
              <NotificationButton onClick={deleteToast.bind(null, toastItem.id as number)}>X</NotificationButton>
              <NotificationContentLayout>
                <Icon size={36} />
                <div>
                  <NotificationTitle>{toastItem.title}</NotificationTitle>
                  <NotificationMessage>{toastItem.description}</NotificationMessage>
                </div>
              </NotificationContentLayout>
            </Notification>
          );
        })
        }
    </NotificationContainer>
  );
}

export default Toast;
