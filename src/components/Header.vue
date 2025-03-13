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
    employeeStore.setTmpBasicInformation(null)
    employeeStore.setTmpCurriculumVitae(null)
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
        // let formatData=dataFormatHandle(result.data)
        // console.log("整理後e資料表:",formatData)
        employeeStore.setTmpBasicInformation(result.data)
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
        // let formatData=dataFormat(result.data)
        // console.log("整理後e個人簡歷:",formatData)
        employeeStore.setTmpCurriculumVitae(result.data)
        router.push('/about');
    } catch (error) {
        console.log(error)
    }finally{
        loadingInstance1.close()
    }
}

</script>

<style scoped lang="scss">
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
}
</style>