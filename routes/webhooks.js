const express = require('express');
const router = express.Router();
const moment = require('moment');
const shajs = require('sha.js');
const Parse = require('parse/node');
require('dotenv').config();

Parse.initialize(process.env.PARSE_ID);
Parse.serverURL = process.env.PARSE_ADDRESS;

const successResponse = (res, data=true) =>res.status(200).send({ "success" : data });

const errorResponse = (res, message=true)=>res.status(500).send({ "error" : message });

const missingArgument = (res, name) =>{ errorResponse(res,`missing parameter ${name}`) };

router.post('/socialLogin', async ( req, res )=>{
    try {
        let {authBy, token, email, expires, id, name} = req.body;
        authBy = authBy.toLowerCase();
        const AuthData = Parse.Object.extend( "AuthData" );
        const userLoginByAuthData = authData=>Parse.User
            .logIn( authData.get( 'username' ), authData.get( 'swID' ) )
            .then( User=>User.toJSON() )
            .then( userData=>successResponse(res,userData));
        const findAuthData = ( field, value )=>new Parse.Query( "AuthData" ).equalTo( field, value ).first();
        const authDataPart = {
            [authBy + 'ID']:id,
            [authBy + 'Token']:token,
            [authBy + 'Name']:name,
            [authBy + 'TokenExpirationDate']:moment().add( expires, 's' ).toDate(),
            authBy
        };
        //check if already auth by this social, then login user
        const authDataById = await findAuthData( authBy + "ID", id );
        if ( authDataById ) return userLoginByAuthData( authDataById );

        //check if already have email of this user, then update auth data
        const authDataByEmail = await findAuthData( "username", email );
        if ( authDataByEmail ){
            //update authData with new social and return user
            authDataByEmail.set( authDataPart ).save();
            return userLoginByAuthData( authDataByEmail );
        } else {
            // create new auth data and user
            const newAuthData = await new AuthData( Object.assign(
                authDataPart,
                {
                swID:shajs( 'sha256' ).digest( 'hex' ),
                username:email,
                swToken:shajs( 'sha256' ).digest( 'hex' ),
                swTokenExpirationDate:moment().add( 60, 'd' ).toDate()
            }) ).save();
            return new Parse.User( {
                AuthData:newAuthData,
                username:newAuthData.get( 'username' ),
                password:newAuthData.get( 'swID' )
            } )
                .save()
                .then( User=>User.toJSON() )
                .then( userData=>successResponse(res,userData));
        }
    } catch ( {message} ) { errorResponse( res, message ) }
});

module.exports = router;