import { all, put } from 'redux-saga/effects';
import types from '../actionTypes'

export function* newMarkerSaga(){
    yield all( [
        put({ type: types.CURSOR_CHANGE, payload:"url(/img/marker-cursor.png), auto" })
    ] )
}

export function* editorSubmitSaga({payload}){
    yield put({ type: types.SAVE_EVENT_REQ, payload });
}


