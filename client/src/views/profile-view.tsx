/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import followingListState from '@atoms/following-list';
import userState from '@atoms/user';
import LoadingSpinner from '@common/loading-spinner';
import scrollbarStyle from '@styles/scrollbar-style';
import DefaultButton from '@common/default-button';

const idRegex = /\/profile\/(.*)/;

const ProfileViewLayout = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;

  width: 80%;
  height: 100%;
  margin: auto;

  ${scrollbarStyle};
`;

const ImageAndFollowButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LargeProfileImageBox = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 30%;
`;

const UserNameDiv = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
`;

const UserIdDiv = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

const FollowBox = styled.div`
  position:relative;
  display: flex;
  justify-content: space-between;
  align-items:center;

  width: 80%;
  margin-top: 10px;
`;

const FollowBoxDiv = styled.div`
  display: flex;
`;

const FollowNumberDiv = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-right: 20px;
`;

const FollowTextDiv = styled.div`
  font-size: 24px;
`

const DescriptionDiv = styled.div`
  font-size: 20px;
  margin-top: 30px;
`

const JoinDateDiv = styled.div`
  font-size: 20px;
  margin-top: 50px;
`

interface IUserDetail {
  _id: string,
  userName: string,
  userId: string,
  userEmail: string,
  description: string,
  followings: string[],
  followers: string[],
  joinDate: string,
  profileUrl: string
}

const makeDateToJoinDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getMonth()+1}월 ${date.getDate()}, ${date.getFullYear()}`
}

function ProfileView() {
  const user = useRecoilValue(userState);
  const followingList = useRecoilValue(followingListState)
  const location = useLocation();
  const paths = location.pathname.match(idRegex);
  const [loading, setLoading] = useState(true);
  const userDetailInfo = useRef<IUserDetail>();

  if (!paths) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  const profileId = paths[1];

  useEffect(() => {
    const getUserDetail = async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${profileId}?type=userId`).then((res) => res.json());
      if (result.ok) {
        userDetailInfo.current = result.userDetailInfo;
      }
      setLoading(false);
    };

    getUserDetail();
  })

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!userDetailInfo.current) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <ProfileViewLayout>
      <ImageAndFollowButtonDiv>
        <LargeProfileImageBox src={userDetailInfo.current.profileUrl} />
        {user.userId !== profileId
        &&
        <DefaultButton
        buttonType="primary"
        size="small"
        font="Nunito"
        isDisabled={followingList.includes(userDetailInfo.current._id)}
      >
        {followingList.includes(userDetailInfo.current._id) ? 'following' : 'follow'}
      </DefaultButton>}
      </ImageAndFollowButtonDiv>
      <UserNameDiv>{userDetailInfo.current.userName}</UserNameDiv>
      <UserIdDiv>{`@${userDetailInfo.current.userId}`}</UserIdDiv>
      <FollowBox>
        <FollowBoxDiv>
          <FollowNumberDiv>{userDetailInfo.current.followers.length}</FollowNumberDiv>
          <FollowTextDiv>followers</FollowTextDiv>
        </FollowBoxDiv>
        <FollowBoxDiv>
          <FollowNumberDiv>{userDetailInfo.current.followings.length}</FollowNumberDiv>
          <FollowTextDiv>following</FollowTextDiv>
        </FollowBoxDiv>
      </FollowBox>
      <DescriptionDiv>{userDetailInfo.current.description}</DescriptionDiv>
      <JoinDateDiv>{`Joined ${makeDateToJoinDate(userDetailInfo.current.joinDate)}`}</JoinDateDiv>
    </ProfileViewLayout>
  );
}

export default ProfileView;
