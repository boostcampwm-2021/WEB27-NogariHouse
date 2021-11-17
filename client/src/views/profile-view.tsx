/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@common/loading-spinner';

const idRegex = /\/profile\/(.*)/;

const LargeProfileImageBox = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 30%;
`;

interface IUserDetail {
  userName: string,
  userId: string,
  userEmail: string,
  description: string,
  followings: string[],
  followers: string[],
  joinDate: Date,
  profileUrl: string
}

function ProfileView() {
  const location = useLocation();
  const paths = location.pathname.match(idRegex);
  const [loading, setLoading] = useState(true);
  const [emptyUser, setEmptyUser] = useState(false);
  const userDetailInfo = useRef<IUserDetail>();

  if (!paths) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  const profileId = paths[1];

  useEffect(() => {
    const getUserDetail = async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/user/:${profileId}`).then((res) => res.json());
      if (result.ok) {
        userDetailInfo.current = result;
      } else {
        setEmptyUser(true);
      }
      setLoading(false);
    } 
  })

  if (loading) {
    return <LoadingSpinner />;
  }

  if (emptyUser) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <>
      <LargeProfileImageBox />
      <div>{profileId}</div>
    </>
  );
}

export default ProfileView;
