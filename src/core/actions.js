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

export const newsHover = payload => ({
  type: types.NEWS_HOVER,
  payload
});

export const boundsChanged = payload => ({
  type: types.BOUNDS_CHANGED,
  payload
});

export const createMarkerClick = payload => ({
  type: types.CREATE_MARKER_CLICK,
  payload
});

export const changeCursor = payload => ({
  type: types.CHANGE_CURSOR,
  payload
});
export const mapClick = payload => ({
  type: types.MAP_CLICK,
  payload
});



