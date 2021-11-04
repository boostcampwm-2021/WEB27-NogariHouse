import events, { IEventsTypesModel } from '@models/events';

const makeDateToHour = (date : Date) => (String(date.getHours())).padStart(2,'0') + ':' + (String(date.getMinutes())).padStart(2,'0');

export default {
  get10EventItems: async (count : number) => {
    try {
      const items = await events.find().skip(count).limit(10);
      return items;
    } catch (e) {
      console.error(e);
    }
  },

  get10EventItemsFromUser: async (userId: string, count : number) => {
    try {
      const items = await events.find().skip(count).limit(10);
      return items;
    } catch (e) {
      console.error(e);
    }
  },
  makeItemToEventInterface: (item : IEventsTypesModel & {_id: number}) => (
    {
    key: item._id,
    time: makeDateToHour(item.date),
    title: item.title,
    users: item.users,
    description: item.description,
  }),
};
