<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" :ellipsis="false">
        <el-menu-item index="/from" @click="updateBasicInformation">人員資料表</el-menu-item>
        <el-menu-item index="/about" @click="updateCurriculumVitae">個人簡歷</el-menu-item>
        <el-menu-item index="/employeeList" @click="goToEmployeeList" v-if="role != '1'">人員資料表清單</el-menu-item>
        <el-menu-item index="/resignedEmployeeList" @click="goToResignedEmployeeList" v-if="role == '3'">離職人員資料表清單</el-menu-item>
        <el-menu-item index="/dataUpdateLogList" @click="goToDataUpdateLogList" v-if="role == '3'">資料異動紀錄表</el-menu-item>


        <span style="margin-left: auto; display: flex; align-items: center;margin-right: 10px;">
            <el-dropdown>
                <span class="el-dropdown-link" style="display: flex; align-items: center;">
                    <el-icon :size="20" color="#fff" style="margin-right: 8px;">
                        <UserFilled />
                    </el-icon>
                    <span style="color: #fff;">{{ userName }}</span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </el-menu>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';
import { ref, computed,onMounted,inject } from 'vue'
import { update } from 'firebase/database';
import { apiGetProfile,apiGetResume,apiGetMetaDataList} from '../api/api';
import { ElLoading } from 'element-plus'
//引用dayjs
const dayjs = inject('dayjs')

function goToEmployeeList(){
    router.push('/employeeList');
}
function goToResignedEmployeeList(){
    router.push('/resignedEmployeeList');
    
}
function goToDataUpdateLogList(){
    router.push('/dataUpdateLogList');
    
}
onMounted(() => {
    fetchOptions()
  }
)
const options=ref({})
//取得下拉選單
async function fetchOptions(){
  try {
    const result = await apiGetMetaDataList()
    console.log("@@opts:",result.data)
    options.value = result.data
  } catch (error) {
    console.log(error)
  }
}
const employeeStore = useEmployeeStore();
const userName = ref(employeeStore.getUserInfo.userName || '未登入')
const role = ref(employeeStore.getUserInfo.role || '0')
const router = useRouter();

const route = useRoute()
//目前路徑
const activeIndex = computed(() => route.path)
function logout() {
    employeeStore.setTmpBasicInformation({})
    employeeStore.setTmpCurriculumVitae({})
    employeeStore.setUserInfo({
    key: '',
    userName: '',
    role: '0'})
    //登出
    router.push('/');
}
// 更新人員資料表
async function updateBasicInformation() {
    const loadingInstance1 = ElLoading.service({ fullscreen: true })
    try {
        const result=await apiGetProfile()
        let formatData=dataFormatHandle(result.data)
        console.log("整理後e資料表:",formatData)
        employeeStore.setTmpBasicInformation(formatData)
        router.push('/form');
    } catch (error) {
        console.log(error)
    }finally{
        loadingInstance1.close()
    }
}
// 更新個人簡歷
async function updateCurriculumVitae() {
    const loadingInstance1 = ElLoading.service({ fullscreen: true })
    try {        
        
        const result=await apiGetResume()
        let formatData=dataFormat(result.data)
        console.log("整理後e個人簡歷:",formatData)
        employeeStore.setTmpCurriculumVitae(formatData)
        router.push('/about');
    } catch (error) {
        console.log(error)
    }finally{
        loadingInstance1.close()
    }
}
//把資料轉換成頁面要用的結構
function getDepartmentValue(department,departmentFromADServer) {
  if(department){
    return department
  }else{
    const departmentIndex = options.value.departmentList.findIndex(d => d.text === departmentFromADServer);
    return departmentIndex >= 0 ? options.value.departmentList[departmentIndex].value : null;
  }
}
function dataFormatHandle(data) {
  // 輔助函數：格式化日期
  const formatDate = (date) => date ? dayjs(date).format('YYYY-MM-DD') : null;

  // 輔助函數：格式化陣列
  const formatArray = (arr) => arr?.map(item => item.text) ?? [];

  // 處理部門
  // data.department = data.departmentFromADServer
  //   ? getDepartmentValue(data.departmentFromADServer)
  //   : null;
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
function dataFormatHandle1(data) {
  //第一次登入還沒有員工資料時，從AD Server取得資料
  if (!data.department) {
    //部門 格式化
    const tmpDepartment = data.departmentFromADServer;
    if (tmpDepartment) {
      data.department = getDepartmentValue(tmpDepartment);
    } else {
      data.department = null;
    }
  }

  //到職日 格式化
  data.arrivalDate = dayjs(data.arrivalDate).format('YYYY-MM-DD')
  //離職日 格式化
  data.lastWorkingDate = dayjs(data.lastWorkingDate).format('YYYY-MM-DD')
  //到職日 格式化
  data.birthday = dayjs(data.birthday).format('YYYY-MM-DD')
  //緊急聯絡人 格式化
  if (data.emergencyContacts.length == 0) {
    data.emergencyContacts.push({
      mobile: null,//緊急聯絡人手機
      name: null,//緊急聯絡人名稱
      phone: null,//緊急聯絡人電話
      relationship: null,//緊急聯絡人關係
      rid: null//緊急聯絡人編號
    })

  }
  // 工作經歷 格式化
  data.workExperiences.forEach((item) => {
    let startDate = dayjs(item.startFrom).format('YYYY-MM')
    let endDate = dayjs(item.endAt).format('YYYY-MM')
    item.period = [startDate, endDate]
  })
  // if(data.workExperiences.length==0){
  //     data.workExperiences.push({
  //     rid:null,
  //     company: null,//公司名稱
  //     position: null,//職務名稱
  //     salary: null,//薪資
  //     leavingReason: null,//離職原因
  //     period: [null, null]//服務起訖年月
  //   })
  // }
  //教育經歷 格式化
  data.educationExperiences.forEach((item) => {
    let startDate = dayjs(item.startFrom).format('YYYY-MM')
    let endDate = dayjs(item.endAt).format('YYYY-MM')
    item.period = [startDate, endDate]
  })
  if (data.educationExperiences.length == 0) {
    data.educationExperiences.push({
      rid: null,
      name: null,
      academicDegree: null,
      department: null,
      degreeStatus: null,
      period: [null, null],
    })
  }
  //駕照 格式化
  if (data.drvingLicense.length > 0) {
    const arr = data.drvingLicense.map(item => item.text);
    console.log("整理後e資料表駕照:", arr);
    data.drvingLicense = arr;
  }
  //特殊身分 格式化
  if (data.specialStatus.length > 0) {
    const arr = data.specialStatus.map(item => item.text);
    console.log("整理後e資料表身分:", arr);
    data.specialStatus = arr;
  }
  //語言 格式化
  if (data.languages.length > 0) {
    const arr = data.languages.map(item => item.text);
    console.log("整理後e資料表語言:", arr);
    data.languages = arr;
  }
  //特殊專長 格式化
  if (data.computerExpertise.length > 0) {
    const arr = data.computerExpertise.map(item => item.text);
    console.log("整理後e資料表專長:", arr);
    data.computerExpertise = arr;
  }
  //專業證照 格式化
  if (data.professionalLicense.length > 0) {
    const arr = data.professionalLicense.map(item => item.text);
    console.log("整理後e資料表證照:", arr);
    data.professionalLicense = arr;
  }
  return data
}

//個人簡歷資料格式化
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
</script>

<style scoped lang="scss">
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
}
</style>