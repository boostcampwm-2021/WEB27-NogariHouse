import styled from 'styled-components';
import { toastXFromTo } from '@styles/keyframe';

export const NotificationContainer = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;

  font-size: 14px;

  z-index: 1000;
`;

export const Notification = styled.div`
  position: relative;
  top: 12px;
  right: 12px;
  margin: 0 0 6px;
  width: 300px;
  border-radius: 3px;
  box-shadow: 0 0 10px #999;
  color: #000;
  opacity: .9;

  height: 50px;
  width: 365px;
  color: #fff;
  padding: 20px 15px 10px 10px;

  transition: transform .6s ease-in-out;
  animation: ${toastXFromTo} .7s;
`;

export const NotificationContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NotificationTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`;

export const NotificationMessage = styled.p`
  margin: 0;
  text-align: left;
  height: 18px;
  margin-left: -1px;
`;

export const NotificationButton = styled.button`
  position: relative;
  right: -.3em;
  top: -.3em;
  float: right;
  padding: 0;
  border: 0;
  font-size: 16px;
  font-weight: bold;
  color: #fff;

  background: transparent;
  cursor: pointer;
`;
