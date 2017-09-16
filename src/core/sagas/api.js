import Parse from "parse";

Parse.initialize("spotwolrdappid");
Parse.serverURL = 'https://spotworld.dimkk.ru/parse';

export const getEvents = payload => {
    const  bounds  = payload;
    const query = new Parse.Query("Event");
    return query
        .withinGeoBox("location", ParseGeoPoint(bounds._southWest), ParseGeoPoint(bounds._northEast))
        .find()
};

export const saveEvent = payload => {

    const Event = Parse.Object.extend("Event");

    payload.location = new Parse.GeoPoint({latitude: payload.location.lat, longitude: payload.location.lng});

    return getBase64(payload.file).then( fileBase64=>{
        payload.mainImage = new Parse.File("Image.png", { base64: fileBase64 });
        const newEvent = new Event(payload);
        return newEvent.save();
    });

};


function ParseGeoPoint(coordsObj){
    const {lat,lng} = coordsObj;
    return new Parse.GeoPoint(lat, lng)
}

function getBase64(file) {
    return new Promise((resolve,reject)=>{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject
    })

}

