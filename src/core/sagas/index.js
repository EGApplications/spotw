import { fork, takeEvery,all,call, takeLatest } from 'redux-saga/effects';
import types from '../actionTypes';
import { getEventsSaga } from './request';
import { userCoordsSaga } from './map';


export default function* startForman() {
    yield takeLatest(types.EVENTS_REQ, getEventsSaga);
    yield takeEvery(types.USER_COORDS_REQ, userCoordsSaga);
    yield takeEvery(types.INIT_APP_REQ, function*(){
        yield all([
            call(getEventsSaga,{}),
            call(userCoordsSaga,{})
        ])
    });
}
