import { Schema, Document, model } from 'mongoose';

interface IChattingLog {
    message: string,
    date: Date,
}

interface IChatTypesModel extends Document {
  participants: Array<string>,
  chattingLog: Array<IChattingLog>,
  lastMsg: string,
  recentActive: Date,
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
});

export default model<IChatTypesModel>('chats', chatSchema);
