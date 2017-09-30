//@flow
import { takeEvery, takeLatest, fork, call, all} from 'redux-saga/effects';
import types from '../actionTypes';
import * as request from './request';
import * as map from './map';
import * as ui from './ui';
import * as auth from './auth';

function* requestSagas(){
    yield takeLatest( types.GET_EVENTS_REQ, request.getEventsSaga );
    yield takeEvery( types.SAVE_EVENT_REQ, request.saveEventSaga );
    yield takeEvery( types.SAVE_EVENT_OK, request.saveEventOkSaga );
}

function* mapSagas(){
    yield takeLatest( types.BOUNDS_CHANGED, map.boundsChangeSaga );
    yield takeEvery( types.GET_USER_COORDS_REQ, map.userCoordsSaga );
    yield takeEvery( types.MAP_CLICK, map.mapClickSaga );
}

function* uiSagas(){
    yield takeEvery( types.CREATE_MARKER_CLICK, ui.newMarkerSaga );
    yield takeEvery( types.EDITOR_SUBMIT, ui.editorSubmitSaga );
    yield takeLatest( types.FILTER_CHANGED, ui.filterChangedSaga );
}

function* authSagas(){
    yield takeEvery( types.LOGIN_LOCAL_REQ, auth.loginLocalSaga );
    yield takeEvery( types.SIGNIN_LOCAL_REQ, auth.signinLocalSaga );
    yield takeEvery( types.GET_CURRENT_USER_REQ, auth.getCurrentUserSaga );
    yield takeEvery( types.USER_LOGOUT_REQ, auth.logoutUserSaga );
    yield takeEvery( types.LOGIN_WITH_VK_REQ, auth.loginWithVkSaga );
    yield takeEvery( types.LOGIN_WITH_GP_REQ, auth.loginWithGpSaga);
    yield takeEvery( types.LOGIN_WITH_FB_REQ, auth.loginWithFbSaga );
    yield takeEvery( types.RESET_PASSWORD_REQ, auth.resetPasswordSaga );
}

function* initSaga(){
    yield takeEvery( types.INIT_APP_REQ, function*(){
        yield all( [
            call( map.userCoordsSaga, {} ),
            call( auth.getCurrentUserSaga, {} )
        ] )
    });
}



export default function* startForman() {
    yield fork(initSaga);
    yield fork(requestSagas);
    yield fork(mapSagas);
    yield fork(uiSagas);
    yield fork(authSagas);
}




