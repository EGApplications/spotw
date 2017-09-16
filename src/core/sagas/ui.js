import { call, all, put } from 'redux-saga/effects';
import * as map from './map.js'
import types from '../actionTypes'


export function* initAppSaga(){
    yield all( [
        call( map.userCoordsSaga, {} )
    ] )
}

export function* newMarkerSaga(){
    yield all( [
        put({ type: types.CURSOR_CHANGE, payload:"url(/img/marker-pointer.png), auto" })
    ] )
}

export function* editorSubmitSaga(payload){
    console.log(payload);
    yield all( [
        put({ type: types.SAVE_EVENT_REQ, payload }),
        put({ type: types.EDITOR_CLOSE, payload })
    ] )
}


