

/** api_config.js */
import axios from 'axios';
import Swal from 'sweetalert2';
// import { API_CONFIG } from '/api-config.js'
import { useRouter } from 'vue-router'
const router = useRouter();

// User相關的 api
const userRequest = axios.create({
  baseURL:API_CONFIG.baseUrl
});


const endpoints = API_CONFIG.endpoints;
/** api_action.js */

// =====================================錯誤處理邏輯========================================
// 添加響應攔截器
userRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          Swal.fire({
            title: '錯誤',
            text: `Bad Request: ${response.data.errorMessage || '請求錯誤'}`,
            icon: 'error',
          });
          break;
        case 401:
          Swal.fire({
            icon: 'warning',
            title: '連線逾時',
            text: '請重新登入',
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => {
            router.push('/login');
          });
          break;
        default:
          Swal.fire({
            title: '錯誤',
            text: `未知錯誤: ${response.data.errorMessage || '請稍後再試'}`,
            icon: 'error',
          });
      }
    } else {
      // 如果是網路錯誤
      Swal.fire({
        title: '錯誤',
        text: `Network Error: ${error.message || '網路錯誤'}`,
        icon: 'error',
      });
    }
    return Promise.reject(error);
  }
);


// 401
export const handleErrorResponse = (error) => {
  console.error('連線失敗:', error);
  
  if (error.response) {
    switch(error.response.status) {
      case 401:
        Swal.fire({
          icon: 'warning',
          title: '連線逾時',
          text: '請重新登入',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          router.push('/login');
        });
        break;
      case 400:
        Swal.fire({
          icon: 'error',
          title: '錯誤',
          text: error.response.errorMessage??'詳細資料查閱logId: 5',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          // router.push('/form');
        });
        break;
      default:
        Swal.fire({
          icon: 'error',
          title: '錯誤',
          text: '發生未知的錯誤',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          // router.push('/');
        });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: '連線失敗',
      text: '無法連接到伺服器',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      // router.push('/');
    });
  }
};


// =====================================通用================================================


export const testApi = (path) => userRequest.get(path);



// ================================== api ===============================================
//登入
export const apiLogin = (params) => userRequest.post(endpoints.Home.login, params);

//下拉選單選項
export const apiGetMetaDataList = () => userRequest.get(endpoints.MetaData.getMetaDataList);

//基本資料
// 取得員工資料
export const apiGetProfile = (userId=null) => {
  let url = endpoints.user.getProfile;
  if (userId) {
    url += `?userId=${userId}`;
  }
  return userRequest.post(url);
}
//儲存員工資料
export const apiSaveProfile = (params) => userRequest.post(endpoints.user.saveProfile, params);
//取得員工簡歷
export const apiGetResume = (userId=null) => {
  let url = endpoints.user.getResume;
  if (userId) {
    url += `?userId=${userId}`;
  }
  return userRequest.post(url);
}
// 儲存員工簡歷
export const apiSaveResume = (params) => userRequest.post(endpoints.user.saveResume, params);
// 刪除教育經驗
export const apiDeleteEducationExperience = (rid) =>{
  let url = endpoints.user.deleteEducationExperience;
  if (rid) {
    url += `?rid=${rid}`;
  }
  return userRequest.post(url);
} 
// 刪除工作經驗
export const apiDeleteWorkingExperience = (rid) => {
  let url = endpoints.user.deleteWorkingExperience;
  if (rid) {
    url += `?rid=${rid}`;
  }
  return userRequest.post(url);
} 
// 刪除緊急聯絡人
export const apiDeleteEmergencyContact = (rid) => {
  let url = endpoints.user.deleteEmergencyContact;
  if (rid) {
    url += `?rid=${rid}`;
  }
  return userRequest.post(url);
}
// 刪除歷年著作(員工簡歷)
export const apiDeleteUserPublication = (rid) =>{
  let url = endpoints.user.deleteUserPublication
  if (rid) {
    url += `?rid=${rid}`;
  }
  return userRequest.post(url);
}
// 除刪除專案經驗(員工簡歷)
export const apiDeleteUserProject = (rid) =>{
  let url = endpoints.user.deleteUserProject
  if (rid) {
    url += `?rid=${rid}`;
  }
  return userRequest.post(url);
} 

//admin
// 取得員工清單
export const apiGetUserList = (ifEnable=null) => {
  let url = endpoints.admin.getUserList;
  if (ifEnable!=null) {
    url += `?ifEnable=${ifEnable}`;
  }
  return userRequest.post(url);
}
// 啟用員工
export const apiEnableUser = (userId) => {
  if (userId) {
    let url = endpoints.admin.enableUser;
    url += `?userId=${userId}`;
    return userRequest.post(url);
  }else{
    return
  }
}
// 停用員工
export const apiDisableUser = (userId) => {
  if (userId) {
    let url = endpoints.admin.disableUser;
    url += `?userId=${userId}`;
    return userRequest.post(url);
  }else{
    return
  }
}
//更新員工權限
export const apiSaveUserRole = (params) => userRequest.post(endpoints.admin.saveUserRole, params);


