//@flow

import types from '../actionTypes'

export default (state, action)=> {
    switch (action.type) {

        case types.MAP_VIEW:{
            const { zoom = 10, center } = action.payload;
            return { ...state, center:[center[0],center[1]-0.015], zoom:zoom }
        }

        default:
            return {...state}
    }
}



