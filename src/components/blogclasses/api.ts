import {PostRequest} from "../../api/http"
import {CLASSINFO} from "./index"

export const getClasses = (params?:CLASSINFO):Promise<CLASSINFO> =>{
    return PostRequest("/blog/classes", params)
}
export const updateClasses = (params:CLASSINFO):Promise<CLASSINFO> =>{
    return PostRequest("/blog/updateClasses", params)
}
export const deleteClasses = (params:CLASSINFO):Promise<CLASSINFO> =>{
    return PostRequest("/blog/deleteClasses", params)
}
export const createClasses = (params:CLASSINFO):Promise<CLASSINFO> =>{
    return PostRequest("/blog/createClasses", params)
}