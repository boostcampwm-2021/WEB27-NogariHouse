import { Schema, Document, model } from 'mongoose';

export interface IRooms extends Document{
  title: string,
  type: string,
  isAnonymous: boolean,
  userList: Array<String>,
}

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    required: true,
  },
  userList: {
    type: [String],
    default: [],
  },
});

export default model<IRooms>('rooms', roomSchema);
