<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" :ellipsis="false">
        <el-menu-item index="/from" @click="updateBasicInformation">人員資料表</el-menu-item>
        <el-menu-item index="/about" @click="updateCurriculumVitae">個人簡歷</el-menu-item>
        <el-menu-item index="/employeeList" @click="goToEmployeeList" v-if="role != '1'">人員資料表清單</el-menu-item>
        <el-menu-item index="/resignedEmployeeList" @click="goToResignedEmployeeList" v-if="role == '3'">離職人員資料表清單</el-menu-item>


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
import { getProfile,getCurriculumVitae,getOptions} from '../api/api';
import { ElLoading } from 'element-plus'
//引用dayjs
const dayjs = inject('dayjs')
onMounted(() => {
    fetchOptions()
  }
)
function goToEmployeeList(){
    router.push('/employeeList');
}
function goToResignedEmployeeList(){
    router.push('/resignedEmployeeList');
    
}
//取得下拉選單
async function fetchOptions(){
  try {
    const result = await getOptions()
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
const options=ref({})
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
        const result=await getProfile()
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
        
        const result=await getCurriculumVitae()
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
// 人員資料表資料格式化
function dataFormatHandle(data){
        //到職日格式化
        data.arrivalDate=dayjs(data.arrivalDate).format('YYYY-MM-DD')
        //到職日格式化
        data.birthday=dayjs(data.birthday).format('YYYY-MM-DD')
        //緊急聯絡人格式化
        if(data.emergencyContacts.length==0){
            data.emergencyContacts.push({
                mobile: null,//緊急聯絡人手機
                name: null,//緊急聯絡人名稱
                phone: null,//緊急聯絡人電話
                relationship: null,//緊急聯絡人關係
            })
            
        }
        // 工作經歷格式化
        data.workExperiences.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.workExperiences.length==0){
            data.workExperiences.push({
            company:null,
            leavingReason: null,
            position: null,
            salary: null,
            period:[null,null]
        })
        }
        //教育經歷格式化
        data.educationExperiences.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.educationExperiences.length==0){
            data.educationExperiences.push({
            academicDegree:null,
            degreeStatus:null,
            department:null,
            name:null,
            period:[null,null]
        })
        }
        //駕照格式化
        if(data.drvingLicense.length>0){
            const arr = data.drvingLicense.map(item => item.text);
            console.log("整理後e資料表駕照:", arr);
            data.drvingLicense = arr;
        }
        //特殊身分格式化
        if(data.specialStatus.length>0){
            const arr = data.specialStatus.map(item => item.text);
            console.log("整理後e資料表身分:", arr);
            data.specialStatus = arr;
        }
        //語言格式化
        if(data.languages.length>0){
            const arr = data.languages.map(item => item.text);
            console.log("整理後e資料表語言:", arr);
            data.languages = arr;
        }
        //特殊專長格式化
        if(data.computerExpertise.length>0){
            const arr = data.computerExpertise.map(item => item.text);
            console.log("整理後e資料表專長:", arr);
            data.computerExpertise = arr;
        }
        //專業證照格式化
        if(data.professionalLicense.length>0){
            const arr = data.professionalLicense.map(item => item.text);
            console.log("整理後e資料表證照:", arr);
            data.professionalLicense = arr;
        }
        return data
}
//個人簡歷資料格式化
function dataFormat(data){
        //經歷格式化
        data.workExperiences.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.workExperiences.length==0){
                data.workExperiences.push({
                company: null,
                position: null,
                period:[null,null]
            })
        }
        // 歷年著作格式化
        data.annualPublications.forEach((item) =>{
            item.date=dayjs(item.issueDate).format('YYYY-MM')
        })

        //歷年參與之專案計畫格式化
        data.annualProjects.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.annualProjects.length==0){
            data.annualProjects.push({
            customer: null,
            projectName: null,
            period:[null,null]
            })
        }
        //特殊專長格式化
        if(data.computerExpertise.length>0){
            const arr = data.computerExpertise.map(item => item.text);
            console.log("整理後e資料表專長:", arr);
            data.computerExpertise = arr;
        }
        //專業證照格式化
        if(data.professionalLicense.length>0){
            const arr = data.professionalLicense.map(item => item.text);
            console.log("整理後e資料表證照:", arr);
            data.professionalLicense = arr;
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