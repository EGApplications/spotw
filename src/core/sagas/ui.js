//@flow

import { all, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import types from '../actionTypes'
import { getFromStore } from "./selectors"
import _ from 'lodash'

export function* newMarkerSaga(){
    yield all( [
        put({ type: types.CURSOR_CHANGE, payload:"url(/img/marker-cursor.png), auto" })
    ] )
}

export function* filterChangedSaga({payload}){
    yield delay(1000);
    const bounds = yield getFromStore('map.bounds');
    yield put( { type:types.SAVE_FILTER, payload } );
    yield put( { type:types.GET_EVENTS_REQ, payload:{bounds} } );
}

export function* newsClickSaga({payload:{id}}){
    const events = yield getFromStore('request.events');
    const {coords:[latitude, longitude]} =_.find(events, {id});

    yield put({ type: types.MAP_VIEW, payload:{ center:{latitude,longitude:longitude-0.02}, zoom:14 } });
}


