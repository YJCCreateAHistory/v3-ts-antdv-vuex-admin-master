import request from './request'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
export function PostRequest(url: string, params: any={}): any {
    return new Promise((resolve, reject) => {
        const data = request({
            url: url,
            method: 'POST',
            data: params
        })
        resolve(data)
        reject("error")
    })
}

export function GetRequest(url: string, params?: any): any {
    return new Promise((resolve, reject) => {
        let data = request({
            url: url,
            method: 'GET',
            data: {}
        })
        resolve(data)
        reject("error")
    })

}