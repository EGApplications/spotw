import { call, all, put } from 'redux-saga/effects';
import * as map from './map.js'
import types from '../actionTypes'


export function* initAppSaga(){
    yield all( [
        call( map.userCoordsSaga, {} )
    ] )
}

export function* createMarkerSaga(){
    yield all( [
        put({ type: types.CHANGE_CURSOR, payload:"url(/img/marker-pointer.png), auto" })
    ] )
}


