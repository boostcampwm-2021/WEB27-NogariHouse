/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import Rooms from '@models/rooms';

let instance: any = null;
class RoomService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  // eslint-disable-next-line class-methods-use-this
  async addParticipant(roomDocumentId: string, userDocumentId: string) {
    await Rooms.findOneAndUpdate({ _id: roomDocumentId }, { $push: { participants: userDocumentId } });
  }

  // eslint-disable-next-line class-methods-use-this
  async setRoom(title: string, type: string, isAnonymous: boolean) {
    const newRoom = new Rooms({
      title, type, isAnonymous,
    });
    await newRoom.save();

    return newRoom._id;
  }

  // eslint-disable-next-line class-methods-use-this
  async findRoom(roomDocumentId: string) {
    const result = await Rooms.findOne({ _id: roomDocumentId });
    return result;
  }
}

export = new RoomService();
