import { Schema, Document, model } from 'mongoose';

interface IParticipant {
  userDocumentId: string,
  isMicOn: boolean,
  isAnonymous?: boolean,
}

export interface IRooms extends Document{
  title: string,
  type: string,
  isAnonymous: boolean,
  participants: Array<IParticipant>,
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
  participants: {
    type: [Object],
    default: [],
  },
});

export default model<IRooms>('rooms', roomSchema);
