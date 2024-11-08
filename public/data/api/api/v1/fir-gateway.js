import { apiMethods } from '~/api/utils/axiosHandle';
import { createAxiosInstance } from '~/api/utils/axiosConfig';

const PROJECT = '/jasmine-fir';
const PATH_FI_POLICY = '/fi/policy/qot';
const PATH_FI_SETTING = '/fi/setting';
const PATH_FI_PRODUCT = '/fi/product';
const BASE_URL_FI_POLICY = `${PROJECT}${PATH_FI_POLICY}`;
const BASE_URL_FI_SETTING = `${PROJECT}${PATH_FI_SETTING}`;
const BASE_URL_FI_PRODUCT = `${PROJECT}${PATH_FI_PRODUCT}`;
const fiPolicyRequest = createAxiosInstance(BASE_URL_FI_POLICY)
const fiSettingRequest = createAxiosInstance(BASE_URL_FI_SETTING)
const fiProductRequest = createAxiosInstance(BASE_URL_FI_PRODUCT)


// - 火險商品(險種)作業
export const apiGetFiItemBenefitsFast = (params) => apiMethods('get', '/item/benefits/fast', fiProductRequest, params); // 取得簡易住火作業，承保項目列表

// - 火險報價單作業
export const apiGetFiPolicyQotPoliciesFullRiskMenuById = (id) => apiMethods('get', `/policies/${id}/full-risk-menu`, fiPolicyRequest); // 依ID取得完整標的階層結構選單
export const apiPostFiPolicyQotPoliciesAddresses = (data) => apiMethods('post', '/policies/addresses', fiPolicyRequest, data); // 要保作業，儲存地址資訊tab
export const apiGetFiPolicyQotPoliciesAddressesById = (id) => apiMethods('get', `/policies/addresses/${id}`, fiPolicyRequest); // 要保作業，依ID查詢地址資訊tab
export const apiPostFiPolicyQotPoliciesClauses = (data) => apiMethods('post', '/policies/clauses', fiPolicyRequest, data); // 要保作業，儲存附加條款tab
export const apiGetFiPolicyQotPoliciesClausesById = (id) => apiMethods('get', `/policies/clauses/${id}`, fiPolicyRequest); // 要保作業，依ID查詢附加條款tab
export const apiPostFiPolicyQotPoliciesCurrencies = (data) => apiMethods('post', '/policies/currencies', fiPolicyRequest, data); // 要保作業，儲存兌換率tab
export const apiGetFiPolicyQotPoliciesCurrenciesById = (id) => apiMethods('get', `/policies/currencies/${id}`, fiPolicyRequest); // 要保作業，依ID查詢兌換率tab
export const apiPostFiPolicyQotPoliciesDetailBusiness = (data) => apiMethods('post', '/policies/detail/business', fiPolicyRequest, data); // 要保作業，儲存商火報價單內容tab
export const apiGetFiPolicyQotPoliciesDetailBusinessById = (id) => apiMethods('get', `/policies/detail/business/${id}`, fiPolicyRequest); // 要保作業，依ID查詢商火報價單內容tab
export const apiPostFiPolicyQotPoliciesDetailResidential = (data) => apiMethods('post', '/policies/detail/residential', fiPolicyRequest, data); // 要保作業，儲存住火報價單內容tab
export const apiGetFiPolicyQotPoliciesDetailResidentialById = (id) => apiMethods('get', `/policies/detail/residential/${id}`, fiPolicyRequest); // 要保作業，依ID查詢住火報價單內容tab
export const apiPostFiPolicyQotPoliciesFiles = (data) => apiMethods('post', '/policies/files', fiPolicyRequest, data); // 要保作業，儲存附加檔案tab
export const apiGetFiPolicyQotPoliciesFilesById = (id) => apiMethods('get', `/policies/files/${id}`, fiPolicyRequest); // 要保作業，依ID查詢附加檔案tab
export const apiGetFiPolicyQotPoliciesMessagesById = (id) => apiMethods('get', `/policies/messages/${id}`, fiPolicyRequest); // 要保作業，依ID查詢核保訊息tab
export const apiGetFiPolicyQotPoliciesRecordsById = (id) => apiMethods('get', `/policies/records/${id}`, fiPolicyRequest); // 要保作業，依ID查詢處理紀錄tab
export const apiPostFiPolicyQotPoliciesRemarks = (data) => apiMethods('post', '/policies/remarks', fiPolicyRequest, data); // 要保作業，儲存備註tab
export const apiGetFiPolicyQotPoliciesRemarksById = (id) => apiMethods('get', `/policies/remarks/${id}`, fiPolicyRequest); // 要保作業，依ID查詢備註tab
export const apiPostFiPolicyQotPoliciesRisks = (data) => apiMethods('post', '/policies/risks', fiPolicyRequest, data); // 要保作業，儲存標的物設定tab
export const apiGetFiPolicyQotPoliciesRisksById = (id) => apiMethods('get', `/policies/risks/${id}`, fiPolicyRequest); // 要保作業，依ID查詢標的物設定tab

// export const apiPostFiPolicyQotPolicies = (data) => apiMethods('post', '/policies', fiPolicyRequest, data); // 儲存火險報價單的保單層資訊
// export const apiGetFiPolicyQotPoliciesById = (id) => apiMethods('get', `/policies/${id}`, fiPolicyRequest); // 依ID查詢報價單(不含SubTables)
// export const apiGetFiPolicyQotPoliciesAddressesById = (id) => apiMethods('get', `/policies/${id}/addresses`, fiPolicyRequest); // 依ID查詢報價單(含Addresses)
// export const apiGetFiPolicyQotPoliciesAddressesMenuById = (id) => apiMethods('get', `/policies/${id}/addresses/addresses-menu`, fiPolicyRequest); // 依ID取得地址與建築物選單
// export const apiGetFiPolicyQotPoliciesAgentsById = (id) => apiMethods('get', `/policies/${id}/agents`, fiPolicyRequest); // 依ID查詢報價單(含Agents)
// export const apiGetFiPolicyQotPoliciesClausesById = (id) => apiMethods('get', `/policies/${id}/clauses`, fiPolicyRequest); // 依ID查詢報價單(含Clauses)
// export const apiGetFiPolicyQotPoliciesClientsById = (id) => apiMethods('get', `/policies/${id}/clients`, fiPolicyRequest); // 依ID查詢報價單(含Clients)
// export const apiGetFiPolicyQotPoliciesCoinsById = (id) => apiMethods('get', `/policies/${id}/coins`, fiPolicyRequest); // 依ID查詢報價單(含Coins)
// export const apiGetFiPolicyQotPoliciesCurrenciesById = (id) => apiMethods('get', `/policies/${id}/currencies`, fiPolicyRequest); // 依ID查詢報價單(含Currencies)
// export const apiGetFiPolicyQotPoliciesExtFisById = (id) => apiMethods('get', `/policies/${id}/ext-fis`, fiPolicyRequest); // 依ID查詢報價單(含ExtFis)
// export const apiGetFiPolicyQotPoliciesFilesById = (id) => apiMethods('get', `/policies/${id}/files`, fiPolicyRequest); // 依ID查詢報價單(含Files)
// export const apiGetFiPolicyQotPoliciesMessagesById = (id) => apiMethods('get', `/policies/${id}/messages`, fiPolicyRequest); // 依ID查詢報價單(含Messages)
// export const apiGetFiPolicyQotPoliciesPayInfosById = (id) => apiMethods('get', `/policies/${id}/pay-infos`, fiPolicyRequest); // 依ID查詢報價單(含PayInfos)
// export const apiGetFiPolicyQotPoliciesRecordsById = (id) => apiMethods('get', `/policies/${id}/records`, fiPolicyRequest); // 依ID查詢報價單(含Records)
// export const apiGetFiPolicyQotPoliciesRemarksById = (id) => apiMethods('get', `/policies/${id}/remarks`, fiPolicyRequest); // 依ID查詢報價單(含Remarks)
// export const apiGetFiPolicyQotPoliciesRisksById = (id) => apiMethods('get', `/policies/${id}/risks`, fiPolicyRequest); // 依ID查詢報價單(含Risks)
// export const apiPostFiPolicyQotPoliciesAddresses = (data) => apiMethods('post', '/policies/addresses', fiPolicyRequest, data); // 儲存火險報價單的標的與地址
// export const apiPostFiPolicyQotPoliciesClauses = (data) => apiMethods('post', '/policies/clauses', fiPolicyRequest, data); // 儲存火險報價單的條款資訊
// export const apiPostFiPolicyQotPoliciesClients = (data) => apiMethods('post', '/policies/clients', fiPolicyRequest, data); // 儲存火險報價單的保單關係人資訊
// export const apiPostFiPolicyQotPoliciesCoinses = (data) => apiMethods('post', '/policies/coinses', fiPolicyRequest, data); // 儲存火險報價單的共保資訊
// export const apiPostFiPolicyQotPoliciesCurrencies = (data) => apiMethods('post', '/policies/currencies', fiPolicyRequest, data); // 儲存火險報價單的幣別兌換率資訊
// export const apiPostFiPolicyQotPoliciesExtFis = (data) => apiMethods('post', '/policies/extFis', fiPolicyRequest, data); // 儲存火險報價單的火險特殊欄位
// export const apiPostFiPolicyQotPoliciesFiles = (data) => apiMethods('post', '/policies/files', fiPolicyRequest, data); // 儲存火險報價單的附加檔案資訊
// export const apiPostFiPolicyQotPoliciesPayInfos = (data) => apiMethods('post', '/policies/payInfos', fiPolicyRequest, data); // 儲存火險報價單的繳費資訊
// export const apiPostFiPolicyQotPoliciesRemarks = (data) => apiMethods('post', '/policies/remarks', fiPolicyRequest, data); // 儲存火險報價單的備註資訊
// export const apiPostFiPolicyQotPoliciesRisks = (data) => apiMethods('post', '/policies/risks', fiPolicyRequest, data); // 儲存火險報價單的標的與地址

// - 火險簡易住火要保作業
export const apiPostFiPolicyQotFastPolicies = (data) => apiMethods('post', '/fast/policies', fiPolicyRequest, data); // 儲存火險簡易住火要保作業報價單
export const apiPostFiPolicyQotFastPoliciesPreSave = (data) => apiMethods('post', '/fast/policies/pre-save', fiPolicyRequest, data); // 暫存火險簡易住火要保作業報價單

// - 通路映射設定
export const apiGetChannelMappings = (params) => apiMethods('get', '/broker/channel-mapping', fiSettingRequest, params); // 查詢通路映射設定
export const apiPostChannelMapping = (data) => apiMethods('post', '/broker/channel-mapping', fiSettingRequest, data); // 儲存通路映射設定
export const apiGetChannelMappingById = (id) => apiMethods('get', `/broker/channel-mapping/${id}`, fiSettingRequest); // 依ID查詢通路映射設定
export const apiDelChannelMapping = (id) => apiMethods('del', `/broker/channel-mapping/${id}`, fiSettingRequest); // 刪除通路映射設定
export const apiGetChannelMenuByRootCode = (rootCode, brokerType) => apiMethods('get', `/broker/channel-menu/${rootCode}/broker-type/${brokerType}`, fiSettingRequest); // 依照登入使用者查詢外部通路第2層目錄選單
export const apiGetRootMenuByBrokerType = (brokerType) => apiMethods('get', `/broker/root-menu/${brokerType}`, fiSettingRequest); // 依照登入使用者查詢外部通路第1層目錄選單
