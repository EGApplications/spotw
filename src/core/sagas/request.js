//@flow
import { put, call } from 'redux-saga/effects';
import { getEvents, saveEvent, subscriberEvent, memberEvent } from '../api/parse';
import { getUserFriends } from '../api/vk';
import types from '../actionTypes'
import { getFromStore } from "./selectors"

export function* getEventsSaga( { payload:{ point, filter } } ){
    try {
        const result = yield call( getEvents, { point, filter } );
        yield put( { type:types.GET_EVENTS_OK, payload:result } );
    } catch ( { message } ){
        yield put( { type:types.GET_EVENTS_ERR, message } );
    }
}

export function* getFriendsSaga(){
    try {
        const result = yield call( getUserFriends, {fields:"photo_50, photo_200", order:"hints"});
        yield put( { type:types.GET_FRIENDS_OK, payload:result } );
    } catch ( { message } ){
        yield put( { type:types.GET_FRIENDS_ERR, message } );
    }
}

export function* subscribeSaga({payload:{id}}){
    try {
         yield call( subscriberEvent, id);
    } catch ( { message } ){
        console.error(message);
    }
}
export function* memberSaga({payload:{id}}){
    try {
         yield call( memberEvent, id);
    } catch ( { message } ){
        console.error(message);
    }
}

export function* saveEventSaga(){
    try {
        const { latlng:location } = yield getFromStore( 'map.lastClick' );
        const values = yield getFromStore( 'form.editor.values' );
        const result = yield call( saveEvent, { ...values, location } );
        yield put( { type:types.SAVE_EVENT_OK, payload:result } );
    } catch ( { message } ){
        yield put( { type:types.SAVE_EVENT_ERR, message } );
    }
}

export function* saveEventOkSaga({ payload }) {
  const isEditorOpen = yield getFromStore('ui.editorOpen');
  const bounds = yield getFromStore('map.bounds');
  yield put( { type:types.GET_EVENTS_REQ, payload:{bounds} } );

  if (isEditorOpen) yield put({type:types.EDITOR_TOGGLE});
}


