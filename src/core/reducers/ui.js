//@flow

import types from '../actionTypes'

export default (state, action)=> {
    switch (action.type) {

        case types.NEWS_HOVER: return { ...state, newsHoveredItem: action.payload };

        case types.EDITOR_TOGGLE: return { ...state, editorOpen: !state.editorOpen};

        default: return {...state}
    }
}



