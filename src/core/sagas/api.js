import Parse from "parse";


Parse.initialize("spotwolrdappid");
Parse.serverURL = 'https://spotworld.dimkk.ru/parse';


export const getEvents = payload => new Parse.Query("Event").find();


