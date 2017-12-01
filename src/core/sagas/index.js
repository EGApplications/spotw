//@flow
import { takeEvery, takeLatest, fork, call, all} from 'redux-saga/effects';
import types from '../actionTypes';
import * as request from './request';
import * as map from './map';
import * as ui from './ui';
import * as auth from './auth';
import * as inside from './inside';

function* requestSagas(){
    yield takeLatest( types.GET_EVENTS_REQ, request.getEventsSaga );
    yield takeEvery( types.SAVE_EVENT_REQ, request.saveEventSaga );
    yield takeEvery( types.GET_FRIENDS_REQ, request.getFriendsSaga );
    yield takeEvery( types.SAVE_EVENT_OK, request.saveEventOkSaga );
    yield takeLatest( types.SUBSCRIBE_CLICK, request.subscribeSaga );
    yield takeLatest( types.MEMBER_CLICK, request.memberSaga );
}

function* mapSagas(){
    yield takeLatest( types.VIEWPORT_CHANGED, map.viewportChangeSaga );
    yield takeEvery( types.GET_USER_COORDS_REQ, map.userCoordsSaga );
    yield takeEvery( types.MAP_CLICK, map.mapClickSaga );
}

function* uiSagas(){
    yield takeEvery( types.CREATE_MARKER_CLICK, ui.newMarkerSaga );
    yield takeLatest( types.FILTER_CHANGED, ui.filterChangedSaga );
    yield takeLatest( types.TAG_CLICK, ui.filterChangedSaga );
    yield takeLatest( types.NEWS_CLICK, ui.newsClickSaga );
    yield takeLatest( types.NEWS_TAB_CHANGE, ui.newsTabChangeSaga );
}

function* authSagas(){
    yield takeEvery( types.LOGIN_LOCAL_REQ, auth.loginLocalSaga );
    yield takeEvery( types.SIGNIN_LOCAL_REQ, auth.signinLocalSaga );
    yield takeEvery( types.GET_CURRENT_USER_REQ, auth.getCurrentUserSaga );
    yield takeEvery( types.USER_LOGOUT_REQ, auth.logoutUserSaga );
    yield takeEvery( types.LOGIN_WITH_VK_REQ, auth.loginWithVkSaga );
    yield takeEvery( types.LOGIN_WITH_FB_REQ, auth.loginWithFbSaga );
    yield takeEvery( types.RESET_PASSWORD_REQ, auth.resetPasswordSaga );
}

function* insideSagas(){
    yield takeEvery( types.BEFORE_USER_SAVE_IN_STORE, inside.beforeUserSaveInStore );
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
    yield fork(insideSagas);
}




