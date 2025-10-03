// const API_CONFIG = {
//   baseUrl: '/public/data', 
//   endpoints: {
//     admin:{
//       getUserList:'admin/getUserList.json',//取得員工清單
//       enableUser:'admin/enableUser.json',//啟用員工
//       disableUser:'admin/disableUser.json',//停用員工
//       saveUserRole:'admin/saveUserRole.json',//更新員工權限
//       getUserProfileFile:'admin/getUserProfileFile.json',//匯出人員資料表
//       getUserCvFile:'admin/getUserCvFile.json',//匯出員工簡歷
//       getUserListExcelFile:'admin/getUserListExcelFile.json',//匯出員工清單
//       getFieldDataUpdateLogList:'admin/getFieldDataUpdateLogList.json',//資料異動log清單
//     },
//     user:{
//       getProfile:'user/getProfile.json',//取得員工資料
//       saveProfile:'user/saveProfile.json',//儲存員工資料
//       getResume:'user/getResume.json',//取得員工簡歷
//       saveResume:'user/saveResume.json',//儲存員工簡歷
//       deleteEducationExperience:'user/deleteEducationExperience.json',//刪除教育經驗
//       deleteWorkingExperience:'user/deleteWorkingExperience.json',//刪除工作經驗
//       deleteEmergencyContact:'user/deleteEmergencyContact.json',//刪除緊急聯絡人
//       deleteUserPublication:'user/deleteUserPublication.json',//刪除著作(員工簡歷)
//       deleteUserProject:'user/deleteUserProject.json',//刪除刪除專案經驗(員工簡歷)
//       uploadProfileImage:'data/user/uploadProfileImage.json',//上傳員工照片
//     },
//     Home:{
//       login:'Home/login.json'//登入
//     },
//     MetaData:{
//       getMetaDataList:'MetaData/getMetaDataList.json'//下拉選單選項
//     }
//   }
// }

const API_CONFIG = {
  baseUrl: '/api', 
  endpoints: {
    admin:{
      getUserList:'/api/admin/getUserLIst',//取得員工清單
      enableUser:'/api/admin/enableUser',//啟用員工
      disableUser:'/api/admin/disableUser',//停用員工
      saveUserRole:'/api/admin/saveUserRole',//更新員工權限
	    getUserProfileFile:'/api/user/getPersonalProfileFile',//匯出人員資料表
      getUserCvFile:'/api/user/getPersonalCvFile',//匯出員工簡歷
      getUserListExcelFile:'/api/admin/getUserListExcelFile',//匯出員工清單
      getFieldDataUpdateLogList:'/api/admin/getFieldDataUpdateLogList',//資料異動log清單
    },
    user:{
      getProfile:'/api/user/getProfile',//取得員工資料
      saveProfile:'/api/user/saveProfile',//儲存員工資料
      getResume:'/api/user/getResume',//取得員工簡歷
      saveResume:'/api/user/saveResume',//儲存員工簡歷
      deleteEducationExperience:'/api/user/deleteEducationExperience',//刪除教育經驗
      deleteWorkingExperience:'/api/user/deleteWorkingExperience',//刪除工作經驗
      deleteEmergencyContact:'/api/user/deleteEmergencyContact',//刪除緊急聯絡人
      deleteUserPublication:'/api/user/deleteUserPublication',//刪除著作(員工簡歷)
      deleteUserProject:'/api/user/deleteUserProject',//刪除刪除專案經驗(員工簡歷)
      uploadProfileImage:"api/user/uploadProfile"
    },
    Home:{
      login:'/api/Home/login'//登入
    },
    MetaData:{
      getMetaDataList:'/api/MetaData/getMetaDataList'//下拉選單選項
    },
  }
}
// export default API_CONFIG