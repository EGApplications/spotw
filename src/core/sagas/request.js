import { put, call } from 'redux-saga/effects';
import { getEvents } from './api';
import types from '../actionTypes';

export function* sagaGenFunction({ payload }) {
  try {
    const result = yield call(getEvents, payload);
    yield put({ type: types.EVENTS_OK, payload:result });
  } catch (error) {
    yield put({ type: types.EVENTS_ERR, error });
  }
}



