//@flow

import types from '../actionTypes'

export default (state, action)=> {
    switch (action.type) {

        case types.SAVE_USER_IN_STORE:{ return { ...state, user:action.payload} }

        case types.DELETE_USER_FROM_STORE:{ return { ...state, user:null} }

        case types.SAVE_AUTH_MSG:{ return { ...state, msg:action.payload} }

        default:
            return {...state}
    }
}



