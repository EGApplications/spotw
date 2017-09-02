import { fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../constants';
import { sagaGenFunction } from './request';


function* watchGetRequest() {
  yield takeEvery(actionTypes.GET_ACTION_REQ, sagaGenFunction);
  //next watcher for async actions
  // yield takeEvery(types.GET_COUNTRY_REQUEST, getCountriesSaga);
}

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForman() {
  yield fork(watchGetRequest);
}
