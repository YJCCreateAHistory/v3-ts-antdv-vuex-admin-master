import { PostRequest} from "../../api/http"
import { EL} from "./index"
export const getBlogList = (params:EL={}):Promise<EL> => {
    return PostRequest("/blog/list", params)
};
export const updateBlogList = (params:EL):Promise<EL> => {
    return PostRequest("/blog/update", params)
};
export const deleteBlogList = (params:EL):Promise<EL> => {
    return PostRequest("/blog/delete", params)
};

export const createBlogList = (params:EL):Promise<EL> => {
    return PostRequest("/blog/create", params)
};