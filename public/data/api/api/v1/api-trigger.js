import { apiMethods } from '~/api/utils/axiosHandle'
import { createAxiosInstance } from '~/api/utils/axiosConfig'

const PROJECT = '/api-trigger'
const PATH = '/batch/namespaces'
const BASE_URL = `${PROJECT}${PATH}`
const request = createAxiosInstance(BASE_URL)

// 指定 Namespace 依條件取得觸發器
export const apiGetApiTriggers = (namespace) => apiMethods('get', `/${namespace}/triggers`, request)

// 指定 Namespace 新增或更新觸發器
export const apiPostApiTrigger = (namespace, data) => apiMethods('post', `/${namespace}/triggers`, request, data)

// 指定 Namespace 依照名稱取得觸發器明細資訊
export const apiGetApiTriggerDetail = (namespace, name) => apiMethods('get', `/${namespace}/triggers/${name}`, request)

// 指定 Namespace 依照名稱刪除觸發器
export const apiDelApiTrigger = (namespace, name) => apiMethods('del', `/${namespace}/triggers/${name}`, request)

// 指定 Namespace 依照名稱啟用或停用觸發器
export const apiPatchApiTriggerActivate = (namespace, name, data) => apiMethods('patch', `/${namespace}/triggers/${name}/activate`, request, data)

// 指定 Namespace 更新觸發器的 cron 設定
export const apiPatchApiTriggerCron = (namespace, name, data) => apiMethods('patch', `/${namespace}/triggers/${name}/cron`, request, data)

// 指定 Namespace 單次執行觸發器
export const apiPostApiTriggerRuns = (namespace, name, data) => apiMethods('post', `/${namespace}/triggers/${name}/runs`, request, data)

// 刷新觸發器
// FIXME: 這隻api是用patch，但是參數要放url傳，不能放在request body，再看看有沒有更好的寫法
export const apiPostApiTriggerRefresh = (namespace, force = false) =>
  apiMethods(
    'patch',
    `/triggers/refresh?namespace=${namespace}&force=${force}`,
    request
  )
