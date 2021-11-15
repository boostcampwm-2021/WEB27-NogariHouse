/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import Rooms from '@models/rooms';
import Users from '@models/users';

let instance: any = null;
class RoomService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  // eslint-disable-next-line class-methods-use-this
  async addParticipant(roomDocumentId: string, userDocumentId: string) {
    await Rooms.findOneAndUpdate({ _id: roomDocumentId }, { $push: { participants: { userDocumentId, mic: false } } });
  }

  async deleteParticipant(roomDocumentId: string, userDocumentId: string) {
    const roomInfo = await Rooms.findById(roomDocumentId).select('participants');
    const newParticipants = roomInfo!.participants.filter((participant) => (participant.userDocumentId !== userDocumentId));
    await Rooms.updateOne({ _id: roomDocumentId }, { $set: { participants: newParticipants } });
    if (!newParticipants.length) await Rooms.deleteOne({ _id: roomDocumentId });
  }

  async setRoom(title: string, type: string, isAnonymous: boolean) {
    const newRoom = new Rooms({
      title, type, isAnonymous,
    });
    await newRoom.save();

    return newRoom._id;
  }

  async findRoom(roomDocumentId: string) {
    const result = await Rooms.findOne({ _id: roomDocumentId });
    return result;
  }

  async setMic(roomDocumentId: string, userDocumentId: string, isMicOn: boolean) {
    await Rooms.updateOne({ _id: roomDocumentId, 'participants.userDocumentId': userDocumentId }, { $set: { 'participants.$.mic': isMicOn } });
  }

  // eslint-disable-next-line consistent-return
  async get10Rooms(count: number) {
    try {
      const rooms = await Rooms.find({ type: 'public' }, ['title', 'isAnonymous', 'participants'], { skip: count, limit: 3 });

      const roomsInfo = await Promise.all((rooms).map(async ({
        _id, title, isAnonymous, participants,
      }) => {
        const userList = participants.map(({ userDocumentId }) => ({ _id: userDocumentId }));
        const participantsInfo = await Users.find({ _id: { $in: userList } }, ['userName', 'profileUrl']);
        const roomInfo = {
          _id, title, isAnonymous, participantsInfo,
        };
        return roomInfo;
      }));

      return roomsInfo;
    } catch (e) {
      console.error(e);
    }
  }

  // eslint-disable-next-line consistent-return
  async searchRooms(keyword: string, count: number) {
    try {
      const query = new RegExp(keyword, 'i');
      const res = await Rooms.find({ title: query }).sort({ date: 1 }).skip(count).limit(10);

      const roomsInfo = await Promise.all((res).map(async ({
        _id, title, isAnonymous, participants,
      }) => {
        const userList = participants.map(({ userDocumentId }) => ({ _id: userDocumentId }));
        const participantsInfo = await Users.find({ _id: { $in: userList } }, ['userName', 'profileUrl']);
        const roomInfo = {
          _id, title, isAnonymous, participantsInfo,
        };
        return roomInfo;
      }));

      return roomsInfo;
    } catch (e) {
      console.error(e);
    }
  }
}

export = new RoomService();
