import { all, put } from 'redux-saga/effects';
import types from '../actionTypes'
import { getFromStore } from "./selectors"

export function* newMarkerSaga(){
    yield all( [
        put({ type: types.CURSOR_CHANGE, payload:"url(/img/marker-cursor.png), auto" })
    ] )
}

export function* editorSubmitSaga({payload}){
    yield put({ type: types.SAVE_EVENT_REQ, payload });
}

export function* filterChangedSaga({payload}){
    const bounds = yield getFromStore('map.bounds');
    yield put( { type:types.GET_EVENTS_REQ, payload:{bounds, filter:payload} } );
}


