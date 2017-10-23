//@flow
import { put, call } from 'redux-saga/effects';
import { loginLocal, signinLocal, currentUser, logout, resetPassword,  socialLogin } from '../api/parse';
import { getUserInfo } from '../api/vk'
import types from '../actionTypes';


export function* loginLocalSaga({ payload }) {
    try {
        const result = yield call(loginLocal, payload);
        yield put({ type: types.SAVE_USER_IN_STORE, payload:result });
    } catch ({message}) {
        yield put({ type: types.LOGIN_LOCAL_ERR, message });
        yield put({ type: types.SAVE_AUTH_MSG, payload:{color:'red', text:message} });
    }
}

export function* signinLocalSaga({ payload }) {
    try {
        const result = yield call(signinLocal, payload);
        yield put({ type: types.SAVE_USER_IN_STORE, payload:result });
    } catch ({message}) {
        yield put({ type: types.SIGNIN_LOCAL_ERR, message });
        yield put({ type: types.SAVE_AUTH_MSG, payload:{color:'red', text:message} });
    }
}

export function* getCurrentUserSaga({ payload }) {
    const user = currentUser();
    if (user) yield put({ type: types.SAVE_USER_IN_STORE, payload:user });
    else yield put({ type: types.GET_CURRENT_USER_ERR, message:'no current user save' })
}

export function* logoutUserSaga({ payload }) {
    try {
        const result = yield call(logout, payload);
        yield put({ type: types.DELETE_USER_FROM_STORE, payload:result });
    } catch ({message}) {
        yield put({ type: types.DELETE_USER_FROM_STORE, message });
        yield put({ type: types.SAVE_AUTH_MSG, payload:{color:'red', text:message} });
    }
}

export function* loginWithFbSaga({ payload:{profile:{email,name,id},tokenDetail:{accessToken:token, expiresIn:expires}} }) {
    try {
        const user = yield socialLogin({authBy:"fb",email,name,id,expires,token});
        yield put({ type: types.SAVE_USER_IN_STORE, payload:user });
    } catch ({message}) {
        yield put({ type: types.LOGIN_WITH_FB_ERR, message });
        yield put({ type: types.SAVE_AUTH_MSG, payload:{color:'red', text:message} });
    }
}


export function* loginWithVkSaga({payload:{access_token:token, email,user_id:id,expires_in:expires}} ) {
    try {
        const {first_name,last_name} = yield getUserInfo({user_ids:id, fields:""});
        const user = yield socialLogin({token, email, id, expires, name:`${first_name} ${last_name}`, authBy:"vk"});
        yield put({ type: types.SAVE_USER_IN_STORE, payload:user });
        window.location.hash='';
    } catch ({message}) {
        yield put({ type: types.LOGIN_WITH_FB_ERR, message });
        yield put({ type: types.SAVE_AUTH_MSG, payload:{color:'red', text:message} });
    }
}

export function* resetPasswordSaga({ payload }) {
    try {
        const result = yield call(resetPassword, payload);
        debugger;
        yield put({ type: types.RESET_PASSWORD_OK, payload:result });
    } catch ({message}) {
        yield put({ type: types.RESET_PASSWORD_ERR, message });
        yield put({ type: types.SAVE_AUTH_MSG, payload:{color:'red', text:message} });
    }
}
//
//Данный метод предназначен для авторизации через любую соц. сеть, если есть соответствующие параметры в теле запроса
//{token:str, email:str, id:str, expires:int, name:str, authBy:str}
//token - токен соц сети,
//id - id пользователя соц сети,
//authBy - аббревиатура из 2х букв соцсети (vk, fb),
//expires - время действия токена соц сети, в секундах
//name - полное имя пользователя
//
//Работа метода: проверяет по id на существование AuthData в базе, если да находит по ней User
//
//
//метод возвращает сущность пользователя в формате json


