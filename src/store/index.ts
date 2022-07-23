import {createStore} from "vuex"
import createPersistedState from "vuex-persistedstate"
const store = createStore ({
    state:{
        data:null,
        _token:null,
    },
    mutations:{
        // 存放token
        checkAccount(state, data){
            state._token = data.token
        }
    },
    actions:{

    },
    // 本地储存
    plugins:[
        createPersistedState({
            storage:window.sessionStorage,

        })
    ]
})
export default store