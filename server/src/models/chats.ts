import { Schema, Document, model } from 'mongoose';

interface IChattingLog {
  userDocumentId: string,
  message: string,
  date: Date,
  linkTo: string,
}

interface IUnReadMsg {
  userDocumentId: string,
  count: number,
}

interface IChatTypesModel extends Document {
  participants: Array<string>,
  chattingLog: Array<IChattingLog>,
  lastMsg: string,
  recentActive: Date,
  unReadMsg: Array<IUnReadMsg>,
}

const chatSchema = new Schema({
  participants: {
    type: [String],
    required: true,
  },
  chattingLog: {
    type: [Object],
    default: [],
  },
  lastMsg: {
    type: String,
    default: '',
  },
  recentActive: {
    type: Date,
    default: new Date(),
  },
  unReadMsg: {
    type: [Object],
    default: [],
  },
});

export default model<IChatTypesModel>('chats', chatSchema);
