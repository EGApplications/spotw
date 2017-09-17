import { put, call, all } from 'redux-saga/effects';
import types from '../actionTypes';
import { getFromStore } from './selectors'

export function* boundsChangeSaga( { payload } ){
    yield put( { type:types.GET_EVENTS_REQ, payload } )
}

export function* userCoordsSaga({ payload }) {
    try {
        const {coords:{latitude,longitude}} = yield call(getUserPosition, payload);
        yield put({ type: types.GET_USER_COORDS_OK, payload:{latitude,longitude} });
        yield put({ type: types.MAP_VIEW, payload:{ center:{latitude,longitude:longitude-0.165}, zoom:11 } });

    } catch (error) {
        yield put({ type: types.GET_USER_COORDS_ERR, error });
    }
}

export function* mapClickSaga({payload}) {
    const cursor = yield getFromStore('map.cursor');
    const isMarkerPointerCursor = !!~cursor.indexOf('marker-cursor.png');

    console.log(payload);

    yield put({type: types.SAVE_LAST_CLICK, payload});

    //create new event logic
    if (isMarkerPointerCursor) {
        yield all([
            put({type: types.EDITOR_TOGGLE}),
            put({type: types.CURSOR_CHANGE, payload: "default"})
        ])
    }
}

function getUserPosition(){
    return new Promise( (resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject) )
}



