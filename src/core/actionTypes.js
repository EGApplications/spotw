//@flow
const asyncActionNames = name =>({
        [name + "_REQ"]:name + "_REQ",
        [name + "_OK"]:name + "_OK",
        [name + "_ERR"]:name + "_ERR"
    });

export default {
    ACTION_TYPE : 'ACTION_TYPE',

    //async actions
    ...asyncActionNames('EVENTS'),
    ...asyncActionNames('GET_ACTION')
};






