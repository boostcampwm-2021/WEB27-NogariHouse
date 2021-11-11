import { Schema, Document, model } from 'mongoose';

export interface IEventsTypesModel extends Document{
  date: Date,
  participants: Array<string>,
  title: string,
  description: string,
}

const eventsSchema = new Schema({
  date: { type: Date, required: true },
  participants: { type: [String], required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});

export default model<IEventsTypesModel>('events', eventsSchema);
