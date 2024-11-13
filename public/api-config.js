const API_CONFIG = {
  baseUrl: '/public/data', 
  endpoints: {
    admin:{
      getUserList:'admin/getUserList.json',//取得員工清單
      enableUser:'admin/enableUser.json',//啟用員工
      disableUser:'admin/disableUser.json',//停用員工
      saveUserRole:'admin/saveUserRole.json'//更新員工權限
    },
    user:{
      getProfile:'user/getProfile.json',//取得員工資料
      saveProfile:'user/saveProfile.json',//儲存員工資料
      getResume:'user/getResume.json',//取得員工簡歷
      saveResume:'user/saveResume.json',//儲存員工簡歷
      deleteEducationExperience:'user/deleteEducationExperience.json',//刪除教育經驗
      deleteWorkingExperience:'user/deleteWorkingExperience.json',//刪除工作經驗
      deleteEmergencyContact:'user/deleteEmergencyContact.json',//刪除緊急聯絡人
      deleteUserPublication:'user/deleteUserPublication.json',//刪除著作(員工簡歷)
      deleteUserProject:'user/deleteUserProject.json',//刪除刪除專案經驗(員工簡歷)
    },
    Home:{
      login:'Home/login.json'//登入
    },
    MetaData:{
      getMetaDataList:'MetaData/getMetaDataList.json'//下拉選單選項
    }
  }
}