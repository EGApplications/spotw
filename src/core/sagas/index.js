import { takeEvery, takeLatest, fork, call, all, } from 'redux-saga/effects';
import types from '../actionTypes';
import * as request from './request';
import * as map from './map';
import * as ui from './ui';

function* requestSagas(){
    yield takeLatest( types.GET_EVENTS_REQ, request.getEventsSaga );
    yield takeEvery( types.SAVE_EVENT_REQ, request.saveEventSaga );
    yield takeEvery( types.SAVE_EVENT_OK, request.saveEventOkSaga );
    yield takeEvery( types.LOGIN_LOCAL_REQ, request.loginLocalSaga );
    yield takeEvery( types.SIGNIN_LOCAL_REQ, request.signinLocalSaga );
    yield takeEvery( types.GET_CURRENT_USER_REQ, request.getCurrentUserSaga );
    yield takeEvery( types.USER_LOGOUT_REQ, request.logoutUserSaga );
    yield takeEvery( types.LOGIN_WITH_VK_REQ, request.loginWithVkSaga );
    yield takeEvery( types.LOGIN_WITH_GP_REQ, request.loginWithGpSaga);
    yield takeEvery( types.LOGIN_WITH_FB_REQ, request.loginWithFbSaga );
}

function* mapSagas(){
    yield takeLatest( types.BOUNDS_CHANGED, map.boundsChangeSaga );
    yield takeEvery( types.GET_USER_COORDS_REQ, map.userCoordsSaga );
    yield takeEvery( types.MAP_CLICK, map.mapClickSaga );
}

function* uiSagas(){
    yield takeEvery( types.CREATE_MARKER_CLICK, ui.newMarkerSaga );
    yield takeEvery( types.EDITOR_SUBMIT, ui.editorSubmitSaga );
}

function* initSaga(){
    yield takeEvery( types.INIT_APP_REQ, function*(){
        yield all( [
            call( map.userCoordsSaga, {} ),
            call( request.getCurrentUserSaga, {} )
        ] )
    });
}



export default function* startForman() {
    yield fork(initSaga);
    yield fork(requestSagas);
    yield fork(mapSagas);
    yield fork(uiSagas);
}




