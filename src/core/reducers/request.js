//@flow

import types from '../actionTypes'
import moment from 'moment'

export default (state, action)=> {
    switch (action.type) {

        case types.GET_EVENTS_OK:{
            const events = action.payload.map(event=>({
                    coords:[ event.get('location').latitude, event.get('location').longitude ],
                    title: event.get('title'),
                    tags: event.get('tags'),
                    src: event.get('mainImage') && event.get('mainImage').url(),
                    description: event.get('description'),
                    id: event.id,
                    startTime: moment(event.get('startTime')).format(),
                    endTime: moment(event.get('endTime')).format()
            }));
            return {...state, events: events }
        }

        default:
            return {...state}
    }
}



