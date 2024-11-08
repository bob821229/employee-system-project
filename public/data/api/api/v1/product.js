import { apiMethods } from '~/api/utils/axiosHandle';
import { createAxiosInstance } from '~/api/utils/axiosConfig';

// 產品頁面
const PROJECT = '/jasmine-product';
const CONTROLLER_PRODUCT = '/product';
const CONTROLLER_PROJECT = '/project';
const BASE_URL_PRODUCT = `${PROJECT}${CONTROLLER_PRODUCT}`;
const BASE_URL_PROJECT = `${PROJECT}${CONTROLLER_PROJECT}`;

const productRequest = createAxiosInstance(BASE_URL_PRODUCT);
const projectRequest = createAxiosInstance(BASE_URL_PROJECT);

// - 火險計算相關
export const apiPostProductCalculateFiFastQotPremCalculate = (data) => apiMethods('post', '/calculate/fi/fast-qot-prem-calculate', productRequest, data);
export const apiPostProductCalculateFiFullyCoveredEarthquakeAmountCalculate = (data) => apiMethods('post', '/calculate/fi/fully-covered-earthquake-amount-calculate', productRequest, data); // 火險足額投保計算地震險保額(簡易住火作業)
export const apiPostProductCalculateFiFullyCoveredFireAmountCalculate = (data) => apiMethods('post', '/calculate/fi/fully-covered-fire-amount-calculate', productRequest, data); // 火險足額投保計算火災險保額(簡易住火作業)

// - 火險專案設定
export const apiGetProjectFiChannelCode = (channelCode) => apiMethods('get', `/fi/${channelCode}`, projectRequest);
export const apiGetProjectFiEvictAllCache = () => apiMethods('get', '/fi/evict-all-cache', projectRequest);

// - 計算公式相關
export const apiGetProductCalculateFormula = (params) => apiMethods('get', '/calculate/formula', productRequest, params);
export const apiPutProductCalculateFormula = (data) => apiMethods('put', '/calculate/formula', productRequest, data);
export const apiPostProductCalculateFormula = (data) => apiMethods('post', '/calculate/formula', productRequest, data);
export const apiGetProductCalculateFormulaDetail = (id) => apiMethods('get', `/calculate/formula/${id}`, productRequest);
export const apiDelProductCalculateFormula = (id) => apiMethods('del', `/calculate/formula/${id}`, productRequest);

// - 計算因子設定
export const apiGetProductCalculateFactor = () => apiMethods('get', '/calculate/factor', productRequest);
export const apiPutProductCalculateFactor = (data) => apiMethods('put', '/calculate/factor', productRequest, data);
export const apiPostProductCalculateFactor = (data) => apiMethods('post', '/calculate/factor', productRequest, data);
export const apiGetProductCalculateFactorDetail = (id) => apiMethods('get', `/calculate/factor/${id}`, productRequest);
export const apiDelProductCalculateFactor = (id) => apiMethods('del', `/calculate/factor/${id}`, productRequest);
export const apiGetProductCalculateFactorSelectMenu = (params) => apiMethods('get', '/calculate/factor/select-menu', productRequest, params);

// - 專案設定
export const apiGetProject = () => apiMethods('get', '', projectRequest);
export const apiPutProject = (data) => apiMethods('put', '/', projectRequest, data);
export const apiPostProject = (data) => apiMethods('post', '/', projectRequest, data);
export const apiGetProjectDetail = (id) => apiMethods('get', `/${id}`, projectRequest);
export const apiDelProject = (id) => apiMethods('del', `/${id}`, projectRequest);
export const apiGetProjectAll = (id) => apiMethods('get', `/${id}/all`, projectRequest);
export const apiGetProjectChannel = (id) => apiMethods('get', `/${id}/channel`, projectRequest);
export const apiGetProjectClause = (id) => apiMethods('get', `/${id}/clause`, projectRequest);
export const apiGetProjectItem = (id) => apiMethods('get', `/${id}/item`, projectRequest);
export const apiGetProjectLimit = (id) => apiMethods('get', `/${id}/limit`, projectRequest);
export const apiPatchProjectOpStatus = (id, opStatus) => apiMethods('patch', `/${id}/op-status/${opStatus}`, projectRequest);
export const apiGetProjectPlan = (id) => apiMethods('get', `/${id}/plan`, projectRequest);
export const apiGetProjectRatio = (id) => apiMethods('get', `/${id}/ratio`, projectRequest);
export const apiGetProjectRelative = (id) => apiMethods('get', `/${id}/relative`, projectRequest);
export const apiPutProjectChannel = (data) => apiMethods('put', '/channel', projectRequest, data);
export const apiPutProjectClause = (data) => apiMethods('put', '/clause', projectRequest, data);
export const apiPutProjectItem = (data) => apiMethods('put', '/item', projectRequest, data);
export const apiPutProjectLimit = (data) => apiMethods('put', '/limit', projectRequest, data);
export const apiPutProjectPlan = (data) => apiMethods('put', '/plan', projectRequest, data);
export const apiPutProjectRatio = (data) => apiMethods('put', '/ratio', projectRequest, data);
export const apiPutProjectRelative = (data) => apiMethods('put', '/relative', projectRequest, data);

// - 條款設定
export const apiGetProductClause = (params) => apiMethods('get', '/clause', productRequest, params);
export const apiPostProductClause = (data) => apiMethods('post', '/clause', productRequest, data);
export const apiGetProductClauseDetail = (id) => apiMethods('get', `/clause/${id}`, productRequest);
export const apiDelProductClause = (id) => apiMethods('del', `/clause/${id}`, productRequest);
export const apiPostProductAddVersion = (id, data) => apiMethods('post', `/clause/${id}/add-version`, productRequest, data);
export const apiGetProductClauseAll = (id) => apiMethods('get', `/clause/${id}/all`, productRequest);
export const apiPatchProductClauseOpStatus = (id, opStatus, data) => apiMethods('patch', `/clause/${id}/op-status/${opStatus}`, productRequest, data);
export const apiGetProductClauseRelative = (id) => apiMethods('get', `/clause/${id}/relative`, productRequest);
export const apiGetProductClauseSetting = (id) => apiMethods('get', `/clause/${id}/setting`, productRequest);
export const apiGetProductClauseClauseList = (productTypeId) => apiMethods('get', `/clause/${productTypeId}/clause-list`, productRequest);
export const apiGetProductClauseGetVersionByCode = (code) => apiMethods('get', `/clause/get-version-by-code/${code}`, productRequest);
export const apiPutProjectClauseRelative = (data) => apiMethods('put', '/clause/relative', projectRequest, data);
export const apiPutProjectClauseSetting = (data) => apiMethods('put', '/clause/setting', projectRequest, data);

// - 費率表版本
export const apiGetProductCalculateRate = () => apiMethods('get', '/calculate/rate', productRequest);
export const apiPutProductCalculateRate = (data) => apiMethods('put', '/calculate/rate', productRequest, data);
export const apiPostProductCalculateRate = (data) => apiMethods('post', '/calculate/rate', productRequest, data);
export const apiGetProductCalculateRateDetail = (id) => apiMethods('get', `/calculate/rate/${id}`, productRequest);
export const apiDelProductCalculateRate = (id) => apiMethods('del', `/calculate/rate/${id}`, productRequest);

// - 經辦通路佣金設定
export const apiGetProductChannel = () => apiMethods('get', '/channel', productRequest);
export const apiPostProductChannel = (data) => apiMethods('post', '/channel', productRequest, data);
export const apiGetProductChannelDetail = (id) => apiMethods('get', `/channel/${id}`, productRequest);
export const apiDelProductChannel = (id) => apiMethods('del', `/channel/${id}`, productRequest);
export const apiPostProductChannelAddVersion = (id, data) => apiMethods('post', `/channel/${id}/add-version`, productRequest, data);
export const apiPatchProductChannelOpStatus = (id, opStatus, data) => apiMethods('patch', `/channel/${id}/op-status/${opStatus}`, productRequest, data);
export const apiGetProductChannelGetVersionByChannelId = (productChannelId) => apiMethods('get', `/channel/get-version-by-channel_id/${productChannelId}`, productRequest);

// - 標的物使用性質設定
export const apiGetProductBuildingUseTypes = () => apiMethods('get', '/building-use-types', productRequest); // 查詢標的物使用性質設定
export const apiPostProductBuildingUseTypes = (data) => apiMethods('post', '/building-use-types', productRequest, data); // 儲存標的物使用性質設定
export const apiGetProductBuildingUseTypesDetail = (id) => apiMethods('get', `/building-use-types/${id}`, productRequest); // 依ID查詢標的物使用性質設定
export const apiDelProductBuildingUseTypes = (id) => apiMethods('del', `/building-use-types/${id}`, productRequest); // 刪除標的物使用性質設定
export const apiPostProductBuildingUseTypesAddVersion = (id, data) => apiMethods('post', `/building-use-types/${id}/add-version`, productRequest, data); // 新增標的物使用性質設定版本
export const apiGetProductBuildingUseTypesGetVersionByCodeAndHugeAmountFlag = (code, hugeAmountFlag) => apiMethods('get', `/building-use-types/get-version-by-code-and-huge-Amount-Flag/${code}/${hugeAmountFlag}`, productRequest); // 依標的物使用性質code以及是否為巨大保額業務取得版本資料(版本列表用)

// - 模版設定
export const apiGetProductTemplate = () => apiMethods('get', '/template', productRequest); // 查詢模版設定(不包含sub table)
export const apiPostProductTemplate = (data) => apiMethods('post', '/template', productRequest, data); // 儲存模版設定
export const apiGetProductTemplateDetail = (id) => apiMethods('get', `/template/${id}`, productRequest); // 依ID查詢模版設定
export const apiDelProductTemplate = (id) => apiMethods('del,', `/template/${id}`, productRequest); // 刪除
export const apiPatchProductTemplateOpStatus = (id, opStatus, data) => apiMethods('patch', `/template/${id}/op-status/${opStatus}`, productRequest, data); // 變更作業狀態
export const apiDelProductTemplateMultiple = (data) => apiMethods('del', '/template/multiple', productRequest, data); // 刪除多筆

// - 縣市重置成本設定
export const apiGetProductZipRebuildPrice = () => apiMethods('get', '/calculate/fi/factors/zip-rebuild-price', productRequest); // 查詢
export const apiPutProductZipRebuildPrice = (data) => apiMethods('put', '/calculate/fi/factors/zip-rebuild-price', productRequest, data); // 更新
export const apiPostProductZipRebuildPrice = (data) => apiMethods('post', '/calculate/fi/factors/zip-rebuild-price', productRequest, data); // 新增
export const apiGetProductZipRebuildPriceDetail = (id) => apiMethods('get', `/calculate/fi/factors/zip-rebuild-price/${id}`, productRequest); // 依ID查詢
export const apiDelProductZipRebuildPrice = (id) => apiMethods('del', `/calculate/fi/factors/zip-rebuild-price/${id}`, productRequest); // 刪除
export const apiPostProductZipRebuildPriceAddVersion = (id, data) => apiMethods(`post`, `/calculate/fi/factors/zip-rebuild-price/${id}/add-version`, productRequest, data); // 新增版本
export const apiPatchProductZipRebuildPriceOpStatus = (id, opStatus, data) => apiMethods(`patch`, `/calculate/fi/factors/zip-rebuild-price/${id}/op-status/${opStatus}`, productRequest, data); // 變更作業狀態
export const apiPatchProductZipRebuildPriceStatus = (id, status, data) => apiMethods(`patch`, `/calculate/fi/factors/zip-rebuild-price/${id}/status/${status}`, productRequest, data); // 變更狀態
export const apiGetProductZipRebuildPriceGetVersionByCode = (code) => apiMethods(`get`, `/calculate/fi/factors/zip-rebuild-price/get-version-by-code/${code}`, productRequest); // 依縣市代碼code取得版本資料(版本列表用)

// - 險別附加檔案設定
export const apiGetProductTypeFile = () => apiMethods('get', '/type/file', productRequest); // 查詢
export const apiPutProductTypeFile = (data) => apiMethods('put', '/type/file', productRequest, data); // 更新
export const apiPostProductTypeFile = (data) => apiMethods('post', '/type/file', productRequest, data); // 新增
export const apiGetProductTypeFileDetail = (id) => apiMethods('get', `/type/file/${id}`, productRequest); // 依ID查詢
export const apiDelProductTypeFile = (id) => apiMethods('del', `/type/file/${id}`, productRequest); // 刪除
export const apiDelProductTypeFileByKey = (key) => apiMethods('del', `/type/file/delete-file/${key}`, productRequest); // 查詢
export const apiGetProductTypeFileDownload = (id) => apiMethods('get', `/type/file/download-file/${id}`, productRequest); // 依ID下載單據檔案
export const apiGetProductTypeFileByKey = (key) => apiMethods('get', `/type/file/key/${key}`, productRequest); // 查詢
export const apiPostProductTypeFileUpload = (data) => apiMethods('post', '/type/file/upload', productRequest, data); // 上傳檔案

// - 險別設定
export const apiGetProductTypes = (params) => apiMethods('get', '/types', productRequest, params); // 查詢
export const apiPutProductTypes = (data) => apiMethods('put', '/types', productRequest, data); // 更新
export const apiPostProductTypes = (data) => apiMethods('post', '/types', productRequest, data); // 新增
export const apiGetProductTypeDetail = (id) => apiMethods('get', `/types/${id}`, productRequest); // 依ID查詢
export const apiDelProductType = (id) => apiMethods('del', `/types/${id}`, productRequest); // 刪除
export const apiPostProductTypeAddVersion = (id, data) => apiMethods('post', `/types/${id}/add-version`, productRequest, data); // 新增版本
export const apiGetProductTypeAll = (id) => apiMethods('get', `/types/${id}/all`, productRequest); // 依ID查詢(含所有sub table)
export const apiGetProductTypeClauseMappings = (id) => apiMethods('get', `/types/${id}/clause-mappings`, productRequest); // 依ID查詢(含適用條款)
export const apiGetProductTypeDynamicFields = (id) => apiMethods('get', `/types/${id}/dynamic-fields`, productRequest); // 依ID查詢(含動態欄位)
export const apiGetProductTypeFiles = (id) => apiMethods('get', `/types/${id}/files`, productRequest); // 依ID查詢(含附加檔案)
export const apiGetProductTypeItem = (id) => apiMethods('get', `/types/${id}/item`, productRequest); // 依ID查詢(含適用承保項目)
export const apiPatchProductTypeOpStatus = (id, opStatus) => apiMethods('patch', `/types/${id}/op-status/${opStatus}`, productRequest); // 變更作業狀態
export const apiGetProductTypeAddChannelSelectMenu = (productGroupType) => apiMethods('get', `/types/add-channel-select-menu/${productGroupType}`, productRequest); // 新增經辦通路佣金，險別設定下拉選單(含適用承保項目)
export const apiGetProductTypeAddFastQotSelectMenu = (productGroupType) => apiMethods('get', `/types/add-fast-qot-select-menu/${productGroupType}`, productRequest); // 取得新增快速出單時，險別下拉選單
export const apiGetProductTypeAddTemplateSelectMenu = () => apiMethods('get', '/types/add-template-select-menu', productRequest); // 取得新增模板時，險別下拉選單
export const apiPutProductTypeClause = (data) => apiMethods('put', '/types/clause', productRequest, data); // 更新(含適用條款)
export const apiPutProductTypeDynamicFields = (data) => apiMethods('put', '/types/dynamic-fields', productRequest, data); // 更新(含動態欄位)
export const apiGetProductTypeEvictAllCache = () => apiMethods('get', '/types/evict-all-cache', productRequest); // 清除快取
export const apiGetProductTypeFastQot = () => apiMethods('get', '/types/fast-qot', productRequest); // 快速出單險別查詢
export const apiGetProductTypeSelectMenu = (productGroupType) => apiMethods('get', `/types/get-select-menu/${productGroupType}`, productRequest); // 依照險群取得險別下拉選單
export const apiGetProductTypeVersionByCode = (code) => apiMethods('get', `/types/get-version-by-code/${code}`, productRequest); // 依code取得險別版本資料(版本列表用)
export const apiPutProductTypeItem = (data) => apiMethods('put', '/types/item', productRequest, data); // 更新(含適用承保項目)
export const apiGetProductTypeItemAndClause = (productGroupType, code) => apiMethods('get', `/types/item-and-clause/${productGroupType}/${code}`, productRequest); // 依code&ProductGroupType查詢最新且生效的險別(含適用承保項目、適用條款)

// - 險種設定
export const apiGetProductItem = (params) => apiMethods('get', '/item', productRequest, params); // 查詢(含核準文號)
export const apiPutProductItem = (data) => apiMethods('put', '/item', productRequest, data); // 更新(含核定文號))
export const apiPostProductItem = (data) => apiMethods('post', '/item', productRequest, data); // 新增
export const apiGetProductItemDetail = (id) => apiMethods('get', `/item/${id}`, productRequest); // 依ID查詢(含核準文號)
export const apiDelProductItem = (id) => apiMethods('del', `/item/${id}`, productRequest); // 刪除
export const apiPostProductItemAddVersion = (id, data) => apiMethods('post', `/item/${id}/add-version`, productRequest, data); // 新增版本
export const apiGetProductItemAll = (id) => apiMethods('get', `/item/${id}/all`, productRequest); // 依ID查詢(含所有sub table)
export const apiGetProductItemBenefits = (id) => apiMethods('get', `/item/${id}/benefits`, productRequest); // 依ID查詢(含險種保額設定)
export const apiGetProductItemCommissions = (id) => apiMethods('get', `/item/${id}/commissions`, productRequest); // 依ID查詢(含險種佣金設定)
export const apiGetProductItemDynamicFields = (id) => apiMethods('get', `/item/${id}/dynamic-fields`, productRequest); // 依ID查詢(含險種動態欄位設定)
export const apiGetProductItemExpenses = (id) => apiMethods('get', `/item/${id}/expenses`, productRequest); // 依ID查詢(含險種附加費用率資料設定)
export const apiPatchProductItemOpStatus = (id, opStatus) => apiMethods('patch', `/item/${id}/op-status/${opStatus}`, productRequest); // 變更作業狀態
export const apiGetProductItemRelative = (id) => apiMethods('get', `/item/${id}/relative`, productRequest); // 依ID查詢(含險種相依互斥設定)
export const apiGetProductItemAllMaxVersionCode = (params) => apiMethods('get', '/item/all-max-version-code', productRequest, params); // 依險別群組取得code下拉選單列表
export const apiGetProductItemApplicableItemList = (productTypeId) => apiMethods('get', `/item/applicable-item-list/${productTypeId}`, productRequest); // 依險別設定id取得適用承保項目code下拉選單列表
export const apiGetProductItemBenefitForTemplateMapping = (templateId) => apiMethods('get', `/item/benefit/for-template-mapping/${templateId}`, productRequest); // 依模板設定id取得對應的承保項目保額設定
export const apiGetProductItemBenefitGetEnableByProductTypeId = (productTypeId) => apiMethods('get', `/item/benefit/get-enable-by-product-type-id/${productTypeId}`, productRequest); // 依險別設定id，取得啟用的承保項目及其保額設定
export const apiGetProductItemBenefitGetLatestByCode = (itemCodes, productGroupType) => apiMethods('get', `/item/benefit/get-latest-by-code/${itemCodes}/${productGroupType}`, productRequest); // 依險種代碼，取得最新的承保項目保額設定
export const apiPutProductItemBenefits = (data) => apiMethods('put', '/item/benefits', productRequest, data); // 更新(含險種保額設定)
export const apiGetProductItemByCode = (code) => apiMethods('get', `/item/by-code/${code}`, productRequest); // 依代碼取得險種資料
export const apiPutProductItemCommission = (data) => apiMethods('put', '/item/commission', productRequest, data); // 更新(含險種佣金設定)
export const apiPutProductItemDynamicField = (data) => apiMethods('put', '/item/dynamic-field', productRequest, data); // 更新(含險種動態欄位設定)
export const apiPutProductItemExpense = (data) => apiMethods('put', '/item/expense', productRequest, data); // 更新(含險種附加費用率設定)
export const apiGetProductItemGetVersionByCode = (code) => apiMethods('get', `/item/get-version-by-code/${code}`, productRequest); // 依code取得險種版本資料(版本列表用)
export const apiGetProductItemSelectMenu = (projectId) => apiMethods('get', `/item/item-select-menu/${projectId}`, productRequest); // 依專案設定id取得承保項目下拉選單(專案承保項目設定＆專案費率佣金設定用)
export const apiGetProductItemMappingItemList = (productTypeId) => apiMethods('get', `/item/mapping-item-list/${productTypeId}`, productRequest); // 依險別設定id取得已經mapping的承保項目code下拉選單列表
export const apiDelProductItemMultiple = (data) => apiMethods('del', '/item/multiple', productRequest, data); // 刪除多筆
export const apiGetProductItemProjectChannelItemSelectMenu = (projectId, planFlag) => apiMethods('get', `/item/project-channel-item-select-menu/${projectId}/${planFlag}`, productRequest); // 依專案設定id取得承保項目的清單(專案通路經辦佣金設定用)
export const apiGetProductItemProjectPlanItemSelectMenu = (projectId) => apiMethods('get', `/item/project-plan-item-select-menu/${projectId}`, productRequest); // 依專案設定id取得承保項目下拉選單(專案計畫別設定用)
export const apiPutProductItemRelative = (data) => apiMethods('put', '/item/relative', productRequest, data); // 更新(含險種相依互斥設定)

// - 職類限制設定
export const apiGetProductOccupationLimit = () => apiMethods('get', '/occupation-limit', productRequest); // 查詢
export const apiPutProductOccupationLimit = (data) => apiMethods('put', '/occupation-limit', productRequest, data); // 更新
export const apiPostProductOccupationLimit = (data) => apiMethods('post', '/occupation-limit', productRequest, data); // 新增
export const apiGetProductOccupationLimitDetail = (id) => apiMethods('get', `/occupation-limit/${id}`, productRequest); // 依ID查詢
export const apiDelProductOccupationLimit = (id) => apiMethods('delete', `/occupation-limit/${id}`, productRequest); // 刪除
export const apiDelProductOccupationLimitOpStatus = (id, opStatus, data) => apiMethods('patch', `/occupation-limit/${id}/op-status/${opStatus}`, productRequest, data); // 變更作業狀態
export const apiDelProductOccupationLimiAddVersion = (data) => apiMethods('post', `/occupation-limit/add-version`, productRequest, data); // 新增版本
export const apiDelProductOccupationLimitByCodesAndProjectCode = () => apiMethods('get', `/occupation-limit/by-codes-and-project-code`, productRequest); // 根據險種代碼與專案代碼取得職類限制
