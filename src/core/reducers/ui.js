//@flow

import types from '../actionTypes'

export default (state, action)=> {
    switch (action.type) {

        case types.NEWS_HOVER: return { ...state, newsHoveredItem:action.payload };

        default: return {...state}
    }
}



