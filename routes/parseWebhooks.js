const express = require('express');
const router = express.Router();

const Parse = require('parse').Parse;

function successResponse(res, data) {
    data = data || true;
    res.status(200).send({ "success" : data });
}

function errorResponse(res, message) {
    message = message || true;
    res.status(500).send({ "error" : message });
}

router.post('/test', (req,res,next)=>{
    successResponse(res, "success  test post!");
});

router.post('/socialLogin', (req,res,next)=>{
    console.log(req.body);

    //TODO adapt client code to webhook

    // export const socialLogin = async ({
    //                                       authBy = throwIfMissing('authBy'),
    //                                       token = throwIfMissing('token'),
    //                                       email = throwIfMissing('email'),
    //                                       expires = throwIfMissing('expires'),
    //                                       id = throwIfMissing('id'),
    //                                       name = throwIfMissing('name')
    //                                   }) => {
    //     authBy = authBy.toLowerCase();
    //     const AuthData = Parse.Object.extend("AuthData");
    //     const userLoginByAuthData = authData => Parse.User.logIn(authData.get('username'), authData.get('swID')).then(User => User.toJSON());
    //     const findAuthData = ( field,value ) => new Parse.Query( "AuthData" ).equalTo(field, value).first();
    //     const authDataPart = {
    //         [authBy+'ID']: id,
    //         [authBy+'Token']: token,
    //         [authBy+'Name']: name,
    //         [authBy+'TokenExpirationDate']: moment().add(expires, 's').toDate(),
    //         authBy
    //     }
    //     //check if already auth by this social, then login user
    //     const authDataById = await findAuthData(authBy+"ID", id);
    //     if ( authDataById ) return userLoginByAuthData( authDataById );
    //
    //     //check if already have email of this user, then update auth data
    //     const authDataByEmail = await findAuthData("username", email);
    //     if ( authDataByEmail ) {
    //         //update authData with new social and return user
    //         authDataByEmail.set(authDataPart).save();
    //         return userLoginByAuthData( authDataByEmail );
    //     } else {
    //         // create new auth data and user
    //         const newAuthData = await new AuthData({
    //             ...authDataPart,
    //             swID: shajs('sha256').digest('hex'),
    //             username: email,
    //             swToken: shajs('sha256').digest('hex'),
    //             swTokenExpirationDate: moment().add(60, 'd').toDate()
    //         }).save();
    //         return new Parse.User({
    //             AuthData: newAuthData,
    //             username: newAuthData.get('username'),
    //             password: newAuthData.get('swID')
    //         }).save().then( User => User.toJSON() );
    //     }
    // }

    successResponse(res, req.body);
});

router.get('/test', (req,res,next)=>{
    successResponse(res, "success  test get!");
});

module.exports = router;