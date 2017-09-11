import Parse from "parse";



Parse.initialize("spotwolrdappid");
Parse.serverURL = 'https://spotworld.dimkk.ru/parse';


export const getEvents = payload => {
    const { bounds } = payload;
    const query = new Parse.Query("Event");
    //if bounds
    if ( bounds ) { query.withinGeoBox("location", ParseGeoPoint(bounds._southWest), ParseGeoPoint(bounds._northEast)) }
    return query.find();
}

export const getNearEvents = payload => new Parse.Query("Event").find();


function ParseGeoPoint(coordsObj){
    const {lat,lng} = coordsObj;
    return new Parse.GeoPoint(lat, lng)
}

