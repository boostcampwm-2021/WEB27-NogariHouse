/* eslint-disable no-underscore-dangle */
import Rooms from '@models/rooms';
import Users from '@models/users';
import redis from 'redis';

export default {
  setRoom: async (title: string, type: string, userId: string, isAnonymous: boolean) => {
    const roomUserList = [userId];
    // userId 현재 아이디 가져와야 함
    const profileUrlObject : any = await Users.findOne({ userId: 'dlatqdlatq' }).select('profileUrl');
    const { profileUrl } = profileUrlObject.toObject();

    const newRoom = new Rooms({
      title, type, isAnonymous, roomUserList,
    });
    const redisClient = redis.createClient();

    redisClient.hset(userId, 'roomId', `${newRoom._id}`);
    redisClient.hset(userId, 'profileUrl', `${profileUrl}`);
    redisClient.hset(userId, 'mic', 'true');

    return newRoom.save();
  },
};
