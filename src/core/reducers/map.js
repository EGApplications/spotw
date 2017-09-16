//@flow

import types from '../actionTypes'

export default (state, action)=> {

    switch (action.type) {

        case types.MAP_VIEW:{
            const { zoom = 10, center } = action.payload;
            return { ...state, center, zoom:zoom }
        }

        case types.GET_USER_COORDS_OK:{
            const {latitude, longitude} = action.payload;
            return { ...state, userCoords:{ latitude , longitude}}
        }

        case types.BOUNDS_CHANGED: return { ...state, bounds:action.payload};

        case types.CURSOR_CHANGE: return { ...state, cursor:action.payload};


        default:
            return {...state}
    }
}



