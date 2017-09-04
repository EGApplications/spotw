//@flow

import types from '../actionTypes'

export default (state, action)=> {
    switch (action.type) {

        case types.MAP_VIEW:{
            const { zoom = 10, center } = action.payload;
            return { ...state, center:center, zoom:zoom }
        }

        default:
            return {...state}
    }
}



