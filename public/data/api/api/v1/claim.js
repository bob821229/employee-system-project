/**
 * @format
 */
import { apiMethods } from '~/api/utils/axiosHandle'
import { createAxiosInstance } from '~/api/utils/axiosConfig'

const PROJECT = '/jasmine-claim'
const CLAIM = '/claim'
const BASE_URL_CLAIM = `${PROJECT}${CLAIM}`
const BASE_URL_POLICY = `${PROJECT}`
const claimRequest = createAxiosInstance(BASE_URL_CLAIM)
const policyRequest = createAxiosInstance(BASE_URL_POLICY)

// 保單模組 - 保單 (pos-policy) 適合理賠賠案業務, 調整過的保單欄位
/** pos-policy 保單 **/
export const apiGetPosPolicy = (params) => apiMethods('get', '/pos-policy', claimRequest, params) // 查詢保單(分頁)
export const apiGetPosPolicyById = (id) => apiMethods('get', `/pos-policy/${id}`, claimRequest) // 查詢報案保單
export const apiGetPosPolicyClientById = (id, data) => apiMethods('get', `/pos-policy/${id}/client`, claimRequest, data) // 查詢報案保單關係人(主被保險人)
export const apiGetPosPolicyAddressById = (id, data) =>
  apiMethods('get', `/pos-policy/${id}/address`, claimRequest, data) // 查詢報案保單標的(地址)
export const apiGetPosPolicyRiskById = (id, data) => apiMethods('get', `/pos-policy/${id}/risk`, claimRequest, data) // 查詢報案保單標的(標的物)

/** registration 報案 **/
export const apiGetRegistrationById = (id) => apiMethods('get', `/registration/${id}/pos-policy`, claimRequest) // 查詢報案保單
export const apiGetRegistrationClientById = (id, data) =>
  apiMethods('get', `/registration/${id}/pos-policy/client`, claimRequest, data) // 查詢報案保單關係人
export const apiGetRegistrationAddressById = (id, data) =>
  apiMethods('get', `/registration/${id}/pos-policy/address`, claimRequest, data) // 查詢報案保單標的(地址)
export const apiGetRegistrationRiskById = (id, addressSeq, buildingSeq) =>
  apiMethods('get', `/registration/${id}/pos-policy/risk/address/${addressSeq}/building/${buildingSeq}`, claimRequest) // 查詢報案保單標的(標的物)

/** clmCase 賠案 **/
export const apiGetCaseById = (id) => apiMethods('get', `/case/${id}/pos-policy`, claimRequest) // 查詢報案保單
export const apiGetCaseClientById = (id, data) => apiMethods('get', `/case/${id}/pos-policy/client`, claimRequest, data) // 查詢報案保單關係人
export const apiGetCaseAddressById = (id, data) =>
  apiMethods('get', `/case/${id}/pos-policy/address`, claimRequest, data) // 查詢報案保單標的(地址)
export const apiGetCaseRiskById = (id, addressSeq, buildingSeq) =>
  apiMethods('get', `/case/${id}/pos-policy/risk/address/${addressSeq}/building/${buildingSeq}`, claimRequest) // 查詢報案保單標的(標的物)

// 設定 - 事故原因
export const apiGetPeril = (params) => apiMethods('get', '/setting/peril', claimRequest, params) // 複合查詢
export const apiPostPeril = (data) => apiMethods('post', '/setting/peril', claimRequest, data) // 新增
export const apiGetPerilById = (id) => apiMethods('get', `/setting/peril/${id}`, claimRequest) // ID 查詢
export const apiPutPerilById = (id, data) => apiMethods('put', `/setting/peril/${id}`, claimRequest, data) // 更新
export const apiDeletePerilById = (id) => apiMethods('del', `/setting/peril/${id}`, claimRequest) // 刪除

// 設定 - 重大事件
export const apiGetEvent = (params) => apiMethods('get', '/setting/event', claimRequest, params) // 複合查詢
export const apiPostEvent = (data) => apiMethods('post', '/setting/event', claimRequest, data) // 新增
export const apiGetEventById = (id) => apiMethods('get', `/setting/event/${id}`, claimRequest) // ID 查詢
export const apiPutEventById = (id, data) => apiMethods('put', `/setting/event/${id}`, claimRequest, data) // 更新
export const apiDeleteEventById = (id) => apiMethods('del', `/setting/event/${id}`, claimRequest) // 刪除

// 設定 - 賠付項目
export const apiGetItem = (params) => apiMethods('get', '/setting/item', claimRequest, params) // 複合查詢
export const apiPostItem = (data) => apiMethods('post', '/setting/item', claimRequest, data) // 新增
export const apiGetItemById = (id) => apiMethods('get', `/setting/item/${id}`, claimRequest) // ID 查詢
export const apiPutItemById = (id, data) => apiMethods('put', `/setting/item/${id}`, claimRequest, data) // 更新
export const apiDeleteItemById = (id) => apiMethods('del', `/setting/item/${id}`, claimRequest) // 刪除

// 賠案 - 報案
export const apiGetClaimRegistration = (params) => apiMethods('get', '/registration', claimRequest, params) // 複合查詢
export const apiPostClaimRegistration = (data) => apiMethods('post', '/registration', claimRequest, data) // 新增
export const apiGetClaimRegistrationById = (id) => apiMethods('get', `/registration/${id}`, claimRequest) // ID 查詢
export const apiPutClaimRegistrationById = (id, data) => apiMethods('put', `/registration/${id}`, claimRequest, data) // 更新
export const apiDeleteClaimRegistrationById = (id) => apiMethods('del', `/registration/${id}`, claimRequest) // 刪除
export const apiPutClaimRegistrationEstablish = (id) => apiMethods('put', `/registration/${id}/establish`, claimRequest) // 轉立案

// 賠案 - 主檔
export const apiGetClaimCase = (params) => apiMethods('get', '/case', claimRequest, params) // 複合查詢
export const apiPostClaimCase = (data) => apiMethods('post', '/case', claimRequest, data) // 新增
export const apiGetClaimCaseById = (id) => apiMethods('get', `/case/${id}`, claimRequest) // ID 查詢
export const apiPutClaimCaseById = (id, data) => apiMethods('put', `/case/${id}`, claimRequest, data) // 更新
export const apiDeleteClaimCaseById = (id) => apiMethods('del', `/case/${id}`, claimRequest) // 刪除

// 賠案 - 檔案上傳（檔案紀錄）
export const apiGetClaimRegistrationFiles = (id) => apiMethods('get', `/registration/${id}/file`, claimRequest) // 複合查詢
export const apiPostClaimRegistrationFile = (id, data) =>
  apiMethods('post', `/registration/${id}/file`, claimRequest, data) // 上傳檔案
export const apiPutClaimRegistrationFile = (id, fileId, data) =>
  apiMethods('put', `/registration/${id}/file/${fileId}`, claimRequest, data) // 更新
export const apiDeleteClaimRegistrationFile = (id, fileId) =>
  apiMethods('del', `/registration/${id}/file/${fileId}`, claimRequest) // 刪除
export const apiDownloadClaimRegistrationFile = (id, fileId) =>
  apiMethods('get', `/registration/${id}/file/${fileId}`, claimRequest) // 下載檔案
export const apiGetMetaClaimRegistrationFile = (id, fileId) =>
  apiMethods('get', `/registration/${id}/file/${fileId}/meta`, claimRequest) // 查詢檔案 Meta
