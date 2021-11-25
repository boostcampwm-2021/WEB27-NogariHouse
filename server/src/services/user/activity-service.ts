/* eslint-disable no-underscore-dangle */
import Users, { IActivity } from '@models/users';
import Events from '@models/events';
import { activeUser } from '@src/sockets/user';
import { userNamespace } from '@src/sockets';

let instance: any = null;
class UserService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getActivityList(userDocumentId: string, count: number) {
    const user = await Users.findById(userDocumentId, ['activity']);
    const newActivityList = await Promise.all(user!.activity.slice(count, count + 10).map(async (activity: IActivity) => {
      const detailFrom = await this.findUserByDocumentId(activity.from);
      const newFrom = { userId: detailFrom!.userId, userName: detailFrom!.userName, profileUrl: detailFrom!.profileUrl };
      return { ...activity, from: newFrom };
    }));
    await Users.findByIdAndUpdate(userDocumentId, { activity: user!.activity.map((el) => ({ ...el, isChecked: true })) });
    return newActivityList;
  }

  async isActivityChecked(userDocumentId: string) {
    try {
      const { activity } : any = await Users.findOne({ _id: userDocumentId }, ['activity']);
      if (!activity) return false;
      return activity.some((item: IActivity) => !item.isChecked);
    } catch (e) {
      return false;
    }
  }

  async addActivityTypeFollow(userDocumentId: string, targetUserDocumentId: string) {
    try {
      const newActivity = {
        type: 'follow',
        clickDocumentId: userDocumentId,
        from: userDocumentId,
        date: new Date(),
        isChecked: false,
      };
      await Users.findByIdAndUpdate(targetUserDocumentId, { $push: { activity: { $each: [newActivity], $position: 0 } } });
      this.emitToUserGetActivity(targetUserDocumentId);
      return true;
    } catch (e) {
      return false;
    }
  }

  async addActivityTypeRoom(userDocumentId: string, roomDocumentId: string) {
    try {
      const user = await Users.findById(userDocumentId, ['followers']);
      const newActivity = {
        type: 'room',
        clickDocumentId: String(roomDocumentId),
        from: userDocumentId,
        date: new Date(),
        isChecked: false,
      };
      await Promise.all(user!.followers.map(async (userDocId: string) => {
        await Users.findByIdAndUpdate(userDocId, { $push: { activity: { $each: [newActivity], $position: 0 } } });
        this.emitToUserGetActivity(userDocId);
        return true;
      }));
      return true;
    } catch (e) {
      return false;
    }
  }

  async addActivityTypeEvent(userDocumentId: string, eventDocumentId: string) {
    try {
      const event = await Events.findById(eventDocumentId, ['participants']);
      const newActivity = {
        type: 'event',
        clickDocumentId: String(eventDocumentId),
        from: userDocumentId,
        date: new Date(),
        isChecked: false,
      };
      await Promise.all(event!.participants.map(async (userId: string) => {
        const user = await Users.findOneAndUpdate({ userId }, { $push: { activity: { $each: [newActivity], $position: 0 } } });
        const userDocId = user!._id;
        this.emitToUserGetActivity(String(userDocId));
        return true;
      }));
      return true;
    } catch (e) {
      return false;
    }
  }

  emitToUserGetActivity(userDocumentId: string) {
    const socketUser = activeUser.get(userDocumentId);
    if (socketUser) userNamespace.to(socketUser.socketId).emit('user:getActivity');
  }
}

export default new UserService();
