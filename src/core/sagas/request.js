//@flow
import { put, call } from 'redux-saga/effects';
import { getEvents, saveEvent } from '../api';
import types from '../actionTypes'
import { getFromStore } from "./selectors"

export function* getEventsSaga( { payload:{ bounds } } ){
    try {
        const filter = yield getFromStore( 'ui.filterEvents' );
        const result = yield call( getEvents, { bounds, filter } );
        yield put( { type:types.GET_EVENTS_OK, payload:result } );
    } catch ( { message } ){
        yield put( { type:types.GET_EVENTS_ERR, message } );
    }
}

export function* saveEventSaga({ payload }) {
  try {
    const result = yield call(saveEvent, payload);
    yield put({ type: types.SAVE_EVENT_OK, payload:result });
  } catch ({message}) {
    yield put({ type: types.SAVE_EVENT_ERR, message });
  }
}

export function* saveEventOkSaga({ payload }) {
  const isEditorOpen = yield getFromStore('ui.editorOpen');
  const bounds = yield getFromStore('map.bounds');
  yield put( { type:types.GET_EVENTS_REQ, payload:{bounds} } );

  if (isEditorOpen) yield put({type:types.EDITOR_TOGGLE});
}


