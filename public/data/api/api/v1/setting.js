import { apiMethods } from '~/api/utils/axiosHandle'
import { createAxiosInstance } from '~/api/utils/axiosConfig'

// 產品頁面
const PROJECT = '/jasmine-setting'
const PATH = '/setting'
const BASE_URL = `${PROJECT}${PATH}`
const request = createAxiosInstance(BASE_URL)

// - 內部組織 - 分公司Api
export const apiPostBranch = (data) => apiMethods('post', '/branches', request, data) // 儲存分公司資訊
export const apiGetBranchDetail = (code) => apiMethods('get', `/branches/${code}`, request) // 根據代碼取得分公司資料
export const apiDelBranch = (code) => apiMethods('del', `/branches/${code}`, request) // 刪除分公司資訊
export const apiGetBranchTreeView = () => apiMethods('get', '/branches/treeview', request) // 取得分公司樹狀結構

// - 台灣行政區域設定
export const apiGetDistrict = (params) => apiMethods('get', '/district', request, params) // 根據搜尋條件查詢行政區域設定
export const apiPostDistrict = (data) => apiMethods('post', '/district', request, data) // 儲存行政區域設定
export const apiGetDistrictDetail = (id) => apiMethods('get', `/district/${id}`, request) // 根據ID查詢該筆行政區域設定
export const apiGetCityLocalNameList = () => apiMethods('get', '/district/city-local-name-list', request) // 查詢城市名稱列表
export const apiGetDistrictLocalNameList = (cityLocalName) =>
  apiMethods('get', `/district/district-local-name-list/${cityLocalName}`, request) // 根據城市名稱查詢鄉鎮市區

// - 外部通路
export const apiGetBrokers = (params) => apiMethods('get', '/broker', request, params) // 查詢外部通路
export const apiPostBroker = (data) => apiMethods('post', '/broker', request, data) // 儲存外部通路
export const apiGetBrokerDetail = (id) => apiMethods('get', `/broker/${id}`, request) // 依ID查詢外部通路
export const apiDelBroker = (id) => apiMethods('del', `/broker/${id}`, request) // 刪除外部通路
export const apiGetBrokerRootChannels = () => apiMethods('get', '/broker/root-channels', request) // 查詢外部通路root清單
export const apiGetBrokerRootChannelsByType = (brokerType) =>
  apiMethods('get', `/broker/root-channels/${brokerType}`, request) // 依類型查詢外部通路root清單
export const apiGetBrokerByRootCode = (rootCode) => apiMethods('get', `/broker/root-code/${rootCode}`, request) // 根據rootCode查詢外部通路

// - 外部通路業務員
export const apiGetBrokerAgents = (params) => apiMethods('get', '/broker-agent', request, params) // 查詢外部通路業務員
export const apiPostBrokerAgent = (data) => apiMethods('post', '/broker-agent', request, data) // 儲存外部通路業務員
export const apiGetBrokerAgentDetail = (id) => apiMethods('get', `/broker-agent/${id}`, request) // 依ID查詢外部通路業務員
export const apiDelBrokerAgent = (id) => apiMethods('del', `/broker-agent/${id}`, request) // 刪除外部通路業務員

// - 地區代號設定
export const apiGetCoveredAreas = (params) => apiMethods('get', '/covered-area', request, params) // 查詢地區代號設定
export const apiPostCoveredArea = (data) => apiMethods('post', '/covered-area', request, data) // 儲存地區代號設定
export const apiGetCoveredAreaDetail = (id) => apiMethods('get', `/covered-area/${id}`, request) // 依ID查詢地區代號設定
export const apiDelCoveredArea = (id) => apiMethods('del', `/covered-area/${id}`, request) // 刪除地區代號設定
export const apiPatchCoveredAreaStatus = (id, status) =>
  apiMethods('patch', `/covered-area/${id}/status/${status}`, request) // 變更地區代號設定狀態

// - 兌換率設定
export const apiGetCurrencies = (params) => apiMethods('get', '/currency', request, params) // 查詢兌換率設定
export const apiPostCurrency = (data) => apiMethods('post', '/currency', request, data) // 儲存兌換率設定
export const apiGetCurrencyDetail = (id) => apiMethods('get', `/currency/${id}`, request) // 依ID查詢兌換率設定
export const apiDelCurrency = (id) => apiMethods('del', `/currency/${id}`, request) // 刪除兌換率設定

// - 批改原因設定
export const apiGetEndorseReasons = (params) => apiMethods('get', '/endorse-reason', request, params) // 查詢批改原因設定
export const apiPostEndorseReason = (data) => apiMethods('post', '/endorse-reason', request, data) // 儲存批改原因設定
export const apiGetEndorseReasonDetail = (id) => apiMethods('get', `/endorse-reason/${id}`, request) // 依ID查詢批改原因設定
export const apiDelEndorseReason = (id) => apiMethods('del', `/endorse-reason/${id}`, request) // 刪除批改原因設定
export const apiPatchEndorseReasonStatus = (id, status) =>
  apiMethods('patch', `/endorse-reason/${id}/status/${status}`, request) // 變更批改原因設定狀態

// - 系統參數設定
export const apiGetSystemParams = (params) => apiMethods('get', '/system-param', request, params) // 查詢系統參數設定
export const apiPostSystemParam = (data) => apiMethods('post', '/system-param', request, data) // 儲存系統參數設定
export const apiGetSystemParamDetail = (id) => apiMethods('get', `/system-param/${id}`, request) // 依ID查詢系統參數設定
export const apiPatchSystemParamStatus = (id, status) =>
  apiMethods('patch', `/system-param/${id}/status/${status}`, request) // 變更系統參數設定狀態
export const apiGetDecorationCostList = () => apiMethods('get', '/system-param/decoration-cost-list', request) // 查詢裝潢成本清單

// - 附加費用率設定
export const apiGetExpenseRatios = (params) => apiMethods('get', '/expense-ratio', request, params) // 查詢附加費用率設定
export const apiPostExpenseRatio = (data) => apiMethods('post', '/expense-ratio', request, data) // 儲存附加費用率設定
export const apiGetExpenseRatioDetail = (id) => apiMethods('get', `/expense-ratio/${id}`, request) // 依ID查詢附加費用率設定
export const apiDelExpenseRatio = (id) => apiMethods('del', `/expense-ratio/${id}`, request) // 刪除附加費用率設定
export const apiPostExpenseRatioAddVersion = (id, data) =>
  apiMethods('post', `/expense-ratio/${id}/add-version`, request, data) // 新增附加費用率設定的版本

// - 建築等級設定
export const apiGetBuildingLevels = (params) => apiMethods('get', '/building-level', request, params) // 查詢建築等級設定
export const apiPostBuildingLevel = (data) => apiMethods('post', '/building-level', request, data) // 儲存建築等級設定
export const apiGetBuildingLevelDetail = (id) => apiMethods('get', `/building-level/${id}`, request) // 依ID查詢建築等級設定
export const apiGetRoofList = () => apiMethods('get', '/roof/list', request) // 取得屋頂材質清單
export const apiGetStructureList = () => apiMethods('get', '/structure/list', request) // 取得建築結構清單
export const apiGetBuildingLevelByStructureAndRoof = (structure, roof) =>
  apiMethods('get', `/building-level/structure/${structure}/roof/${roof}`, request) // 依建物結構&屋頂材質,查詢建築等級

// - 建築結構
export const apiGetStructure = (params) => apiMethods('get', '/structure', request, params) // 查詢建築結構
export const apiPostStructure = (data) => apiMethods('post', '/structure', request, data) // 儲存建築結構
export const apiGetStructureDetail = (id) => apiMethods('get', `/structure/${id}`, request) // 依ID查詢建築結構

// - 屋頂結構
export const apiGetRoof = (params) => apiMethods('get', '/roof', request, params) // 查詢屋頂結構
export const apiPostRoof = (data) => apiMethods('post', '/roof', request, data) // 儲存屋頂結構
export const apiGetRoofDetail = (id) => apiMethods('get', `/roof/${id}`, request) // 依ID查詢屋頂結構

// - 流水號/單號Api
export const apiGetSequenceNumbers = (params) => apiMethods('get', '/sequence-number', request, params) // 查詢流水號
export const apiPutSequenceNumber = (data) => apiMethods('put', '/sequence-number', request, data) // 更新流水號
export const apiPutSequenceNumberJump = (code, seqNo) => apiMethods('put', `/sequence-number/${code}/${seqNo}`, request) // 更新流水號跳號
export const apiGetSequenceNumberDetail = (id) => apiMethods('get', `/sequence-number/${id}`, request) // 依ID查詢
export const apiDelSequenceNumber = (id) => apiMethods('del', `/sequence-number/${id}`, request) // 刪除流水號資料
export const apiGetSequenceNumberJumpById = (id) => apiMethods('get', `/sequence-number/${id}/jump`, request) // 依ID查詢(含流水號跳號)
export const apiGetPolicyNumber = () => apiMethods('get', '/sequence-number/get-policy-no', request) // 取得保單號
export const apiGetQotNumber = () => apiMethods('get', '/sequence-number/get-qot-no', request) // 取得報價單號
export const apiGetSequenceNumberByCode = (code) => apiMethods('get', `/sequence-number/get-seq-no/${code}`, request) // 依Code取得流水號
export const apiGetSequenceNumberJumpAll = () => apiMethods('get', '/sequence-number/jump', request) // 查詢(含流水號跳號)

// - 特定通路佣金率設定
export const apiGetSpecialCommissionRatios = (params) => apiMethods('get', '/special-commission-ratio', request, params) // 查詢特定通路佣金率設定(不含sub table)
export const apiPostSpecialCommissionRatio = (data) => apiMethods('post', '/special-commission-ratio', request, data) // 儲存特定通路佣金率設定
export const apiGetSpecialCommissionRatioDetail = (id) => apiMethods('get', `/special-commission-ratio/${id}`, request) // 依ID查詢特定通路佣金率設定(不含sub table)
export const apiDelSpecialCommissionRatio = (id) => apiMethods('del', `/special-commission-ratio/${id}`, request) // 刪除特定通路佣金率設定
export const apiGetSpecialCommissionRatioWithDetails = (id) =>
  apiMethods('get', `/special-commission-ratio/${id}/detail`, request) // 依ID查詢特定通路佣金率設定(含設定明細)
export const apiPatchSpecialCommissionRatioStatus = (id, status) =>
  apiMethods('patch', `/special-commission-ratio/${id}/status/${status}`, request) // 變更特定通路佣金率設定狀態
export const apiGetSpecialCommissionRatioDetails = () => apiMethods('get', '/special-commission-ratio/detail', request) // 查詢特定通路佣金率設定(含設定明細)

// - 國家設定
export const apiGetCountries = (params) => apiMethods('get', '/country', request, params) // 查詢
export const apiPutCountry = (data) => apiMethods('put', '/country', request, data) // 更新
export const apiPostCountry = (data) => apiMethods('post', '/country', request, data) // 新增
export const apiGetCountryDetail = (id) => apiMethods('get', `/country/${id}`, request) // 依ID查詢
export const apiDelCountry = (id) => apiMethods('del', `/country/${id}`, request) // 刪除
export const apiPatchCountryStatus = (id, status) => apiMethods('patch', `/country/${id}/status/${status}`, request) // 變更狀態

// - 職業設定
export const apiGetOccupations = (params) => apiMethods('get', '/occupation', request, params) // 查詢職業設定
export const apiPostOccupation = (data) => apiMethods('post', '/occupation', request, data) // 儲存職業設定
export const apiGetOccupationDetail = (id) => apiMethods('get', `/occupation/${id}`, request) // 依ID查詢職業設定
export const apiDelOccupation = (id) => apiMethods('del', `/occupation/${id}`, request) // 刪除職業設定
export const apiPatchOccupationStatus = (id, status) =>
  apiMethods('patch', `/occupation/${id}/status/${status}`, request) // 變更職業設定狀態
export const apiGetOccupationCategories = () => apiMethods('get', '/occupation/category', request) // 取得所有職業主類別代碼
export const apiGetOccupationByCode = (code) => apiMethods('get', `/occupation/code/${code}`, request) // 依code代碼查詢職業設定
export const apiGetSubCategoryByCategoryCode = (categoryCode) =>
  apiMethods('get', `/occupation/sub-category-by-category-code/${categoryCode}`, request) // 根據職業主類別代碼取得職業次類別代碼

// - 使用者設定
export const apiGetUsers = (params) => apiMethods('get', '/user', request, params) // 查詢使用者設定
export const apiPostUser = (data) => apiMethods('post', '/user', request, data) // 儲存使用者設定
export const apiGetUserDetail = (id) => apiMethods('get', `/user/${id}`, request) // 依ID查詢使用者設定
export const apiGetUserDetailByAccount = (account) => apiMethods('get', `/user/account/${account}`, request) // 依帳號查詢使用者設定
export const apiGetLoginUserDetail = () => apiMethods('get', `/user/current-login`, request) // 取得當前登入使用者資訊
