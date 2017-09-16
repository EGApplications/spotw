import { takeEvery, takeLatest, fork } from 'redux-saga/effects';
import types from '../actionTypes';
import * as request from './request';
import * as map from './map';
import * as ui from './ui';

function* requestSagas(){
    yield takeLatest( types.GET_EVENTS_REQ, request.getEventsSaga );
    yield takeEvery( types.SAVE_EVENT_REQ, request.saveEventSaga );
}

function* mapSagas(){
    yield takeLatest( types.BOUNDS_CHANGED, map.boundsChangeSaga );
    yield takeEvery( types.GET_USER_COORDS_REQ, map.userCoordsSaga );
    yield takeEvery( types.MAP_CLICK, map.mapClickSaga );
}
function* uiSagas(){
    yield takeEvery( types.CREATE_MARKER_CLICK, ui.newMarkerSaga );
    yield takeEvery( types.EDITOR_SUBMIT, ui.editorSubmitSaga );
    yield takeEvery( types.INIT_APP_REQ, ui.initAppSaga);
}

export default function* startForman() {
    yield fork(requestSagas);
    yield fork(mapSagas);
    yield fork(uiSagas);
}




