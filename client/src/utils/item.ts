import { IUserForCard } from '@interfaces/index';

export const makeUserObjectIncludedIsFollow = (userItem: Required<IUserForCard>, followingList: string[]): IUserForCard => ({
  ...userItem,
  isFollow: !!followingList.includes(userItem._id),
});

export const a = {};
