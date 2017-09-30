//@flow
import { select } from 'redux-saga/effects';
import _ from 'lodash';

// TODO get rid of the selectors
export const getFromStore = path => select( (state,path) => _.get(state,path), path );