import Parse from "parse";
import _ from "lodash";
import shajs from 'sha.js';
import moment from 'moment';

Parse.initialize("spotwolrdappid");
Parse.serverURL = 'https://spotworld.dimkk.ru/parse';

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

export const loginWithFb = ({profile, tokenDetail}) => {
    const authDataQuery = new Parse.Query( "AuthData" );
    return authDataQuery
        .equalTo("fbID", profile.id)
        .first()
        .then(userAuthData=>{
            if (userAuthData) return Parse.User.logIn(profile.email, userAuthData.get('swID'));
            //create new auth data and user
            const AuthData = Parse.Object.extend("AuthData");
            return new AuthData({
                username: profile.email,
                fbName: profile.name,
                fbID: profile.id,
                fbToken: tokenDetail.accessToken,
                fbTokenExpirationDate: moment().add(tokenDetail.expiresIn, 's').toDate(),
                swID: shajs('sha256').digest('hex'),
                swToken: shajs('sha256').digest('hex'),
                swTokenExpirationDate: moment().add(60, 'd').toDate(),
                authBy: "FB"
            })
                .save()
                .then( AuthData => new Parse.User({
                        AuthData,
                        username: AuthData.get('username'),
                        password: AuthData.get('swID')
                    })
                    .save()
                )
        } )
        .then( User => User.toJSON() )
}

export const loginWithVk = async ({access_token,email,expires_in,user_id, first_name, last_name}) => {



    const authDataById = new Parse.Query( "AuthData" ).equalTo("vkID", user_id);
    return authDataById
        .first()
        .then(userAuthData=>{
            if (userAuthData) return Parse.User.logIn(email, userAuthData.get('swID'));
            //create new auth data and user
            const AuthData = Parse.Object.extend("AuthData");
            return new AuthData({
                username: email,
                vkID: user_id,
                vkToken: access_token,
                vkName: first_name+" "+last_name,
                vkTokenExpirationDate: moment().add(expires_in, 's').toDate(),
                swID: shajs('sha256').digest('hex'),
                swToken: shajs('sha256').digest('hex'),
                swTokenExpirationDate: moment().add(60, 'd').toDate(),
                authBy: "VK"
            })
                .save()
                .then( AuthData => new Parse.User({
                        AuthData,
                        username: AuthData.get('username'),
                        password: AuthData.get('swID')
                    })
                        .save()
                )
        } )
        .then( User => User.toJSON() )
}

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

