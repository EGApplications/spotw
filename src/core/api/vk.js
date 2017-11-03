console.time('vk init');
window.VK.init({ apiId: 6046167 });
console.timeEnd('vk init');

export const  getUserInfo = (opt)=>new Promise((resolve,reject)=>window.VK.Api.call('users.get', opt, ({response})=>resolve(response[0])));

export const  getUserFriends = (opt)=>new Promise((resolve,reject)=>window.VK.Api.call('friends.get', opt, ({response})=>resolve(response)));
