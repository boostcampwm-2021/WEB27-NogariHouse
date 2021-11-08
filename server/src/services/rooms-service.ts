/* eslint-disable no-underscore-dangle */
import Rooms from '@models/rooms';
import Users from '@models/users';
import redis from 'redis';

const insertUser = async (userId: string, roomId: string) => {
  // userId 현재 아이디 가져와야 함
  const profileUrlObject : any = await Users.findOne({ userId: 'dlatqdlatq' }).select('profileUrl');
  const { profileUrl } = profileUrlObject.toObject();

  const redisClient = redis.createClient();

  redisClient.hset(userId, 'roomId', `${roomId}`);
  redisClient.hset(userId, 'profileUrl', `${profileUrl}`);
  redisClient.hset(userId, 'mic', 'true');

  redisClient.quit();
};

let instance: any = null;
class RoomService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  // eslint-disable-next-line class-methods-use-this
  async addParticipant(roomId: string, userId: string) {
    await Rooms.findOneAndUpdate({ _id: roomId }, { $push: { participants: userId } });
    insertUser(userId, roomId);
  }

  async setRoom(title: string, type: string, userId: string, isAnonymous: boolean) {
    const newRoom = new Rooms({
      title, type, isAnonymous,
    });
    await newRoom.save();
    this.addParticipant(newRoom._id, userId);
  }
}

export = new RoomService();
