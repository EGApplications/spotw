//@flow

import { combineReducers } from 'redux'
import request from './request'
import map from './map'
import ui from './ui'

export default combineReducers({
    request, map, ui
})