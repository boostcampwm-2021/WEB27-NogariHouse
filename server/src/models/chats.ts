import { Schema, Document, model } from 'mongoose';

interface IChattingLog {
    message: string,
    date: Date,
}

interface IChatTypesModel extends Document {
  participants: Array<string>,
  chattingLog: Array<IChattingLog>
}

const chatSchema = new Schema({
  participants: {
    type: [String],
    required: true,
  },
  chattingLog: {
    type: [Object],
    required: true,
  },
});

export default model<IChatTypesModel>('chats', chatSchema);
