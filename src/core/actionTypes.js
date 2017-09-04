//@flow
const asyncActionNames = name =>({
        [name + "_REQ"]:name + "_REQ",
        [name + "_OK"]:name + "_OK",
        [name + "_ERR"]:name + "_ERR"
    });

export default {
    MAP_VIEW:"MAP_VIEW",

    //async actions
    ...asyncActionNames("EVENTS"),
    ...asyncActionNames("GET_ACTION")
};






