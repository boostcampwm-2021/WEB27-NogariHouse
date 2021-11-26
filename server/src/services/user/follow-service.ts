/* eslint-disable no-underscore-dangle */

import Users from '@models/users';

let instance: any = null;
class FollowService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getMyFollowingsList(userDocumentId: string) {
    try {
      const result = await Users.findOne({ _id: userDocumentId }, ['followings']);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async getFollowingsList(userId: string, count: number) {
    try {
      const result = await Users.findOne({ userId }, ['followings']).sort({ date: 1 }).skip(count).limit(10);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async getFollowersList(userId: string, count: number) {
    try {
      const result = await Users.findOne({ userId }, ['followers']).sort({ date: 1 }).skip(count).limit(10);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async followUser(userDocumentId: string, targetUserDocumentId: string) {
    try {
      await Users.findByIdAndUpdate(userDocumentId, { $addToSet: { followings: [targetUserDocumentId] } });
      await Users.findByIdAndUpdate(targetUserDocumentId, { $addToSet: { followers: [userDocumentId] } });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async unfollowUser(userDocumentId: string, targetUserDocumentId: string) {
    try {
      await Users.findByIdAndUpdate(userDocumentId, { $pullAll: { followings: [targetUserDocumentId] } });
      await Users.findByIdAndUpdate(targetUserDocumentId, { $pullAll: { followers: [userDocumentId] } });

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default new FollowService();
