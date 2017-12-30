//@flow

import types from '../actionTypes'
import moment from 'moment'
// eslint-disable-next-line
import twix from 'twix'

export default ( state, action )=>{
    switch ( action.type ){

        case types.GET_EVENTS_OK:{
            const events = action.payload
                .filter( ( { createdBy, mainImage } )=>!!(createdBy && mainImage) )
                .map( ( {
                            location:{ latitude, longitude },
                            mainImage:{ url:src} ,
                            createdBy:user,
                            objectId:id,
                            startTime, endTime,
                            ...rest
                        } )=>{
                    const isDifferentDays = moment(startTime.iso).day() !== moment(endTime.iso).day();
                    const displayTime = moment(startTime.iso).twix(endTime.iso).format({hideTime: isDifferentDays, hourFormat: "HH"});
                    return ({
                        user,  src,  id,
                        coords:[latitude, longitude],
                        displayTime,
                        startTime:moment( startTime.iso ).format(),
                        endTime:moment( endTime.iso ).format(),
                        ...rest
                    })
                } );

            // function multiplyEvents(events, i){
            //     let moreEvents = events.map( ( { coords:[latitude, longitude], id, ...rest } )=>({
            //             coords:[latitude + Math.random()*0.1,longitude + Math.random()*0.1],
            //             id:id + Math.random(),
            //             ...rest
            //         })
            //     ).concat(events);
            //     return moreEvents.length > i ? moreEvents : multiplyEvents(moreEvents, i);
            // }
            // console.time('multiply events');
            //const multipledEvents = multiplyEvents(events,50);
            console.timeEnd('multiply events');
            return { ...state, events }
        }

        //TODO more semantic refact this
        case types.SAVE_EVENT_OK:{ return {...state, saveEventPending:false} }
        case types.SAVE_EVENT_REQ:{ return {...state, saveEventPending:true} }
        case types.SAVE_EVENT_ERR:{
            console.error(action.paylaod)
            return {...state, saveEventPending:false}
        }

        case types.GET_FRIENDS_OK:{
            return { ...state, userFriends:action.payload }
        }


        default:
            return {...state}
    }
}



