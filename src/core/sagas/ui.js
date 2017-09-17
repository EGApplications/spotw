import { call, all, put } from 'redux-saga/effects';
import * as map from './map.js'
import types from '../actionTypes'
import { currentUser } from './api';


export function* initAppSaga(){
    yield all( [
        call( map.userCoordsSaga, {} )
    ] )
}

export function* newMarkerSaga(){
    yield all( [
        put({ type: types.CURSOR_CHANGE, payload:"url(/img/marker-cursor.png), auto" })
    ] )
}

export function* editorSubmitSaga({payload}){
    yield put({ type: types.SAVE_EVENT_REQ, payload });
}


