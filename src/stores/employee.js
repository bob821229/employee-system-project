import { defineStore } from 'pinia'
import { reactive, computed, inject, ref } from "vue";

export const useEmployeeStore = defineStore("employeeStore", () => {
  // 員工資料
  const getEmployeeStore = ref({
    employeeId: '',//人員編號
    department: '',//進用部門
    arrivalDate: null,//到職日
    name: '',//姓名
    idNumber: '',//身分證號
    sex: '',//性別
    birthday: null,//生日
    homePhone: '',//連絡電話
    phone: '',//行動電話
    residenceAddress: '',//戶籍地址
    mailingAddress: '',//通訊地址
    email: '',//信箱
    specialStatus: [],//特殊身分
    drvingLicense: [],//駕照
    maritalStatus: '',//婚姻狀況
    schools: [
      {
        name: "",//學校名稱
        department: "",//科系
        period: null//修業起訖年月
      }
    ],//學歷
    workExperience: [
      {
        company: "",//公司名稱
        position: "",//職務名稱
        salary: null,//薪資
        leavingReason: "",//離職原因
        period: null//服務起訖年月
      }
    ],//職務經歷
    languages: [],//語言能力
    computerExpertise: [],//電腦專長
    professionalLicense: '',//專業證照
    knowledgeAndSkills: '',//知識技能
    emergencyContact: {
      name: '', // 緊急聯絡人姓名
      relationship: '', // 關係
      phone: '', // 連絡電話
      mobile: '' // 行動電話
    },//緊急聯絡人資訊
    bank: {
      account: '',//銀行帳號
      branchName: ''//分行名稱
    },//銀行資訊
  }
);
  //更新資料
  const setEmployeeStore = (data) => {
    getEmployeeStore.value=data
  };

  //清空資料
  const resetEmployeeStore = () => {
    getEmployeeStore.value={
        ifEnable: true,//是否啟用
        key:null,
        employeeId: '',//人員編號
        department: '',//進用部門
        arrivalDate: null,//到職日
        name: '',//姓名
        idNumber: '',//身分證號
        sex: '',//性別
        birthday: null,//生日
        homePhone: '',//連絡電話
        phone: '',//行動電話
        residenceAddress: '',//戶籍地址
        mailingAddress: '',//通訊地址
        email: '',//信箱
        specialStatus: [],//特殊身分
        drvingLicense: [],//駕照
        maritalStatus: [],//婚姻狀況
        schools: [
          {
            name: "",//學校名稱
            department: "",//科系
            period: null//修業起訖年月
          }
        ],//學歷
        workExperience: [
          {
            company: "",//公司名稱
            position: "",//職務名稱
            salary: null,//薪資
            leavingReason: "",//離職原因
            period: null//服務起訖年月
          }
        ],//職務經歷
        languages: [],//語言能力
        computerExpertise: [],//電腦專長
        professionalLicense: '',//專業證照
        emergencyContact: {
          name: '', // 緊急聯絡人姓名
          relationship: '', // 關係
          phone: '', // 連絡電話
          mobile: '' // 行動電話
        },//緊急聯絡人資訊
        bank: {
          account: '',//銀行帳號
          branchName: ''//分行名稱
        },//銀行資訊
      }
  };

  const getCurriculumVitae=ref({
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
  const setCurriculumVitae=(data)=>{
    getCurriculumVitae.value=data
  }
  return { 
    getEmployeeStore, 
    setEmployeeStore, 
    resetEmployeeStore,
    getCurriculumVitae
  };
}, 
);
