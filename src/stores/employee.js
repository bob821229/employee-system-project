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
  //暫存人員資料表
  const tmpBasicInformation=ref({})
  //暫存個人簡歷
  const tmpCurriculumVitae=ref({})
  //清空 人員資料表
  const resetTmpBasicInformation=()=>{

    tmpBasicInformation={//人員資料表
      arrivalDate: null,//到職日
      bank: {//銀行資訊
        account: null,//銀行帳號
        branchName: null,//分行名稱
        
      },
      birthday: null,//生日
      computerExpertise: [],//電腦專長
      department: null,//進用部門
      drvingLicense: [],//駕照
      email: null,//信箱
      emergencyContact: {
        mobile: null,// 行動電話
        name: null, // 緊急聯絡人姓名
        phone: null, // 連絡電話
        relationship: null // 關係
      },//緊急聯絡人資訊
      employeeId: null,//人員編號
      homePhone: null,//連絡電話
      idCardFrontImageUrl: null, // 身分證正面照片 URL
      idCardBackImageUrl: null, // 身分證反面照片 URL
      idNumber: null,//身分證號
      languages: [],//語言能力
      mailing:{
        address: null,//通訊地址
        postalCode: null,//郵遞區號
      },//通訊地址
      maritalStatus: null,//婚姻狀況
      name: userName,//姓名
      phone: null,//行動電話
      positionTitle:null,//職稱
      professionalLicense: [],//專業證照
      profileImageUrl: null, // 大頭貼 URL
      residence:{
        address: null,//通訊地址
        postalCode: null,//郵遞區號
      },//戶籍地址
      resignationDate:null,//離職日
      schools: [
        {
          academicDegree:null,//學位
          degreeStatus:null,//畢業狀況
          name: null,//學校名稱
          department: null,//科系
          period: [null,null]//修業起訖年月
        }
      ],//學歷
      sex: null,//性別
      specialStatus: [],//特殊身分
      workExperience: [
        {
          company: null,//公司名稱
          position: null,//職務名稱
          salary: null,//薪資
          leavingReason: null,//離職原因
          period:[null,null]//服務起訖年月
        }
      ],//職務經歷
    }
  }
  //清空 個人簡歷
  const resetTmpCurriculumVitae=()=>{
    tmpCurriculumVitae={//個人簡歷
      name: userName,//姓名
      educationalQualifications: null,//學歷
      expertise: null,//專長
      professionalLicense: [],//專業證照
      workExperience: [
          {
              company: null,//公司名稱
              position: null,//職務名稱
              period: [null,null]//服務起訖年月
          }
      ],//職務經歷
      annualPublications: [
          {
              category: null,//類型
              date: null,//時間
              name: null//名稱
          }
      ],//歷年著作
      annualProjects: [
          {
              sponsorUnit: null,//委託單位
              period:[null,null] ,//起訖時間
              projectName: null//計畫名稱
          }
      ],//歷年計畫
  }
  }

  //更新暫存資料
  const setTmpUserInfo = (data) => {
    tmpUserInfo.value=deepCopy(data)
  }
  //更新 人員資料表
  const setTmpBasicInformation = (data) => {
    tmpBasicInformation.value=deepCopy(data)
  }
  //更新 個人簡歷
  const setTmpCurriculumVitae = (data) => {
    tmpCurriculumVitae.value=deepCopy(data)
  }
  
  //清空 人員資料表
  const resetTmpUserInfo = (key='',role='0',userName='') => {
    tmpUserInfo.value={
      key: key,//帳號+密碼
      userName: userName,//用戶名
      role: role,//權限等級 1:員工 2:主管 3:人事 0:未登入
      firebaseKey:null,//firebaseKey
      ifEnable: true,//是否啟用
      basicInformation: {//人員資料表
        arrivalDate: null,//到職日
        bank: {//銀行資訊
          account: null,//銀行帳號
          branchName: null,//分行名稱
          
        },
        birthday: null,//生日
        computerExpertise: [],//電腦專長
        department: null,//進用部門
        drvingLicense: [],//駕照
        email: null,//信箱
        emergencyContact: {
          mobile: null,// 行動電話
          name: null, // 緊急聯絡人姓名
          phone: null, // 連絡電話
          relationship: null // 關係
        },//緊急聯絡人資訊
        employeeId: null,//人員編號
        homePhone: null,//連絡電話
        idCardFrontImageUrl: null, // 身分證正面照片 URL
        idCardBackImageUrl: null, // 身分證反面照片 URL
        idNumber: null,//身分證號
        languages: [],//語言能力
        mailing:{
          address: null,//通訊地址
          postalCode: null,//郵遞區號
        },//通訊地址
        maritalStatus: null,//婚姻狀況
        name: userName,//姓名
        phone: null,//行動電話
        positionTitle:null,//職稱
        professionalLicense: [],//專業證照
        profileImageUrl: null, // 大頭貼 URL
        residence:{
          address: null,//通訊地址
          postalCode: null,//郵遞區號
        },//戶籍地址
        resignationDate:null,//離職日
        schools: [
          {
            academicDegree:null,//學位
            degreeStatus:null,//畢業狀況
            name: null,//學校名稱
            department: null,//科系
            period: [null,null]//修業起訖年月
          }
        ],//學歷
        sex: null,//性別
        specialStatus: [],//特殊身分
        workExperience: [
          {
            company: null,//公司名稱
            position: null,//職務名稱
            salary: null,//薪資
            leavingReason: null,//離職原因
            period:[null,null]//服務起訖年月
          }
        ],//職務經歷
      },
      curriculumVitae: {//個人簡歷
        name: userName,//姓名
        educationalQualifications: null,//學歷
        expertise: null,//專長
        professionalLicense: [],//專業證照
        workExperience: [
            {
                company: null,//公司名稱
                position: null,//職務名稱
                period: [null,null]//服務起訖年月
            }
        ],//職務經歷
        annualPublications: [
            {
                category: null,//類型
                date: null,//時間
                name: null//名稱
            }
        ],//歷年著作
        annualProjects: [
            {
                sponsorUnit: null,//委託單位
                period:[null,null] ,//起訖時間
                projectName: null//計畫名稱
            }
        ],//歷年計畫
    },
    }
  };
  
  //深拷貝
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
  
  return { 
    getUserInfo,
    resetTmpUserInfo,
    setUserInfo,
    tmpUserInfo,
    setTmpUserInfo,
    tmpBasicInformation,
    tmpCurriculumVitae,
    setTmpBasicInformation,
    setTmpCurriculumVitae,
  };
},{
  persist: {
      enabled: true,
  },
}
);
