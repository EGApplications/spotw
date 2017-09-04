import types from './actionTypes';

export const getEvents = payload => ({
  type: types.EVENTS_REQ,
  payload
});

export const setMapView = payload => ({
  type: types.MAP_VIEW,
  payload
});


