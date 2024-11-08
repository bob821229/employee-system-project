import { apiMethods } from '~/api/utils/axiosHandle';
import { createAxiosInstance } from '~/api/utils/axiosConfig';

// 產品頁面
const PROJECT = '/jasmine-policy';
const CONTROLLER = '/policy';
const BASE_UR = `${PROJECT}${CONTROLLER}`;

const request = createAxiosInstance(BASE_UR);

// 【保單作業相關】

// - 根據條件查詢保單（不含Risk-Level）
export const apiGetPolicies = (params) => apiMethods('get', '/pos/policies', request, params);
// - 儲存保單
export const apiPostPolicies = (data) => apiMethods('post', '/pos/policies', request, data);
// - 根據ID查詢保單（不含Risk-Level）
export const apiGetPolicyById = (id) => apiMethods('get', `/pos/policies/${id}`, request);
// - 根據ID查詢保單（只含Risk-Level）
export const apiGetPolicyByIdWithRisks = (id) => apiMethods('get', `/pos/policies/${id}/with-risks`, request);
// - 理賠查詢保單
export const apiGetPoliciesFromClaim = (params) => apiMethods('get', '/pos/policies/from-claim', request, params);
// - 根據條件查詢保單（含Risk-Level）
export const apiGetPoliciesWithRisks = (params) => apiMethods('get', '/pos/policies/with-risks', request, params);

// 【報價單放行紀錄相關】

// - 更新放行狀態為 駁回
export const apiPutReleaseRejected = (policyId, id) => apiMethods('put', `/qot/policies/${policyId}/releases/${id}/rejected`, request);
// - 更新放行狀態為 放行
export const apiPutReleaseReleased = (policyId, id) => apiMethods('put', `/qot/policies/${policyId}/releases/${id}/released`, request);
// - 根據條件查詢 放行紀錄
export const apiGetReleases = (params) => apiMethods('get', '/qot/policies/releases', request, params);
// - 更新放行狀態為 待放行（已完成申請）
export const apiPutReleaseApplied = (id) => apiMethods('put', `/qot/policies/releases/${id}/applied`, request);
// - 根據報價單ID查詢 放行紀錄
export const apiGetReleasesByPolicyId = (policyId) => apiMethods('get', `/qot/policies/releases/by-policy-id/${policyId}`, request);

// 【報價單作業相關】

// - 根據條件查詢報價單（只不含標的層）
export const apiGetQuotationPolicies = (params) => apiMethods('get', '/qot/policies', request, params);
// - 儲存報價單
export const apiPostQuotationPolicies = (data) => apiMethods('post', '/qot/policies', request, data);
// - 根據ID查詢報價單（只不含標的層）
export const apiGetQuotationPolicyById = (id) => apiMethods('get', `/qot/policies/${id}`, request);
// - Apply 操作
export const apiPostQuotationPolicyApply = (id) => apiMethods('post', `/qot/policies/${id}/apply`, request);
// - Approve 操作
export const apiPostQuotationPolicyApprove = (id) => apiMethods('post', `/qot/policies/${id}/approve`, request);
// - Issue 操作
export const apiPostQuotationPolicyIssue = (id) => apiMethods('post', `/qot/policies/${id}/issue`, request);
// - Reject 操作
export const apiPostQuotationPolicyReject = (id) => apiMethods('post', `/qot/policies/${id}/reject`, request);
// - Send Approve 操作
export const apiPostQuotationPolicySendApprove = (id) => apiMethods('post', `/qot/policies/${id}/send-approve`, request);
// - 根據ID查詢報價單（只含標的層）
export const apiGetQuotationPolicyByIdWithRisks = (id) => apiMethods('get', `/qot/policies/${id}/with-risks`, request);
// - 複製指定報價單
export const apiPostQuotationPolicyClone = (data) => apiMethods('post', '/qot/policies/clone', request, data);
// - 報價單管理列表查詢
export const apiGetQuotationPolicyManagePage = (params) => apiMethods('get', '/qot/policies/manage-page', request, params);
// - 取得報價單版本列表
export const apiGetQuotationPolicyVersions = (params) => apiMethods('get', '/qot/policies/versions', request, params);
// - 根據條件查詢報價單（只含標的層）
export const apiGetQuotationPoliciesWithRisks = (params) => apiMethods('get', '/qot/policies/with-risks', request, params);

// 【意外險報價單作業相關】

// - 快速出單儲存
export const apiPostAccidentQuotationFastPolicy = (data) => apiMethods('post', '/cs/qot/fast/policies', request, data);