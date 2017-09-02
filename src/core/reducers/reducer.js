//@flow
import * as actionTypes from '../constants'

const initialState = {
    chosenPopupId:null,
    sort:'distance'
};

export default function ui(state = initialState, action) {
    switch (action.type) {

        case actionTypes.ACTION_TYPE:
            console.log('pure function that returns new state');
            return {...state};

        case actionTypes.GET_ACTION_OK:
            console.log('async action are ok');
            return {...state};

        default:
            return {...state}
    }
}



