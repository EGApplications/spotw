//@flow
import { put } from 'redux-saga/effects';
import { getUserInfo as getUserInfoVk } from '../api/vk'
//import {  getUserInfo as getUserInfoFb  } from '../api/fb'
import { getUserPicture } from '../api/fb'
import types from '../actionTypes'


export function* beforeUserSaveInStore({ payload:user }) {
    try {
        const { AuthData } = user;
        switch (AuthData.authBy){
            case 'vk':{
                const { photo_50:smallAvatar, photo_200:bigAvatar } = yield getUserInfoVk( {
                    user_ids:AuthData.vkID,
                    fields:"photo_50, photo_200"
                } );
                return yield put( { type:types.SAVE_USER_IN_STORE, payload:{ ...user, bigAvatar, smallAvatar } } );
            }
            case 'fb':{
                const { data:{ url:bigAvatar } } = yield getUserPicture( AuthData.fbID, { type:"normal" } );
                const { data:{ url:smallAvatar } } = yield getUserPicture( AuthData.fbID, { type:"small" } );
                return yield put( { type:types.SAVE_USER_IN_STORE, payload:{ ...user, bigAvatar, smallAvatar } } );
            }
            default:
                throw new Error('unknown social, to get additional data to user');
        }
    } catch ({message}) {
        console.error(message);
    }
}

