//@flow

import { combineReducers } from 'redux'
import request from './request'
import map from './map'

export default combineReducers({
    request, map
})