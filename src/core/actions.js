import types from './actionTypes';

export const getEvents = payload => ({
  type: types.GET_EVENTS_REQ,
  payload
});

export const setMapView = payload => ({
  type: types.MAP_VIEW,
  payload
});

export const getUserCoords = payload => ({
  type: types.GET_USER_COORDS_REQ,
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

export const editorSubmit = payload => ({
  type: types.SAVE_EVENT_REQ,
  payload
});

export const mapClick = payload => ({
  type: types.MAP_CLICK,
  payload
});

export const editorToggle = payload => ({
  type: types.EDITOR_TOGGLE,
  payload
});
export const loginLocal = payload => ({
  type: types.LOGIN_LOCAL_REQ,
  payload
});
export const userLogout = payload => ({
  type: types.USER_LOGOUT_REQ,
  payload
});
export const signinLocal = payload => ({
  type: types.SIGNIN_LOCAL_REQ,
  payload
});
export const filterChanged = payload => ({
  type: types.FILTER_CHANGED,
  payload
});
export const resetPassword = payload => ({
  type: types.RESET_PASSWORD_REQ,
  payload
});
export const loginWithFb = payload => ({
  type: types.LOGIN_WITH_FB_REQ,
  payload
});
export const loginWithVk = payload => ({
  type: types.LOGIN_WITH_VK_REQ,
  payload
});
export const loginWithFbErr = payload => ({
  type: types.LOGIN_WITH_FB_ERR,
  payload
});



