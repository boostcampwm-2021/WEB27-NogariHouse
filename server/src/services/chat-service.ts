/* eslint-disable no-throw-literal */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-await */
/* eslint-disable no-return-assign */
import Users from '@models/users';
import Chats, { IUnReadMsg, IChattingLog } from '@models/chats';

interface IUserInfo {
  userDocumentId: string,
  userName: string,
  profileUrl: string,
}

interface IChatInfo {
  chatDocumentId: string,
  participants: Array<IUserInfo>,
  lastMsg: string | undefined,
  recentActive: Date | undefined,
  unCheckedMsg: number,
}

let instance: any = null;

class ChatService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getChatRooms(userDocumentId : string) {
    const chatRoomList = await Users.findOne({ _id: userDocumentId }, ['chatRooms']);

    const chatRoomInfoArray : Array<IChatInfo> = await Promise.all((chatRoomList!.chatRooms).map(async (chatDocumentId: string) => {
      const chatRoomInfo = await Chats.findOne({ _id: chatDocumentId }, ['participants', 'lastMsg', 'recentActive', 'unReadMsg']);
      const UserInfo : Array<IUserInfo> = [];
      await Promise.all((chatRoomInfo)!.participants.map(async (_id) => {
        if (_id === userDocumentId) return;
        const info = await Users.findOne({ _id }, ['userName', 'profileUrl']);
        UserInfo.push({ userDocumentId: info!._id, userName: info!.userName, profileUrl: info!.profileUrl });
      }));
      const myUnReadMsg = chatRoomInfo!.unReadMsg.filter((user) => user.userDocumentId === userDocumentId);

      return ({
        chatDocumentId,
        participants: UserInfo,
        lastMsg: chatRoomInfo?.lastMsg,
        recentActive: chatRoomInfo?.recentActive,
        unCheckedMsg: myUnReadMsg[0].count,
      });
    }));

    try {
      return chatRoomInfoArray.sort((a, b) => {
        if (!a.recentActive || !b.recentActive) throw 'undefined exception';
        if (a.recentActive < b.recentActive) return 1;
        if (a.recentActive > b.recentActive) return -1;
        return 0;
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async makeChatRoom(participants: Array<string>) {
    const chatRoom = await Chats.findOne({ participants }, ['participants', 'unReadMsg']);
    if (chatRoom) return { chatRoom, chatDocumentId: chatRoom._id, isNew: false };

    const unReadMsg = participants.map((userDocumentId: string) => ({ userDocumentId, count: 0 }));
    const newChatRoom = new Chats({ participants, unReadMsg });
    await newChatRoom.save();

    participants.forEach(async (userDocumentId) => await Users.findOneAndUpdate({ _id: userDocumentId }, { $push: { chatRooms: newChatRoom._id } }));

    return { chatRoom: newChatRoom, chatDocumentId: newChatRoom._id, isNew: true };
  }

  async getChattingLog(chatDocumentId: string, count: number) {
    const chattingLog = await Chats.findOne({ _id: chatDocumentId }, ['chattingLog']);
    const size = chattingLog!.chattingLog.length;
    if (count >= size) return { chattingLog: [] };
    if (Math.floor(size / 10) === Math.floor(count / 10)) return { chattingLog: chattingLog!.chattingLog.slice(0, size % 10).reverse() };
    return { chattingLog: chattingLog!.chattingLog.slice(size - count - 10, size - count).reverse() };
  }

  async addChattingLog(chattingLog: IChattingLog, chatDocumentId: string, userDocumentId: string) {
    const chat = await Chats.findOneAndUpdate({ _id: chatDocumentId }, {
      $push: { chattingLog },
      $set: { recentActive: chattingLog.date, lastMsg: chattingLog.message },
    });
    chat?.participants.forEach(async (id) => {
      if (id === userDocumentId) return;
      await Chats.findOneAndUpdate({ _id: chatDocumentId, 'unReadMsg.userDocumentId': id }, { $inc: { 'unReadMsg.$.count': 1 } });
    });
  }

  async setUnCheckedMsg(chatDocumentId: string, userDocumentId: string) {
    await Chats.findOneAndUpdate({ _id: chatDocumentId, 'unReadMsg.userDocumentId': userDocumentId },
      { $set: { 'unReadMsg.$.count': 0 } });
  }

  async getUnReadMsgCount(userDocumentId: string) {
    const { chatRooms } : any | null = await Users.findOne({ _id: userDocumentId }, ['chatRooms']);
    let unReadMsgCount = 0;

    await Promise.all(chatRooms.map(async (chatDocumentId: string) => {
      const { unReadMsg } : any = await Chats.findOne({ _id: chatDocumentId }, ['unReadMsg']);
      const count: number = unReadMsg[unReadMsg.findIndex((item: IUnReadMsg) => item.userDocumentId === userDocumentId)].count;
      unReadMsgCount += count;
      return count;
    }));
    return unReadMsgCount;
  }
}

export = new ChatService();
