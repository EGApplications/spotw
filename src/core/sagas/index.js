import { fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import types from '../actionTypes';
import { sagaGenFunction } from './request';


function* watchGetRequest() {
  yield takeEvery(types.EVENTS_REQ, sagaGenFunction);
  //next watcher for async actions
  // yield takeEvery(types.GET_COUNTRY_REQUEST, getCountriesSaga);
}

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForman() {
  yield fork(watchGetRequest);
}
