//@flow

import types from '../actionTypes'
import _ from 'lodash'

export default (state, action)=> {
    switch (action.type) {

        case types.NEWS_HOVER: return { ...state, newsHoveredItem: action.payload };

        case types.EDITOR_TOGGLE: return { ...state, editorOpen: !state.editorOpen};

        case types.SAVE_FILTER: {
            //clear empty fields
            _.forEach( action.payload, (value,key)=>{
                if (!value) delete action.payload[key]
            } )
            return { ...state, filterEvents:  action.payload };
        }

        default: return {...state}
    }
}



