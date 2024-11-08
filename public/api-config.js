const API_CONFIG = {
  baseUrl: '/public/data', 
  endpoints: {
    login:'loginSuccessful.json',//檢查登入是否成功
    getProfile:'basicInformation.json',//取得人員資料表
    saveProfile:'',//更新人員資料表
    getMetaDataList:'options.json',//取得下拉選項
    curriculumVitae:'curriculumVitae.json',//取得個人簡歷
    employeeList:'employeeList1.json',//員工列表
    disableUser:'disableUser',//停用使用者
    enableUser:'enableUser',//啟用使用者
    saveCurriculumVitae:'',//更新個人簡歷
    }
}