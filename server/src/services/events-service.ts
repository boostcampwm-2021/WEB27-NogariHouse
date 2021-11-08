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

  get10EventItemsFromUser: async (userId: string, count : number) => {
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
      users: item.participants,
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
};
