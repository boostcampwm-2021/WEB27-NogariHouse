/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import Events, { IEventsTypesModel } from '@models/events';

export default {
  get10EventItems: async (count : number) => {
    try {
      const items = await Events.find({}).sort({ date: 1 }).skip(count).limit(10);
      return items;
    } catch (e) {
      console.error(e);
    }
  },

  // myEvent 구현시 해당 함수에서 추가적으로 구현해서 사용하실건지 아니면 따로 함수를 만들어주실건지 ...
  get10EventItemsFromUser: async (userDocumentId: string, count : number) => {
    try {
      const items = await Events.find().skip(count).limit(10);
      return items;
    } catch (e) {
      console.error(e);
    }
  },

  makeItemToEventInterface: (item : IEventsTypesModel & {_id: number}) => (
    {
      key: item._id,
      time: String(item.date),
      title: item.title,
      participants: item.participants,
      description: item.description,
    }),

  makeDateToHour: (stringDate : string):string => {
    const date = new Date(stringDate);
    return `${((date.getHours).toString()).padStart(2, '0')}:${((date.getMinutes).toString()).padStart(2, '0')}`;
  },

  setEvent: (title:string, participants:object, date:Date, description:string) => {
    const newEvent = new Events({
      title,
      participants,
      date,
      description,
    });
    return newEvent.save();
  },

  searchEvent: async (keyword: string, count: number) => {
    const query = new RegExp(keyword, 'i');
    const res = await Events.find({ $or: [{ title: query }, { description: query }] }).sort({ date: 1 }).skip(count).limit(10);
    return res;
  },
};
