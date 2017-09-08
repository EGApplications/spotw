import { fork, takeEvery,all,call } from 'redux-saga/effects';
import types from '../actionTypes';
import { getEventsSaga } from './request';
import { userCoordsSaga } from './map';


function* watchGetRequest() {
  yield takeEvery(types.EVENTS_REQ, getEventsSaga);
  yield takeEvery(types.USER_COORDS_REQ, userCoordsSaga);
  yield takeEvery(types.INIT_APP_REQ, function*(){
      console.log('run all')
      yield all([
          call(getEventsSaga,{}),
          call(userCoordsSaga,{})
      ])
  });

  //next watcher for async actions
  // yield takeEvery(types.GET_COUNTRY_REQUEST, getCountriesSaga);
}

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForman() {
  yield fork(watchGetRequest);
}
