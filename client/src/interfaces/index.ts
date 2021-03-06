import { IconType } from 'react-icons';

export interface IUser {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
}

export interface IUserForCard{
  _id: string,
  userName: string,
  userId: string,
  description: string,
  profileUrl: string,
  isFollow?: boolean,
}

export interface Participants{
  _id: string,
  userName: string,
  profileUrl: string,
  isAnonymous: boolean,
}

export interface RoomCardProps {
  _id: string,
  title: string,
  isAnonymous: boolean,
  participantsInfo: Array<Participants>,
}

export interface IUserDetail {
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

export interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}
