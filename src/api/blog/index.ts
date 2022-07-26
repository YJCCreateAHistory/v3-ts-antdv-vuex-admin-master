import { PostRequest, GetRequest } from "../http";
export const getBlogClasses = await PostRequest('/blog/classes').then((data: any) => {
        return data
})