/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  MdCheckCircle, MdError, MdInfo, MdWarning,
} from 'react-icons/md';

import toastListState from '@atoms/toast-list';
import { IconType } from 'react-icons';
import {
  NotificationContainer, Notification,
  NotificationContentLayout, NotificationTitle,
  NotificationMessage, NotificationButton,
} from './style';

function Toast() {
  const [toastList, setToastList] = useRecoilState(toastListState);
  const [isStop, setStop] = useState(false);
  const deleteToast = (id: number) => {
    const newToastList = toastList.filter((toast) => (toast.id !== id));
    setToastList(newToastList);
  };

  useEffect(() => {
    if (isStop) return;

    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToast(toastList[0].id as number);
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, isStop]);

  const TypeWithIcon = {
    success: { component: MdCheckCircle, color: '#58964F' },
    danger: { component: MdError, color: '#d9534f' },
    info: { component: MdInfo, color: '#586A9A' },
    warning: { component: MdWarning, color: '#f0ad4e' },
  };

  return (
    <NotificationContainer>
      {
        toastList.map((toastItem, i) => {
          const Icon : IconType = TypeWithIcon[toastItem.type].component;
          const backgroundColor = TypeWithIcon[toastItem.type].color;
          return (
            <Notification key={i} style={{ backgroundColor }} onMouseOver={() => setStop(true)} onMouseOut={() => setStop(false)}>
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
