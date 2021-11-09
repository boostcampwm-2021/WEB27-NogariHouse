/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
// import jwt from 'jsonwebtoken';

import Users from '@models/users';

let instance:any = null;

class UserService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  // eslint-disable-next-line class-methods-use-this
  async findUser(userDocumentId: string) {
    const result = await Users.findOne({ _id: userDocumentId });
    return result;
  }
}

export = new UserService();
