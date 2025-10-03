

/** api_config.js */
import axios from 'axios';
import Swal from 'sweetalert2';
// import { API_CONFIG } from '@/api/api-config.js';
import { useRouter } from 'vue-router'
// const router = useRouter();

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
            window.location.href = '/';
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
          window.location.href = '/';
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


// =====================================資料格式化================================================
//人員資料表 資料格式化
function dataFormatHandle(data) {
  // 輔助函數：格式化日期
  const formatDate = (date) => date ? dayjs(date).format('YYYY-MM-DD') : null;

  // 輔助函數：格式化陣列
  const formatArray = (arr) => arr?.map(item => item.text) ?? [];

  // 處理部門
  const getDepartmentValue=(department,departmentFromADServer)=>{
    if(department){
    return department
  }else{
    const departmentIndex = options.value.departmentList.findIndex(d => d.text === departmentFromADServer);
    return departmentIndex >= 0 ? options.value.departmentList[departmentIndex].value : null;
  }
  }
  data.department = getDepartmentValue(data.department,data.departmentFromADServer)

  // 格式化日期字段
  data.arrivalDate = formatDate(data.arrivalDate);
  data.lastWorkingDate = formatDate(data.lastWorkingDate);
  data.birthday = formatDate(data.birthday);

  // 處理緊急聯絡人
  data.emergencyContacts = data.emergencyContacts?.length === 0
    ? [{ mobile: null, name: null, phone: null, relationship: null, rid: null }]
    : data.emergencyContacts;

  // 處理工作經歷
  data.workExperiences = data.workExperiences?.map(item => ({
    ...item,
    period: [dayjs(item.startFrom).format('YYYY-MM'), dayjs(item.endAt).format('YYYY-MM')]
  })) ?? [];

  // 處理教育經歷
  data.educationExperiences = data.educationExperiences?.map(item => ({
    ...item,
    period: [dayjs(item.startFrom).format('YYYY-MM'), dayjs(item.endAt).format('YYYY-MM')]
  })) ?? [];
  if (data.educationExperiences?.length === 0) {
    data.educationExperiences.push({
      rid: null,
      name: null,
      academicDegree: null,
      department: null,
      degreeStatus: null,
      period: [null, null]
    });
  }

  // 處理其他陣列字段
  data.drvingLicense = formatArray(data.drvingLicense);
  data.specialStatus = formatArray(data.specialStatus);
  data.languages = formatArray(data.languages);
  data.computerExpertise = formatArray(data.computerExpertise);
  data.professionalLicense = formatArray(data.professionalLicense);

  return data;
}
//個人簡歷 資料格式化
function dataFormat(data){
  //經歷格式化
  if(data.workExperiences){
    data.workExperiences.forEach((item) =>{
        let startDate=dayjs(item.startFrom).format('YYYY-MM')
        let endDate=dayjs(item.endAt).format('YYYY-MM')
        item.period=[startDate,endDate]
    })
  }else{
    data.workExperiences=[]
  }
  // if(data.workExperiences.length==0){
  //         data.workExperiences.push({
  //         company: null,
  //         position: null,
  //         period:[null,null]
  //     })
  // }
  // 歷年著作格式化
  if(data.annualPublications){
    data.annualPublications.forEach((item) =>{
        item.issueDate=dayjs(item.issueDate).format('YYYY-MM')
    })
  }else{
    data.annualPublications=[]
  }

  //歷年參與之專案計畫格式化
  if(data.annualProjects){
    data.annualProjects.forEach((item) =>{
        let startDate=dayjs(item.startFrom).format('YYYY-MM')
        let endDate=dayjs(item.endAt).format('YYYY-MM')
        item.period=[startDate,endDate]
    })
  }else{
    data.annualProjects=[]
  }
  // if(data.annualProjects.length==0){
  //     data.annualProjects.push({
  //     entrustUnit: null,
  //     projectName: null,
  //     period:[null,null]
  //     })
  // }
  //特殊專長格式化
  if(data.computerExpertise){
    if(data.computerExpertise.length>0){
        const arr = data.computerExpertise.map(item => item.text);
        console.log("整理後e資料表專長:", arr);
        data.computerExpertise = arr;
    }
  }else{
    data.computerExpertise=[]
  }
  //專業證照格式化
  if(data.professionalLicense){
    if(data.professionalLicense.length>0){
        const arr = data.professionalLicense.map(item => item.text);
        console.log("整理後e資料表證照:", arr);
        data.professionalLicense = arr;
    }
  }else{
    data.professionalLicense=[]
  }
  return data
}
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
// 上傳頭像 API
export const apiUploadProfileImage = (formData, onUploadProgress) => {
  return axios.post(`/api/${endpoints.user.uploadProfileImage}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
    withCredentials: false
  })
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
// 取得員工清單
export const apiGetFieldDataUpdateLogList = (from, to) => {
  let url = endpoints.admin.getFieldDataUpdateLogList;
  if (from && to) {
    url += `?from=${from}&to=${to}`;
  }
  return userRequest.post(url);
}
// 啟用員工
export const apiEnableUser = (userId) =>{
  if (userId) {
    let url = endpoints.admin.enableUser;
    url += `?userId=${userId}`;
    return userRequest.post(url);
  }else{
    return
  }
} 
// 停用員工
export const apiDisableUser = (params) => userRequest.post(endpoints.admin.disableUser,params);
//更新員工權限
export const apiSaveUserRole = (params) => userRequest.post(endpoints.admin.saveUserRole, params);

//匯出人員資料表
export const apiGetUserProfileFile = (userId) =>{
  if (userId) {
    let url = endpoints.admin.getUserProfileFile;
    url += `?userId=${userId}`;
    return userRequest.post(url);
  }else{
    return
  }
} 
//匯出員工簡歷
export const apiGetUserCvFile = (userId) => {
  if (userId) {
    let url = endpoints.admin.getUserCvFile;
    url += `?rid=${userId}`;
    return userRequest.post(url);
  }else{
    return
  }
} 
//匯出員工清單
export const apiGetUserListExcelFile = (queryString,parameters) =>{
let url=endpoints.admin.getUserListExcelFile;
url += `?${queryString}`;
return userRequest.post(url,parameters);
} 
//取得台灣郵遞區號
export const apiGetTwZipCode  = () =>axios.get('/data/twZipCode.json')

