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
    CHANGE_CURSOR:"CHANGE_CURSOR",
    MAP_CLICK:"MAP_CLICK",

    //async actions
    ...asyncActionNames("EVENTS"),
    ...asyncActionNames("INIT_APP"),
    ...asyncActionNames("USER_COORDS"),
};






