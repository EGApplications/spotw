//@flow

import types from '../actionTypes'
import moment from 'moment'

export default ( state, action )=>{
    switch ( action.type ){

        case types.GET_EVENTS_OK:{
            const events = action.payload
                .filter( ( { createdBy, mainImage } )=>!!createdBy && !!mainImage )
                .map( ( {
                            location:{ latitude, longitude },
                            mainImage:{ url:src} ,
                            createdBy:user,
                            title, tags, description, objectId:id, startTime, endTime
                        } )=>{
                    return ({
                        user, title, tags, src, description, id,
                        coords:[latitude, longitude],
                        startTime:moment( startTime ).format(),
                        endTime:moment( endTime ).format()
                    })
                } );
            return { ...state, events:events }
        }

        //TODO more semantic refact this
        case types.SAVE_EVENT_OK:{ return {...state, saveEventPending:false} }
        case types.SAVE_EVENT_REQ:{ return {...state, saveEventPending:true} }
        case types.SAVE_EVENT_ERR:{ return {...state, saveEventPending:false} }


        default:
            return {...state}
    }
}



