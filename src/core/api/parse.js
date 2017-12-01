import Parse from "parse";
import _ from "lodash";
import config from '../../config';

Parse.initialize(config.parse.id);
Parse.serverURL = config.parse.address;

export const filters = {
    contains:(query, {field,value})=>{
        if (!value) return query;
        query.contains(field,value);
        return query
    },
    containedIn:(query, {field,value})=>{
        console.log(field);
        console.log(value);
        if (!value) return query;
        query.containedIn(field,value);
        return query
    },
    subscribes:query=>{
        const isSubscribersExits = new Parse.Query("Event").equalTo("subscribers", Parse.User.current());
        const isMembersExits = new Parse.Query("Event").equalTo("members", Parse.User.current());
        return Parse.Query.or(isSubscribersExits, isMembersExits);
    }
}

export const getEvents =  ({point, filter}) =>{
    let query = new Parse.Query( "Event" );
    if ( filter ) query = filters[filter.name]( query, filter.data );
    return query
        .include("createdBy")
        .include("subscribers")
        .include("members")
        .withinKilometers( "location", ParseGeoPoint(point), config.main.distance )
        .find()
        .then( events=>Promise.all( events.map( async event=>{
            //TODO to many requests
                const subscribers = await event.get( 'subscribers' ).query().find();
                const members = await event.get( 'members' ).query().find();
                const JsonEvent = event.toJSON();
                JsonEvent.subscribers = subscribers.map( user=>user.toJSON() );
                JsonEvent.members = members.map( user=>user.toJSON() );
                return JsonEvent;
            } ) )
        );
};

export const saveEvent = ({title,description,image,startTime,endTime,location:{lat:latitude,lng:longitude}}) => {
    const Event = Parse.Object.extend("Event");
    const newEvent = new Event({
        title,
        description,
        startTime:new Date(startTime),
        endTime:new Date(endTime),
        createdBy: Parse.User.current(),
        location: new Parse.GeoPoint({latitude, longitude})
    });
    return getBase64(image).then( fileBase64=>{
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

async function createRelation ( fieldName, eventId ) {
    console.log( fieldName );
    console.log( eventId );
    const Event = Parse.Object.extend("Event");
    const event = new Event();
    event.id = eventId;
    const isAlreadyRelated = await event.relation( fieldName ).query().equalTo( "objectId", Parse.User.current().id ).find();
    if( isAlreadyRelated.length ) event.relation( fieldName ).remove( Parse.User.current() );
    else event.relation( fieldName ).add( Parse.User.current() );
    event.save();
}

export const memberEvent = eventId=>createRelation.apply(this,['members', eventId]);
export const subscriberEvent = eventId=>createRelation.apply(this,['subscribers', eventId]);


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

function ParseGeoPoint( coordsObj ){
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

function addFilter(query, {value, field}){
    if (!value) return;
    query.contains(field,value);
    return query
}

const throwIfMissing = name =>{ throw new Error(`missing parameter ${name}`) };


//const query = new Parse.Query( "Event" );
//query
//    .find()
//    .then(events=>{
//        console.log(events)
//        const user = Parse.User.current();
//        events.forEach(item=>{
//            if ( item.get( 'createdBy' ).id.startsWith( '8n' ) ){
//                item.set('createdBy', user);
//                item.save();
//            }
//        })
//    })