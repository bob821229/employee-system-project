/**
 * @format
 */
import axios from 'axios'
import { apiMethods } from '~/api/utils/axiosHandle'
import { createAxiosInstance } from '~/api/utils/axiosConfig'

const PROJECT = '/jasmine-auth'
const PATH = '/admin'
const BASE_URL = `${PROJECT}${PATH}`
const TOKEN_PATH = '/token'
const TOKEN_URL = `${PROJECT}${TOKEN_PATH}`
const request = createAxiosInstance(BASE_URL)
// token 解析應該是在背後處理，不該顯示loader進度條，也不該顯示錯誤訊息，先自己create axios instance
const tokenRequest = axios.create({
  baseURL: TOKEN_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// - Delegation 委派
export const apiGetDelegations = (params) => apiMethods('get', '/delegations', request, params) // 依照查詢條件取得委派
export const apiPostDelegations = (data) => apiMethods('post', '/delegations', request, data) // 建立委派
export const apiGetDelegationDetail = (id) => apiMethods('get', `/delegations/${id}`, request) // 依照ID取得委派
export const apiPutDelegations = (id, data) => apiMethods('put', `/delegations/${id}`, request, data) // 更新委派
export const apiPutDelegationStatus = (id, data) => apiMethods('put', `/delegations/${id}/activate`, request, data) // 切換委派 active/inactive 狀態

// - Permission 權限
export const apiGetPermissions = (params) => apiMethods('get', '/rbac/permissions', request, params) // 依照查詢條件取得權限
export const apiPostPermissions = (data) => apiMethods('post', '/rbac/permissions', request, data) // 建立權限
export const apiGetPermissionDetail = (id) => apiMethods('get', `/rbac/permissions/${id}`, request) // 依照ID取得權限
export const apiPutPermissions = (id, data) => apiMethods('put', `/rbac/permissions/${id}`, request, data) // 更新權限
export const apiPutPermissionStatus = (id, data) => apiMethods('put', `/rbac/permissions/${id}/activate`, request, data) // 切換權限 active/inactive 狀態

// - Role 角色
export const apiGetRoles = (params) => apiMethods('get', '/rbac/roles', request, params) // 依照查詢條件取得角色
export const apiPostRoles = (data) => apiMethods('post', '/rbac/roles', request, data) // 建立角色
export const apiGetRoleDetail = (id) => apiMethods('get', `/rbac/roles/${id}`, request) // 依照ID取得角色
export const apiPutRoles = (id, data) => apiMethods('put', `/rbac/roles/${id}`, request, data) // 更新角色
export const apiPutRoleStatus = (id, data) => apiMethods('put', `/rbac/roles/${id}/activate`, request, data) // 切換角色 active/inactive 狀態

// - Rule 授權 (綁定哪個角色有哪些權限)
export const apiGetRuleDetail = (roleCode) => apiMethods('get', `/rbac/riles/${roleCode}`, request) // 依照角色代碼查詢存取規則
export const apiPostRule = (data) => apiMethods('post', '/rbac/rules', request, data) // 建立授權規則
export const apiPutRule = (roleCode, data) => apiMethods('put', `/rbac/rules/${roleCode}`, request, data) // 覆蓋授權規則中，指定角色的對應權限
export const apiDelRule = (roleCode) => apiMethods('del', `/rbac/rules/${roleCode}`, request) // 刪除授權規則

// - Ref 關聯(綁定哪個帳號有哪些角色)
export const apiGetRefs = (params) => apiMethods('get', '/refs', request, params) // 依照查詢條件取得關聯 (僅顯示啟用中的角色)
export const apiPostRefs = (data) => apiMethods('post', '/refs', request, data) // 建立關聯
export const apiGetRefDetail = (subject) => apiMethods('get', `/refs/${subject}`, request) // 依照關聯對象取得關聯及角色 (僅顯示啟用中的角色)
export const apiPutRefs = (subject, data) => apiMethods('put', `/refs/${subject}`, request, data) // 更新關聯
export const apiDelRefs = (subject) => apiMethods('del', `/refs/${subject}`, request) // 刪除關聯
export const apiPutRefsStatus = (subject, data) => apiMethods('put', `/refs/${subject}/activate`, request, data) // 切換關聯 active/inactive 狀態
export const apiDelRefsCache = (subject) => apiMethods('del', `/refs/${subject}/cache`, request) // 刪除指定 subject 的 ref 快取
export const apiDelRefsAllCache = () => apiMethods('del', '/refs/cache', request) // 刪除全部的 ref 快取

// - RobotAccount 機器人帳號
export const apiGetRobotAccounts = (params) => apiMethods('get', '/robot-accounts', request, params) // 依照查詢條件取得機器人帳號
export const apiPostRobotAccounts = (data) => apiMethods('post', '/robot-accounts', request, data) // 建立機器人帳號
export const apiGetRobotAccountDetail = (id) => apiMethods('get', `/robot-accounts/${id}`, request) // 依照ID取得機器人帳號
export const apiPutRobotAccounts = (id, data) => apiMethods('put', `/robot-accounts/${id}`, request, data) // 更新機器人帳號
export const apiDelRobotAccounts = (id) => apiMethods('del', `/robot-accounts/${id}`, request) // 刪除機器人帳號
export const apiPatchRobotAccountSecret = (id, data) => apiMethods('patch', `/robot-accounts/${id}`, request, data) // 新機器人帳號之 Secret

// - Token
export const apiPostIntrospectToken = () => apiMethods('post', '/introspect/bearer', tokenRequest) // 解析及檢查 Bearer Token
export const apiGetTokenDelegations = () => apiMethods('get', '/delegations', tokenRequest) // 取得當前使用者能交換的委派清單
export const apiPostTokenDelegations = (actAs) => apiMethods('post', `/delegations${actAs}`, tokenRequest) // 交換委派的 Token
