import {createStore} from "vuex"
import createPersistedState from "vuex-persistedstate"
import {TOKEN, PAGEINFO, FLAG} from "./type"
const store = createStore ({
    state:{
        data:"",
        page:{},
        flag:{},
        blog:[]

    },
    mutations:{
        // 存放token
        getUserInfo(state:PAGEINFO, data:TOKEN){
            state.data = data;    
        },
        // 存放页面跳转信息(ID, NAME, TITLE)
        getMenuDetail(state:PAGEINFO, data:PAGEINFO){
            state.page = data
        },
        // 路由状态
        getActiveFlag(state:PAGEINFO, data:FLAG){
            console.log(data)
            state.flag = data
        },
        getNewData(state, data) {
            state.blog = data
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