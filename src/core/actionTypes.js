//@flow
const asyncActionNames = name =>({
        [name + "_REQ"]:name + "_REQ",
        [name + "_OK"]:name + "_OK",
        [name + "_ERR"]:name + "_ERR"
    });

export default {
    MAP_VIEW:"MAP_VIEW",
    NEWS_HOVER:"NEWS_HOVER",
    NEWS_LEAVE:"NEWS_LEAVE",

    //async actions
    ...asyncActionNames("EVENTS"),
    ...asyncActionNames("INIT_APP"),
    ...asyncActionNames("USER_COORDS"),
};






