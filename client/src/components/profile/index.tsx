import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import followingListState from '@atoms/following-list';
import { isOpenChangeProfileImageModalState } from '@atoms/is-open-modal';
import userState from '@atoms/user';
import { getUserDetail } from '@api/user';
import LoadingSpinner from '@styles/loading-spinner';
import DefaultButton from '@common/default-button';
import useIsFollowingRef from '@hooks/useIsFollowingRef';
import { IUserDetail } from '@src/interfaces';
import {
  ProfileViewLayout, ImageAndFollowButtonDiv, LargeProfileImageBox, UserNameDiv, UserIdDiv,
  FollowBox, FollowBoxDiv, FollowNumberDiv, FollowTextDiv, DescriptionDiv, JoinDateDiv,
} from './style';

const makeDateToJoinDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}월 ${date.getDate()}, ${date.getFullYear()}`;
};

function ProfileView({ match }: RouteComponentProps<{id: string}>) {
  const user = useRecoilValue(userState);
  const followingList = useRecoilValue(followingListState);
  const [loading, setLoading] = useState(true);
  const userDetailInfo = useRef<IUserDetail>();
  const [isFollowingRef, fetchFollow] = useIsFollowingRef(setLoading);
  const [isOpenChangeProfileImageModal, setIsOpenChangeProfileImageModalState] = useRecoilState(isOpenChangeProfileImageModalState);

  if (!match) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  const profileId = match.params.id;

  useEffect(() => {
    setLoading(true);
    const fetchUserDetail = async () => {
      const json = await getUserDetail(profileId);
      if (json && json.ok) {
        userDetailInfo.current = json.userDetailInfo;
        isFollowingRef.current = followingList.includes(json.userDetailInfo!._id);
      }
      setLoading(false);
    };

    fetchUserDetail();
  }, [isFollowingRef.current, profileId, user]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!userDetailInfo.current) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <ProfileViewLayout>
      <ImageAndFollowButtonDiv>
        <LargeProfileImageBox
          src={userDetailInfo.current.profileUrl}
          isMine={user.userId === profileId}
          onClick={() => user.userId === profileId && setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal)}
        />
        {user.userId !== profileId
        && (
        <DefaultButton
          buttonType={isFollowingRef.current ? 'following' : 'follow'}
          size="small"
          font="Nunito"
          isDisabled={false}
          onClick={() => fetchFollow(isFollowingRef.current as boolean, userDetailInfo.current!._id)}
        >
          {isFollowingRef.current ? 'following' : 'follow'}
        </DefaultButton>
        )}
      </ImageAndFollowButtonDiv>
      <UserNameDiv>{userDetailInfo.current.userName}</UserNameDiv>
      <UserIdDiv>{`@${userDetailInfo.current.userId}`}</UserIdDiv>
      <FollowBox>
        <FollowBoxDiv to={`/followers/${profileId}`}>
          <FollowNumberDiv>{userDetailInfo.current.followers.length}</FollowNumberDiv>
          <FollowTextDiv>followers</FollowTextDiv>
        </FollowBoxDiv>
        <FollowBoxDiv to={`/following/${profileId}`}>
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
