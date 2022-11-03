import axios, { Axios } from "axios"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store"

axios.defaults.baseURL = "https://qww123.ltd/bioDesign/"
axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use(
    config => {
        // if (useUserStore().isLogin) {
        return config
        // }
    },
    error => {
        return Promise.error(error)
    }
)

axios.interceptors.response.use(
    response => {
        if(response.status === 200){
            return Promise.resolve(response);
        }else{
            return Promise.reject(response);
        }
    },
    error =>{
        console.log(error)
        if(error.response.status) {
            ElMessage({
                message: error.response.message,
                type: "error"
            })
        }
    }
)

export const request = {
    /**
     * 
     * @param {String} url 
     * @param {import("axios").AxiosRequestConfig} params 
     * @returns {Promise}
     */
    get: (url, params) => new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    }),

    /**
     * 
     * @param {String} url 
     * @param {Axios | undefined} params 
     * @returns 
     */
    post: (url, params) => new Promise((resolve, reject) => {
        axios.post(url, params).then(
            res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}
