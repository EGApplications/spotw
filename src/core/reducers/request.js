//@flow

import types from '../actionTypes'
import moment from 'moment'

export default (state, action)=> {
    switch (action.type) {

        case types.GET_EVENTS_OK:{
            const events = action.payload.map( event=>{
                return ({
                    //user: event.get('createdBy').get('username'),
                    coords:[ event.get('location').latitude, event.get('location').longitude ],
                    title: event.get('title'),
                    tags: event.get('tags'),
                    src: event.get('mainImage') && event.get('mainImage').url(),
                    description: event.get('description'),
                    id: event.id,
                    startTime: moment(event.get('startTime')).format(),
                    endTime: moment(event.get('endTime')).format()
                })
            } );
            return {...state, events: events }
        }

        //TODO more semantic refact this
        case types.SAVE_EVENT_OK:{ return {...state, saveEventPending:false} }
        case types.SAVE_EVENT_REQ:{ return {...state, saveEventPending:true} }
        case types.SAVE_EVENT_ERR:{ return {...state, saveEventPending:false} }


        case types.SAVE_USER_IN_STORE:{ return { ...state, user:action.payload} }
        case types.DELETE_USER_FROM_STORE:{ return { ...state, user:null} }

        default:
            return {...state}
    }
}



