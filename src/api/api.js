

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
//取得登入使用者資料
export const getLoginStatus = (params) => userRequest.post(endpoints.login, params);
//取得員工列表
export const getEmployeeList = (params) => userRequest.get(endpoints.employeeList,params);
//取得人員資料表
export const getProfile =(userId=null) => {
  let url = endpoints.getProfile;
  if (userId) {
    url += `?userId=${userId}`;
  }
  // console.log("url",url);
  return userRequest.post(url);
};

//更新人員資料表
export const saveProfile =(data) => userRequest.post(endpoints.saveProfile,data);
//取得個人簡歷
export const getCurriculumVitae =(userId=null) => {
  let url = endpoints.curriculumVitae;
  if (userId) {
    url += `?userId=${userId}`;
  }
  // console.log("url",url);
  return userRequest.post(url);
};
//取得員工列表
export const getOptions = () => userRequest.get(endpoints.getMetaDataList);


