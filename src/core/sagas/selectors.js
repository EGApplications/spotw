//@flow
import { select } from 'redux-saga/effects';
import _ from 'lodash';

export const getFromStore = path => select( (state,path) => _.get(state,path), path );