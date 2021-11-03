import { Schema, Document, model } from 'mongoose';
import { IEventChatUser } from '@interfaces/index';

interface IChattingLog extends IEventChatUser{
    message: string,
    date: Date,
}

interface IChatTypesModel extends Document {
  users: Array<IEventChatUser>,
  chattingLog: Array<IChattingLog>
}

const chatSchema = new Schema({
  users: {
    type: [Object],
    required: true,
  },
  chattingLog: {
    type: [Object],
    required: true,
  },

});

export default model<IChatTypesModel>('chats', chatSchema);
