//@flow

import { all, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import types from '../actionTypes'
import { getFromStore } from "./selectors"
import _ from 'lodash'

export function* newMarkerSaga(){
    yield all( [
        put({ type: types.CURSOR_CHANGE, payload:"url(/img/marker-cursor.png), auto" })
    ] )
}

export function* filterChangedSaga({payload}){
    yield put( { type:types.FILTER_SAVE, payload } );
    delay(1000);
    const {latitude, longitude} = yield getFromStore('map.center');
    yield put( { type:types.GET_EVENTS_REQ, payload:{filter:{name:'contains', data:payload}, point:{lat:latitude,lng:longitude}} } );
}

export function* newsClickSaga({payload:{id}}){
    const events = yield getFromStore('request.events');
    const {coords:[latitude, longitude]} =_.find(events, {id});

    yield put({ type: types.MAP_VIEW, payload:{ center:{latitude,longitude:longitude-0.02}, zoom:14 } });
}

export function* newsTabChangeSaga({payload}){
    yield put( { type:types.TAB_CHANGE_SAVE, payload } );
    const {latitude, longitude} = yield getFromStore('map.center');
    switch (payload.activeIndex) {
        case 0:
            yield put( { type:types.GET_EVENTS_REQ, payload:{point:{lat:latitude,lng:longitude}} } );
            break;
        case 1:
            const {tags} = yield getFromStore('ui.userSettings');
            console.log(tags);
            yield put( { type:types.GET_EVENTS_REQ, payload:{filter:{name:"containedIn",data:{field:'tags',value:tags}}, point:{lat:latitude,lng:longitude}} } );
            break;
        case 2:
            console.log('subscribers');
            yield put( { type:types.GET_EVENTS_REQ, payload:{filter:{name:"subscribes"}, point:{lat:latitude,lng:longitude}} } );
            break;
        default:
            yield put( { type:types.GET_EVENTS_REQ, payload:{point:{lat:latitude,lng:longitude}} } );
    }

}


