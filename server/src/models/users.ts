/* eslint-disable no-param-reassign */
import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    userName: string,
    profileUrl: string,
    description: string,
}

export interface IActivity {
  type: 'follow' | 'event' | 'room',
  clickDocumentId: string,
  from: string,
  date: Date,
  isChecked: boolean,
}

export interface IUsers {
    userName: string,
    userId: string,
    userEmail: string,
    password: string | null,
    loginType: 'Oauth' | 'normal',
    description: string,
    chatRooms: Array<string>,
    followings: Array<string>,
    followers: Array<string>,
    joinDate: Date,
    activity: Array<IActivity>,
    profileUrl: string
}

export interface IUserTypesModel extends IUsers, Document {
  checkPassword: (guess: string) => boolean
}

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
  chatRooms: {
    type: [String],
    default: [],
  },
  followings: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
    default: [],
  },
  profileUrl: {
    type: String,
    default: 'https://kr.object.ncloudstorage.com/nogarihouse/profile/default-user-image.png',
  },
  joinDate: {
    type: Date,
    default: new Date(),
  },
  activity: {
    type: [Object],
    default: [],
  },
});

usersSchema.pre('insertMany', async (next: any, docs: any) => {
  if (Array.isArray(docs) && docs.length) {
    // eslint-disable-next-line no-return-await
    const hashedUsers = docs.map(async (user) => await new Promise((resolve, reject) => {
      bcrypt.genSalt(10).then((salt) => {
        const password = user.password.toString();
        bcrypt.hash(password, salt).then((hash) => {
          user.password = hash;
          resolve(user);
        }).catch((e) => {
          reject(e);
        });
      }).catch((e) => {
        reject(e);
      });
    }));
    docs = await Promise.all(hashedUsers);
    next();
  } else {
    return next(new Error('User list should not be empty')); // lookup early return pattern
  }
});

usersSchema.methods.checkPassword = function (guess: string) {
  return bcrypt.compareSync(guess, this.password);
};

export default model<IUserTypesModel>('users', usersSchema);
