//@flow

export const ACTION_TYPE = 'ACTION_TYPE';


//async actions
export const GET_ACTION_REQ = 'GET_ACTION_REQ';
export const GET_ACTION_OK = 'GET_ACTION_OK';
export const GET_ACTION_ERR = 'GET_ACTION_ERR';


//TODO add to export 3 additinal constats for async actions
//eslint-disable-next-line
const generateAsyncActionTypes = name => ({
    [name+"_REQ"]:name+"_REQ",
    [name+"_OK"]:name+"_OK",
    [name+"_ERR"]:name+"_ERR"
})