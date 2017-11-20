import config from '../../../config'
const FB = window.FB;
console.time('fb init');
FB.init({
    appId            : config.fb.app_id,
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
});
console.timeEnd('fb init');

export const getUserPicture = (id,opt)=>{
    return new Promise((resolve,reject)=>{
        FB.api( `/${id}/picture`, opt, resp=>(resp && !resp.error) ? resolve(resp) :reject(resp) );
    })
}

export const login = ()=>{
    return new Promise((resolve,reject)=>{
        FB.login(
            resp=>(resp && !resp.error) ? resolve(resp) :reject(resp),
            {scope:config.fb.scope, return_scopes: true}
        );
    })
}

export const getUserInfo = (id)=>{
    return new Promise((resolve,reject)=>{
        FB.api(`/${id}`,{fields:config.fb.userFields}, resp=>(resp && !resp.error) ? resolve(resp) :reject(resp),);
    })
}

//const ExtendAccessTokenTime = ()=>{
//    FB.api('oauth/access_token', {
//        client_id: 'client_id',
//        client_secret: 'client_secret',
//        grant_type: 'fb_exchange_token',
//        fb_exchange_token: 'existing_access_token'
//    }, function (res) {
//        if(!res || res.error) {
//            console.log(!res ? 'error occurred' : res.error);
//            return;
//        }
//
//        var accessToken = res.access_token;
//        var expires = res.expires ? res.expires : 0;
//    });
//}
