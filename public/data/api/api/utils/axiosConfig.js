import axios from 'axios';
import { useLoaderStore } from '@/stores/loader.store';
import { LRUCache } from 'lru-cache';
import { handleError, handleDesc } from '~/api/utils/axiosHandle';
import qs from 'qs';

// 定义 LRU 缓存机制
const CACHED = new LRUCache({
    max: 1000,
    maxAge: 1000 * 60 * 60, // 1小时
});

// 創建通用axios
export function createAxiosInstance(baseURL) {
    // 建立axios實例
    const instance = axios.create({
        baseURL,
        proxy: true,
        // 驗證狀態設定 http狀態馬200~299視為成功，但不知道前人為什麼設200~399成功
        validateStatus: (status) => status >= 200 && status < 400,
        // 用和url query paramet，將他轉乘query格式
        // ex. const params = { name: 'John', age: 30 }; 透過(paramsSerializer)轉成 const queryString = qs.stringify(params); // 输出: 'name=John&age=30'
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });

    // 請求攔截器: request前做一些處理
    instance.interceptors.request.use(config => {

        // console.log(config)
        // console.log("請求前做某些事情~")
        const loaderStore = useLoaderStore();
        loaderStore.doShow(`${config.method.toUpperCase()} ${config.url}`);
        if (config.method === 'get' && config?.lruCache && CACHED.has(config.url)) {
            // console.log("Using LRU-cache:", config.url);
            config.adapter = () => Promise.resolve(CACHED.get(config.url));
        }
        return config;
    });

    // 回應攔截器: response後做出的一些處理 ex. 錯誤訊息等等
    instance.interceptors.response.use(response => {
        // console.log("回應後做某些事情~")
        const config = response.config;
        const loaderStore = useLoaderStore();
        loaderStore.doClose(`${config.method.toUpperCase()} ${config.url}`);
        if (config.method === 'get' && config?.lruCache) {
            CACHED.set(config.url, response);
        }
        return response;
    }, (error) => {
        if (error.config) {
            const config = error.config;
            const loaderStore = useLoaderStore();
            loaderStore.doClose(`${config.method.toUpperCase()} ${config.url}`);
        };
        // console.log(error)
        handleError(error);
        return Promise.reject(error);
    });
    return instance;
};
