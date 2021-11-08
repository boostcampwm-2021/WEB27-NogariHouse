import { Schema, Document, model } from 'mongoose';
import { IEventChatUser } from '@interfaces/index';

export interface IEventsTypesModel extends Document{
  date: Date,
  participants: Array<IEventChatUser>,
  title: string,
  description: string,
}

const eventsSchema = new Schema({
  date: { type: Date, required: true },
  participants: { type: [Object], required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});

export default model<IEventsTypesModel>('events', eventsSchema);
