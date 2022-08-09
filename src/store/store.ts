import {createStore} from "vuex"
import createPersistedState from "vuex-persistedstate"
import {TOKEN, PAGEINFO, FLAG} from "./index"
const store = createStore ({
    state:{
        data:"",
        blog:[],
        content:''
    },
    mutations:{
        // 存放token
        getUserInfo(state:PAGEINFO, data:TOKEN){
            state.data = data;    
        },
        getNewData(state:PAGEINFO, data:FLAG) {
            state.blog = data
        },
        setNewContent(state:PAGEINFO, data:string) {
            state.content = data
        }
    },
    actions:{

    },
    // 本地储存
    plugins:[
        createPersistedState({
            storage:window.sessionStorage
        })
    ]
})
export default store