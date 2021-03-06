//@flow

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import request from './request'
import map from './map'
import ui from './ui'
import auth from './auth'

export default combineReducers({
    request, map, ui, auth, form
})