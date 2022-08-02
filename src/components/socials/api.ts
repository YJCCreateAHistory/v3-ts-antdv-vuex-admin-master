import {PostRequest, GetRequest} from "../../api/http"
import {PARAMS} from "./index"
export const getSocialsList = ():Promise<PARAMS>=>{
    return GetRequest("/socials/info")
}
export const updateSocialsList = (params:PARAMS):Promise<PARAMS>=>{
    return PostRequest("/socials/update", params) 
}
export const createSocialsList = (params:PARAMS):Promise<PARAMS>=>{
    return PostRequest("/socials/update", params) 
}
export const deleteSocialsList = (params:PARAMS):Promise<PARAMS>=>{
    return  PostRequest("/socials/update", params) 
}