import { put, call } from 'redux-saga/effects';
import { asyncAction } from './api';
import * as actionTypes from '../constants';

export function* sagaGenFunction({ payload }) {
  try {
    const result = yield call(asyncAction, 'some param');
    yield put({ type: actionTypes.GET_ACTION_OK, payload:result });
  } catch (error) {
    yield put({ type: actionTypes.GET_ACTION_ERR, error });
  }
}



