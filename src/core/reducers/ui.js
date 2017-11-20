//@flow

import types from '../actionTypes'
import _ from 'lodash'

export default (state, action)=> {
    switch (action.type) {

        case types.EDITOR_TOGGLE: return { ...state, editorOpen: !state.editorOpen};

        case types.FILTER_SAVE: return { ...state, filter: action.payload};

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



