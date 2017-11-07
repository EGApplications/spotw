//@flow
export default {
    request:{
        events:[],
        saveEventPending:false,
        userFriends:[]
    },
    auth:{
        user:null,
        msg:null
    },
    map:{
        center:{latitude:55.67846550322208,longitude:37.63229754602618},
        zoom:10,
        userCoords:null,
        bounds:null,
        lastClick:{
            latlng:null
        },
        cursor: "default" //"url(/img/marker-pointer.png), auto"
    },
    ui:{
        editorOpen:false,
        filterEvents:{}
    }
}