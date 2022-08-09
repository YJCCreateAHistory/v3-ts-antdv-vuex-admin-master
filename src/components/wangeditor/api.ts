import { PostRequest } from "../../api/http";
import {DATA} from "./index";

export const getBlogContentById = (params:DATA):Promise<DATA> => {
    return PostRequest('/blog/list', params)
}
export const setChangeContent = (params:DATA):Promise<DATA>=>{
    return PostRequest("/blog/update", params)
}