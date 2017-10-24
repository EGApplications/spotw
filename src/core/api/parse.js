import Parse from "parse";
import _ from "lodash";
import config from '../../config';

Parse.initialize(config.parse.id);
Parse.serverURL = config.parse.address;

const eventFilter = [
    { key: 'tags', method:"equalTo", field:'tags' },
    { key: 'description',  method:"contains", field:"description" },
    { key: 'createdBy', method:"matchesQuery", field:"createdBy", innerQuery:val=>new Parse.Query("User").contains('username', val)}
]

export const getEvents = ({bounds, filter}) =>{
    const query = new Parse.Query( "Event" );
    if ( !_.isEmpty(filter) ) addFilter( query, filter );
    return query
        .include("createdBy")
        .withinGeoBox( "location", ParseGeoPoint( bounds._southWest ), ParseGeoPoint( bounds._northEast ) )
        .find()
        .then(events=>events.map(event => event.toJSON()));
}

export const saveEvent = ({title,description,file,startTime,endTime,location}) => {
    const Event = Parse.Object.extend("Event");
    const newEvent = new Event({
        title,
        description,
        startTime:new Date(startTime),
        endTime:new Date(endTime),
        createdBy: Parse.User.current(),
        location: new Parse.GeoPoint({latitude: location.lat, longitude: location.lng})
    });
    return getBase64(file).then( fileBase64=>{
        if ( fileBase64 ) newEvent.set("mainImage", new Parse.File("Image.png", { base64: fileBase64 }));
        return newEvent.save();
    });
};

export const signinLocal = ({username, password, email}) => {
    return new Promise( (resolve,reject)=>new Parse.User({
        username: username,
        password: password,
        email: email
    }).signUp().then(user=>resolve(user.toJSON()),reject) );
}

export const loginLocal = ({username, password}) => {
    return new Promise( (resolve,reject)=>Parse.User.logIn(username, password).then(user=>resolve(user.toJSON()),reject) );
}

export const currentUser = () => {
    const user = Parse.User.current();
    return user ? user.toJSON() : null
}

export const socialLogin = ({
                                authBy = throwIfMissing('authBy'),
                                token = throwIfMissing('token'),
                                email = throwIfMissing('email'),
                                expires = throwIfMissing('expires'),
                                id = throwIfMissing('id'),
                                name = throwIfMissing('name') })=>Parse.Cloud
    .run('socialLogin',{ authBy, token, email, expires, id, name });

export const userLogin = async (User)=>Parse.User.logIn( User.username, User.AuthData.id ).then(user=>user.toJSON());

export const logout = () => new Promise( (resolve,reject)=>Parse.User.logOut().then(resolve,reject) );

export const resetPassword = (email) => Parse.User.requestPasswordReset(email);

function ParseGeoPoint(coordsObj){
    const {lat,lng} = coordsObj;
    return new Parse.GeoPoint(lat, lng)
}

function getBase64(file) {
    if ( !file ) return Promise.resolve();
    return new Promise((resolve,reject)=>{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject
    })

}

function addFilter(query, filter){
    if ( _.isEmpty( filter ) ) return query;

    //add filters from eventFilter const
    _.forEach( filter, ( value, key )=>{
        if (!value) return;
        const { method, field, innerQuery } = _.find( eventFilter, ['key', key] );
        query[method]( field, innerQuery ? innerQuery( value ) : value )
    } );

    return query
}

const throwIfMissing = name =>{ throw new Error(`missing parameter ${name}`) };


