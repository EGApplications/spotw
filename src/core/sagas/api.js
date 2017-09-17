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

export const signinLocal = ({username, password, email}) => {
    return new Parse.User({
        username: username,
        password: password,
        email: email
    }).signUp();
}

export const loginLocal = ({email, password}) => {
    return Parse.User.logIn(email, password);
}

export const currentUser = () => Parse.User.current();

export const logout = () => Parse.User.logOut();


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

