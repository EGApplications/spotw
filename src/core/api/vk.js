
export const  getUserInfo = (opt)=>new Promise((resolve,reject)=>window.VK.Api.call('users.get', opt, ({response})=>resolve(response[0])))

