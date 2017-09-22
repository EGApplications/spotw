//@flow
const asyncActionNames = name =>({
        [name + "_REQ"]:name + "_REQ",
        [name + "_OK"]:name + "_OK",
        [name + "_ERR"]:name + "_ERR"
    });

export default {
    MAP_VIEW:"MAP_VIEW",
    NEWS_HOVER:"NEWS_HOVER",
    BOUNDS_CHANGED:"BOUNDS_CHANGED",
    CREATE_MARKER_CLICK:"CREATE_MARKER_CLICK",
    CURSOR_CHANGE:"CURSOR_CHANGE",
    EDITOR_SUBMIT:"EDITOR_SUBMIT",
    EDITOR_TOGGLE:"EDITOR_TOGGLE",
    MAP_CLICK:"MAP_CLICK",
    SAVE_LAST_CLICK:"SAVE_LAST_CLICK",
    FILTER_CHANGED:"FILTER_CHANGED",
    SAVE_FILTER:"SAVE_FILTER",

    //async actions
    ...asyncActionNames("GET_EVENTS"),
    ...asyncActionNames("SAVE_EVENT"),
    ...asyncActionNames("INIT_APP"),
    ...asyncActionNames("GET_USER_COORDS"),

    ...asyncActionNames("GET_CURRENT_USER"),
    ...asyncActionNames("USER_LOGOUT"),
    ...asyncActionNames("LOGIN_LOCAL"),
    ...asyncActionNames("SIGNIN_LOCAL"),
    ...asyncActionNames("LOGIN_WITH_FB"),
    ...asyncActionNames("LOGIN_WITH_VK"),
    ...asyncActionNames("LOGIN_WITH_GP"),
};






