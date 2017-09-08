import Parse from "parse";



Parse.initialize("spotwolrdappid");
Parse.serverURL = 'https://spotworld.dimkk.ru/parse';


export const getEvents = payload => new Parse.Query("Event").find();

export const getNearEvents = payload => new Parse.Query("Event").find();


var southwestOfSF = new Parse.GeoPoint(56, 38);
var northeastOfSF = new Parse.GeoPoint(55.67846550322208, 37.63229754602618);

var query = new Parse.Query("Event");

query.withinGeoBox("location", southwestOfSF, northeastOfSF);

query.find().then(
    ok=>console.log(ok),
    err=>console.error(err)
);