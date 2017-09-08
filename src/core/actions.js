import types from './actionTypes';

export const getEvents = payload => ({
  type: types.EVENTS_REQ,
  payload
});

export const setMapView = payload => ({
  type: types.MAP_VIEW,
  payload
});

export const getUserCoords = payload => ({
  type: types.USER_COORDS_REQ,
  payload
});

export const initApp = payload => ({
  type: types.INIT_APP_REQ,
  payload
});



