import {useStore} from "vuex"
export default function (rid:any){
    const store = useStore()
    const getActiveFlag = (rid:any)=>{
        store.commit("getActiveFlag", JSON.stringify(rid));
    }
}
