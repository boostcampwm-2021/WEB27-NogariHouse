/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
// import Chats from '@models/chats';
import Users from '@models/users';
import Chats from '@models/chats';

let instance: any = null;

class ChatService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getChatRooms(userDocumentId : string) {
    const chatRoomList = await Users.findOne({ _id: userDocumentId }, ['chatRooms']);

    const chatRoomInfo = await Promise.all((chatRoomList!.chatRooms).map(async (chatDocumentId: string) => {
      const userDocumentIds = await Chats.findOne({ _id: chatDocumentId }, ['participants']);
      const UserInfo : any = [];
      await Promise.all((userDocumentIds)!.participants.map(async (_id) => {
        if (_id === userDocumentId) return;
        const info = await Users.findOne({ _id }, ['userName', 'profileUrl']);
        UserInfo.push({ userDocumentId: info!._id, userName: info!.userName, profileUrl: info!.profileUrl });
      }));
      return ({ chatDocumentId, participants: UserInfo });
    }));
    return chatRoomInfo;
  }

  async makeChatRoom(participants: Array<string>) {
    const chatRoom = await Chats.findOne({ participants }, ['participants']);
    if (chatRoom) return chatRoom._id;

    const newChatRoom = new Chats({ participants });
    await newChatRoom.save();

    participants.forEach(async (userDocumentId) => await Users.findOneAndUpdate({ _id: userDocumentId }, { $push: { chatRooms: newChatRoom._id } }));

    return newChatRoom._id;
  }
}

export = new ChatService();
