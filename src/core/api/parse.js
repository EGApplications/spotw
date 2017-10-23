import Parse from "parse";
import _ from "lodash";
import shajs from 'sha.js';
import moment from 'moment';

Parse.initialize(process.env.PARSE_ID);
Parse.serverURL = process.env.PARSE_ADDRESS;

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

/**
 * @param authBy abbr of social (example 'fb','vk')
 * @param token
 * @param email
 * @param expires
 * @param id
 * @param name
 * @returns {Promise.<Promise.<user JSON>|Parse.Promise>}
 */
export const socialLogin = async ({
                                      authBy = throwIfMissing('authBy'),
                                      token = throwIfMissing('token'),
                                      email = throwIfMissing('email'),
                                      expires = throwIfMissing('expires'),
                                      id = throwIfMissing('id'),
                                      name = throwIfMissing('name')
                                  }) => {
    authBy = authBy.toLowerCase();
    const AuthData = Parse.Object.extend("AuthData");
    const userLoginByAuthData = authData => Parse.User.logIn(authData.get('username'), authData.get('swID')).then(User => User.toJSON());
    const findAuthData = ( field,value ) => new Parse.Query( "AuthData" ).equalTo(field, value).first();
    const authDataPart = {
        [authBy+'ID']: id,
        [authBy+'Token']: token,
        [authBy+'Name']: name,
        [authBy+'TokenExpirationDate']: moment().add(expires, 's').toDate(),
        authBy
    }
    //check if already auth by this social, then login user
    const authDataById = await findAuthData(authBy+"ID", id);
    if ( authDataById ) return userLoginByAuthData( authDataById );

    //check if already have email of this user, then update auth data
    const authDataByEmail = await findAuthData("username", email);
    if ( authDataByEmail ) {
        //update authData with new social and return user
        authDataByEmail.set(authDataPart).save();
        return userLoginByAuthData( authDataByEmail );
    } else {
        // create new auth data and user
        const newAuthData = await new AuthData({
            ...authDataPart,
            swID: shajs('sha256').digest('hex'),
            username: email,
            swToken: shajs('sha256').digest('hex'),
            swTokenExpirationDate: moment().add(60, 'd').toDate()
        }).save();
        return new Parse.User({
            AuthData: newAuthData,
            username: newAuthData.get('username'),
            password: newAuthData.get('swID')
        }).save().then( User => User.toJSON() );
    }
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


Parse.Cloud.run('test',{
    authBy:"test",
    token:"test",
    email:"test@ya.ru",
    expires:132123,
    id:777777777,
    name:"test"
}).then(resp=>{
    console.log(resp);
    debugger;
}).catch(err=>{
    console.log(err);
});