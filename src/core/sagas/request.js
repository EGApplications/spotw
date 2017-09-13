import { put, call } from 'redux-saga/effects';
import { getEvents } from './api';
import types from '../actionTypes';

export function* getEventsSaga({ payload }) {
  try {
    const result = yield call(getEvents, payload);
    yield put({ type: types.EVENTS_OK, payload:result });
  } catch (error) {
    yield put({ type: types.EVENTS_ERR, error });
  }
}




//const takeLatest = (pattern, saga, ...args) => fork(function*() {
//    let lastTask
//    while (true) {
//        const action = yield take(pattern)
//        if (lastTask) {
//            yield cancel(lastTask) // cancel is no-op if the task has already terminated
//        }
//        lastTask = yield fork(saga, ...args.concat(action))
//    }
//})