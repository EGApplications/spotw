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
        let {
                authBy = missingArgument( res, 'authBy' ),
                token = missingArgument( res, 'token' ),
                email = missingArgument( res, 'email' ),
                expires = missingArgument( res, 'expires' ),
                id = missingArgument( res, 'id' ),
                name = missingArgument( res, 'name' )
            } = req.body.params;
        authBy = authBy.toLowerCase();
        email = email.toLowerCase();
        const AuthData = Parse.Object.extend( "AuthData" );
        const authDataPart = {
            [authBy + 'ID']:id,
            [authBy + 'Token']:token,
            [authBy + 'Name']:name,
            [authBy + 'TokenExpirationDate']:moment().add( expires, 's' ).toDate(),
            authBy
        };
        const User = await new Parse.Query(Parse.User).include('AuthData').equalTo( 'username', email ).first();
        if ( User ){
            //update auth data and return user
            await User.get('AuthData').set( authDataPart ).save();
            User.set('status', 'UPDATED');
            return successResponse(res, User );
        } else {
            // new auth data and user
            const newAuthData = await new AuthData( Object.assign(
                authDataPart, {
                    username:email,
                    swToken:shajs( 'sha256' ).digest( 'hex' ),
                    swTokenExpirationDate:moment().add( 60, 'd' ).toDate()
                }) ).save();
            const NewUser = await new Parse.User( {
                AuthData:newAuthData,
                displayName: name,
                username:newAuthData.get( 'username' ),
                password:newAuthData.id
            } ).save();
            User.set('status', 'CREATED');
            return successResponse(res, NewUser);
        }
    } catch ( {message} ) { errorResponse( res, message ) }
});

module.exports = router;