//@flow

import { combineReducers } from 'redux'
import reducer from './reducer'
import request from './request'

export default combineReducers({
    reducer, request
})