import { put, call } from 'redux-saga/effects';
import types from '../actionTypes';


export function* userCoordsSaga({ payload }) {
    try {
        const {coords:{latitude,longitude}} = yield call(getUserPosition, payload);
        yield put({ type: types.USER_COORDS_OK, payload:{latitude,longitude} });
        yield put({ type: types.MAP_VIEW, payload:{ center:{latitude,longitude:longitude-0.165}, zoom:11 } });

    } catch (error) {
        yield put({ type: types.USER_COORDS_ERR, error });
    }
}

function getUserPosition(){
    return new Promise( (resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject) )
}



