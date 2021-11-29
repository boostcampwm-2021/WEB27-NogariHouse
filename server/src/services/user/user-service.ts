/* eslint-disable no-underscore-dangle */
import Users, { IUserTypesModel } from '@models/users';

let instance: any = null;
class UserService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async findUserByDocumentId(userDocumentId: string) {
    const result = await Users.findOne({ _id: userDocumentId });
    return result;
  }

  async findUserByUserId(userId: string) {
    const result = await Users.findOne({ userId });
    return result;
  }

  makeItemToUserInterface(
    item: { _id: string, userName: string, description: string, profileUrl: string, userId: string },
  ) {
    const {
      _id, userName, description, profileUrl, userId,
    } = item;
    return ({
      _id,
      userName,
      description,
      profileUrl,
      userId,
      type: 'user',
    });
  }

  makeUserDetailInterface(user: IUserTypesModel & {
    _id: any;
  }) {
    const {
      _id, userName, userId, userEmail, description, followings, followers, joinDate, profileUrl,
    } = user;
    return {
      _id,
      userName,
      userId,
      userEmail,
      description,
      followings,
      followers,
      joinDate,
      profileUrl,
    };
  }

  async searchUsers(keyword: string, count: number) {
    try {
      const query = new RegExp(keyword, 'i');
      const res = await Users.find({
        $or: [{ userId: query }, { userName: query }, { description: query }],
      }).sort({ date: 1 }).skip(count).limit(10);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  async findUsersByIdList(documentIdList: Array<string>) {
    try {
      const participantsInfo = Users.find({ _id: { $in: documentIdList } });
      return participantsInfo;
    } catch (e) {
      console.log(e);
    }
  }

  async updateUserProfileUrl(userDocumentId: string, profileUrl: string) {
    try {
      await Users.updateOne({ _id: userDocumentId }, { profileUrl });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default new UserService();
