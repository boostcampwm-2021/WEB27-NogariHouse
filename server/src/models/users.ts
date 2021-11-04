import { Schema, Document, model } from 'mongoose';

export interface IUser {
    userName: string,
    profileUrl: string,
    description: string,
}

export interface IFollow {
    [userId: string]: IUser,
}

export interface IActivity {
    // 추가 설정 필요
}

export interface IRecentSearch {
    // 추가 설정 필요
}

export interface IRecentListenTo extends IUser{
    userId: string,
}

export interface IUsers {
    userName: string,
    userId: string,
    userEmail: string,
    password: string | null,
    loginType: 'Oauth' | 'normal',
    description: string,
    interesting: Array<string>,
    chatRooms: Array<string>,
    myEvents: Array<string>,
    following: IFollow,
    follower: IFollow,
    joinDate: Date,
    activity: Array<IActivity>
    recentSearch: Array<IRecentSearch>,
    recentListenTo: Array<IRecentListenTo>
}

export interface IUserTypesModel extends IUser, Document { }

const usersSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  loginType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  interesting: {
    type: [String],
    default: [],
  },
  chatRooms: {
    type: [String],
    default: [],
  },
  myEvent: {
    type: [String],
    default: [],
  },
  followings: {
    type: [Object],
    default: [],
  },
  followers: {
    type: [Object],
    default: [],
  },
  recentSearch: {
    type: [Object],
    default: [],
  },
});

export default model<IUserTypesModel>('users', usersSchema);
