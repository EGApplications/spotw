import Parse from "parse";

Parse.initialize("spotwolrdappid");
Parse.serverURL = 'https://spotworld.dimkk.ru/parse';

export const getEvents = payload => {
    const { bounds } = payload;
    const query = new Parse.Query("Event");
    return query
        .withinGeoBox("location", ParseGeoPoint(bounds._southWest), ParseGeoPoint(bounds._northEast))
        .find()
};

export const saveEvent = payload => {
    const Event = Parse.Object.extend("Event");
    const newEvent = new Event(payload);
    return newEvent.save();
};


function ParseGeoPoint(coordsObj){
    const {lat,lng} = coordsObj;
    return new Parse.GeoPoint(lat, lng)
}

