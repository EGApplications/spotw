import { put, call } from 'redux-saga/effects';
import { getEvents, saveEvent, loginLocal, signinLocal } from './api';
import types from '../actionTypes'
import { getFromStore } from "./selectors"

export function* getEventsSaga({ payload }) {
  try {
    const result = yield call(getEvents, payload);
    yield put({ type: types.GET_EVENTS_OK, payload:result });
  } catch (error) {
    yield put({ type: types.GET_EVENTS_ERR, error });
  }
}

export function* saveEventSaga({ payload }) {
  try {
    const result = yield call(saveEvent, payload);
    yield put({ type: types.SAVE_EVENT_OK, payload:result });
  } catch (error) {
    yield put({ type: types.SAVE_EVENT_ERR, payload:error.message });
  }
}

export function* saveEventOkSaga({ payload }) {
  const isEditorOpen = yield getFromStore('ui.editorOpen');
  const bounds = yield getFromStore('map.bounds');
  yield put( { type:types.GET_EVENTS_REQ, payload:bounds } );

  if (isEditorOpen) yield put({type:types.EDITOR_TOGGLE});
}

export function* loginLocalSaga({ payload }) {
    try {
        const result = yield call(loginLocal, payload);
        yield put({ type: types.LOGIN_LOCAL_OK, payload:result });
    } catch (error) {
        yield put({ type: types.LOGIN_LOCAL_ERR, error });
    }
}

export function* signinLocalSaga({ payload }) {
    try {
        const result = yield call(signinLocal, payload);
        yield put({ type: types.SIGNIN_LOCAL_OK, payload:result });
    } catch (error) {
        yield put({ type: types.SIGNIN_LOCAL_EVENTS_ERR, error });
    }
}


