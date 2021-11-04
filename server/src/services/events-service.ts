import events from '@models/events'

export default {

    get10EvnetItems : async (count : number) => {
        try{
            const items = await events.find().skip(count).limit(10);
            return items;
        }
        catch(e){
            console.error(e);
        }
    }

}