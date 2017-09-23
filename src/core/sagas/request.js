import { put, call } from 'redux-saga/effects';
import { getEvents, saveEvent, loginLocal, signinLocal, currentUser, logout } from '../api';
import types from '../actionTypes'
import { getFromStore } from "./selectors"

export function* getEventsSaga( { payload:{ bounds } } ){
    try {
        const filter = yield getFromStore( 'ui.filter' );
        const result = yield call( getEvents, { bounds, filter } );
        yield put( { type:types.GET_EVENTS_OK, payload:result } );
    } catch ( { message } ){
        yield put( { type:types.GET_EVENTS_ERR, message } );
    }
}

export function* saveEventSaga({ payload }) {
  try {
    const result = yield call(saveEvent, payload);
    yield put({ type: types.SAVE_EVENT_OK, payload:result });
  } catch ({message}) {
    yield put({ type: types.SAVE_EVENT_ERR, message });
  }
}

export function* saveEventOkSaga({ payload }) {
  const isEditorOpen = yield getFromStore('ui.editorOpen');
  const bounds = yield getFromStore('map.bounds');
  yield put( { type:types.GET_EVENTS_REQ, payload:{bounds} } );

  if (isEditorOpen) yield put({type:types.EDITOR_TOGGLE});
}

export function* loginLocalSaga({ payload }) {
    try {
        const result = yield call(loginLocal, payload);
        yield put({ type: types.SAVE_USER_IN_STORE, payload:result });
    } catch ({message}) {
        yield put({ type: types.LOGIN_LOCAL_ERR, message });
    }
}

export function* signinLocalSaga({ payload }) {
    try {
        const result = yield call(signinLocal, payload);
        yield put({ type: types.SAVE_USER_IN_STORE, payload:result });
    } catch ({message}) {
        yield put({ type: types.SIGNIN_LOCAL_ERR, message });
    }
}

export function* getCurrentUserSaga({ payload }) {
    const user = currentUser();
    if (user) yield put({ type: types.SAVE_USER_IN_STORE, payload:user });
    else yield put({ type: types.GET_CURRENT_USER_ERR, message:'no current user save' })
}

export function* logoutUserSaga({ payload }) {
    try {
        const result = yield call(logout, payload);
        yield put({ type: types.DELETE_USER_FROM_STORE, payload:result });
    } catch ({message}) {
        yield put({ type: types.DELETE_USER_FROM_STORE, message });
    }
}

export function* loginWithGpSaga({ payload }) {
    try {
        throw (new Error('TODO:google plus login'))
    } catch ({message}) {
        yield put({ type: types.LOGIN_WITH_GP_ERR, message });
    }
}
export function* loginWithFbSaga({ payload }) {
    try {
        throw (new Error('TODO:facebook login'))
    } catch ({message}) {
        yield put({ type: types.LOGIN_WITH_FB_ERR, message });
    }
}
export function* loginWithVkSaga({ payload }) {
    try {
        throw(new Error('TODO:vkontakte login'))
    } catch ({message}) {
        yield put({ type: types.LOGIN_WITH_VK_ERR, message });
    }
}


