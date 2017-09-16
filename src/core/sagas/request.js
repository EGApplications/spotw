import { put, call } from 'redux-saga/effects';
import { getEvents, saveEvent } from './api';
import types from '../actionTypes';

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
    yield put({ type: types.SAVE_EVENT_ERR, error });
  }
}


