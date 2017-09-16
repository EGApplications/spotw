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
    MAP_CLICK:"MAP_CLICK",
    EDITOR_SUBMIT:"EDITOR_SUBMIT",
    EDITOR_CLOSE:"EDITOR_CLOSE",

    //async actions
    ...asyncActionNames("GET_EVENTS"),
    ...asyncActionNames("SAVE_EVENT"),
    ...asyncActionNames("INIT_APP"),
    ...asyncActionNames("GET_USER_COORDS"),
};






