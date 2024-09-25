import { defineStore } from 'pinia'
import { reactive, computed, inject, ref } from "vue";

export const useEmployeeStore = defineStore("employeeStore", () => {
  const getUserInfo=ref({
    key: '',//帳號+密碼
    userName: '',//用戶名
    role: '0',//權限等級 1:員工 2:主管 3:人事 0:未登入
    firebaseKey:'',
    basicInformation: {},//人員資料表
    curriculumVitae: {},//個人簡歷
  })
  // 目前顯示 人員資料表
  const tmpBasicInformation = ref({
    profileImageUrl: '', // 大頭貼 URL
    idCardFrontImageUrl: '', // 身分證正面照片 URL
    idCardBackImageUrl: '', // 身分證反面照片 URL
    employeeId: '',//人員編號
    department: '',//進用部門
    arrivalDate: null,//到職日
    name: '',//姓名
    idNumber: '',//身分證號
    sex: '',//性別
    birthday: null,//生日
    homePhone: '',//連絡電話
    phone: '',//行動電話
    residence:{
      postalCode:'',//戶籍地址郵遞區號
      address: ''//戶籍地址
    },//戶籍地址
    mailing:{
      postalCode:'',//通訊地址郵遞區號
      address: ''//通訊地址
    },//通訊地址
    email: '',//信箱
    specialStatus: [],//特殊身分
    drvingLicense: [],//駕照
    maritalStatus: '',//婚姻狀況
    schools: [
      {
        name: "",//學校名稱
        department: "",//科系
        period: [null,null]//修業起訖年月
      }
    ],//學歷
    workExperience: [
      {
        company: "",//公司名稱
        position: "",//職務名稱
        salary: null,//薪資
        leavingReason: "",//離職原因
        period:[null,null]//服務起訖年月
      }
    ],//職務經歷
    languages: [],//語言能力
    computerExpertise: [],//電腦專長
    professionalLicense: [],//專業證照
    knowledgeAndSkills: '',//知識技能
    emergencyContact: {
      name: '', // 緊急聯絡人姓名
      relationship: '', // 關係
      phone: '', // 連絡電話
      mobile: '' // 行動電話
    },//緊急聯絡人資訊
    bank: {
      account: '',//銀行帳號
      branchName: '',//分行名稱
      
    },//銀行資訊
  }
);
  //目前顯示 個人簡歷
  const tmpCurriculumVitae=ref({
    key:null,//key值
    name:'',//姓名
    educationalQualifications:'',//學歷
    expertise:'',//專長
    professionalLicense:'',//專業證照
    workExperience: [
      {
        company: "",//公司名稱
        position: "",//職務名稱
        period: null//服務起訖年月
      }
    ],//職務經歷
    annualPublications:[
      {
        category:'',//類型
        date:null,//時間
        name:''//名稱
      }
    ],//歷年著作
    annualProjects:[
      {
        sponsorUnit:'',//委託單位
        period:null,//起訖時間
        projectName :''//計畫名稱
      }
    ],//歷年計畫
  })
  //登入時 取得用戶資料
  const setUserInfo = (data) => {
    getUserInfo.value=deepCopy(data)
    tmpUserInfo.value=deepCopy(data)
  }
  //暫存 用戶資料
  const tmpUserInfo=ref({
    key: '',//帳號+密碼
    userName: '',//用戶名
    role: '0',//權限等級 1:員工 2:主管 3:人事 0:未登入
    firebaseKey:'',
    basicInformation: {},//人員資料表
    curriculumVitae: {},//個人簡歷
  })

  //更新資料 並跳轉頁面
  const setEmployeeStore = (data) => {
    // getUserInfo.value=data
    tmpBasicInformation.value=deepCopy(data)
    tmpUserInfo.value.basicInformation=deepCopy(data)
  };
  //更新簡歷資料 並跳轉頁面
  const setCurriculumVitae = (data) => {
    // getUserInfo.value=data
    tmpCurriculumVitae.value=deepCopy(data)
    tmpUserInfo.value.curriculumVitae=deepCopy(data)
  };
  //更新暫存資料
  const setTmpUserInfo = (data) => {
    tmpUserInfo.value=deepCopy(data)
  }
  //更新資料
  const updateData=(isSelf=true,data)=>{
    if(isSelf){
      getUserInfo.value=deepCopy(data)
    }
    //修改人員資料表
    if(type=='basicInformation'){
      getUserInfo.value.basicInformation=deepCopy(tmpBasicInformation.value)
    }
    //修改簡歷資料表
    if(type=='curriculumVitae'){
      getUserInfo.value.curriculumVitae=deepCopy(tmpCurriculumVitae.value)
    }
  }
  //清空 人員資料表
  const resetEmployeeStore = () => {
    tmpBasicInformation.value={
      arrivalDate: null,//到職日
      bank: {
        account: '',//銀行帳號
        branchName: '',//分行名稱
        
      },//銀行資訊
      birthday: null,//生日
      computerExpertise: [],//電腦專長
      department: '',//進用部門
      drvingLicense: [],//駕照
      email: '',//信箱
      emergencyContact: {
        name: '', // 緊急聯絡人姓名
        relationship: '', // 關係
        phone: '', // 連絡電話
        mobile: '' // 行動電話
      },//緊急聯絡人資訊
      employeeId: '',//人員編號
      homePhone: '',//連絡電話
      idCardFrontImageUrl: '', // 身分證正面照片 URL
      idCardBackImageUrl: '', // 身分證反面照片 URL
      idNumber: '',//身分證號
      languages: [],//語言能力
      mailing:{
        address: '',//通訊地址
        postalCode: '',//郵遞區號
      },//通訊地址
      maritalStatus: '',//婚姻狀況
      name: '',//姓名
      phone: '',//行動電話
      positionTitle:'',//職稱
      professionalLicense: [],//專業證照
      profileImageUrl: '', // 大頭貼 URL
      residence:{
        address: '',//通訊地址
        postalCode: '',//郵遞區號
      },//戶籍地址
      resignationDate:null,//離職日
      schools: [
        {
          academicDegree:'',//學位
          degreeStatus:"畢業",//畢業狀況
          name: "",//學校名稱
          department: "",//科系
          period: [null,null]//修業起訖年月
        }
      ],//學歷
      sex: '',//性別
      specialStatus: [],//特殊身分
      workExperience: [
        {
          company: "",//公司名稱
          position: "",//職務名稱
          salary: null,//薪資
          leavingReason: "",//離職原因
          period:[null,null]//服務起訖年月
        }
      ],//職務經歷
      

      
    }
  };
  
  //深拷貝
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
  
  return { 
    getUserInfo,
    tmpBasicInformation, 
    setEmployeeStore, 
    resetEmployeeStore,
    tmpCurriculumVitae,
    setCurriculumVitae,
    setUserInfo,
    updateData,
    tmpUserInfo,
    setTmpUserInfo
  };
}, 
);
