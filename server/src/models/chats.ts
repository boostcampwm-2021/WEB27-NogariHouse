import { Schema, Document, model } from 'mongoose';

interface IChattingLog {
    message: string,
    date: Date,
}

type IUnCheckedMsg = { [userDocumentId: string]: number };

interface IChatTypesModel extends Document {
  participants: Array<string>,
  chattingLog: Array<IChattingLog>,
  lastMsg: string,
  recentActive: Date,
  unCheckedMsg: IUnCheckedMsg,
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
  unCheckedMsg: {
    type: Object,
    default: {},
  },
});

export default model<IChatTypesModel>('chats', chatSchema);
