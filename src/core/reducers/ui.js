//@flow

import types from '../actionTypes'

export default (state, action)=> {
    switch (action.type) {

        case types.NEWS_HOVER: return { ...state, hoverItem:action.payload };

        case types.NEWS_LEAVE: return { ...state, hoverItem : null };

        default: return {...state}
    }
}



