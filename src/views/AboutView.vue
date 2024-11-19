<template>
    <div class="about" :key="randerKey">
        <el-breadcrumb separator="/" v-if="employeeStore.getUserInfo.role!=1">
            <el-breadcrumb-item><el-text size="large" tag="b">員工簡歷</el-text></el-breadcrumb-item>
            <el-breadcrumb-item><el-text size="large" tag="b">{{ curriculumVitae.userName??'' }}</el-text></el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="ruleFormRef" :model="curriculumVitae" label-position="top" :size="'large'" :disabled="!checkUser" :rules="rules">
            <h1 style="text-align: center;margin-top: 20px;">個人簡歷</h1>
            <el-row :gutter="10">
                <!-- TODO 基本資料 -->
                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">基本資料</el-text>
                    </el-divider>
                </el-col>
                <!-- 姓名 -->
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="curriculumVitae.userName" placeholder="請輸入姓名" :disabled="!isHRUser" />
                    </el-form-item>
                </el-col>
                <!-- 學歷 -->
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="學歷">
                        <el-input v-model="highestEducationTxt" placeholder="請輸入學歷"  :disabled="!isHRUser"/>
                    </el-form-item>
                </el-col>
                <!-- 特殊專長 -->
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="特殊專長">
                    <el-select v-model="curriculumVitae.computerExpertise" placeholder="選擇特殊專長" multiple filterable
                        allow-create default-first-option :reserve-keyword="false">
                        <el-option v-for="d in options.expertiseList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
                </el-col>
                <!-- 專業證照 -->
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="專業證照">
                    <el-select v-model="curriculumVitae.professionalLicense" placeholder="請輸入專業證照" multiple filterable
                        allow-create default-first-option :reserve-keyword="false">
                        <el-option v-for="d in options.professionalLicenseList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
                </el-col>
                <!-- TODO 經歷 -->
                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">經歷</el-text>
                    </el-divider>
                </el-col>
                <el-col :span="24">
                        <el-row style="width: 100%;align-items: end;" :gutter="10"
                            v-for="(item, index) in curriculumVitae.workExperiences" :key="index"
                            class="work-experience-item">
                            <el-col :span="7">
                                <el-form-item label="單位" :prop="'workExperiences.' + index + '.company'" :rules="{ required: true, message: '請輸入單位', trigger: 'blur' }">
                                    <el-input v-model="item.company" placeholder="請輸入單位" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="職稱" :prop="'workExperiences.' + index + '.position'" :rules="{ required: true, message: '請輸入職稱', trigger: 'blur' }">
                                    <el-input v-model="item.position" placeholder="請輸入職稱" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="起訖年月" :prop="'workExperiences.' + index + '.period'" :rules="{
                                    type: 'array',
                                    required: true,
                                    trigger: 'change',
                                    validator: (rule, value, callback) => {
                                        if (value && value.length === 2 && value[0] !== null && value[1] !== null) {
                                            callback();
                                        } else {
                                            callback(new Error('請選擇有效的起訖年月'));
                                        }
                                    }
                                }">
                                    <el-date-picker v-model="item.period" type="monthrange" range-separator="至"
                                        start-placeholder="開始年月" end-placeholder="結束年月" format="YYYY-MM"
                                        value-format="YYYY-MM" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <el-form-item
                                    style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                    <!-- <el-button type="success" @click="addWorkExperience()">新增</el-button> -->
                                    <el-button plain type="danger" @click="removeWorkExperience(index,item)">
                                        <!-- 刪除 -->
                                        <el-icon><Delete /></el-icon>
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </el-col>
                <!-- 新增經歷 -->
                <el-col :span="24" >
                    <el-row justify="center">
                        <el-button plain type="success" @click="addWorkExperience()">新增</el-button>
                    </el-row>
                </el-col>

                <!-- TODO 歷年著作 -->
                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">歷年著作</el-text>
                    </el-divider>
                </el-col>
                <el-col :span="24">
                        <el-row style="width: 100%;align-items: end;" :gutter="10" 
                            v-for="(item, index) in curriculumVitae.annualPublications" :key="index"
                            class="work-experience-item">
                            <el-col :span="5">
                                <el-form-item label="類型" :prop="'annualPublications.' + index + '.paperType'" :rules="{
                            required: true,
                            trigger: 'change',
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback(new Error('請選擇類型'))
                                } else {
                                    callback()
                                }
                            }
                        }">
                                    <el-select v-model="item.paperType" placeholder="選擇類型" :multiple="false" >
                                        <el-option v-for="t in options.paperTypeList" :key="t.value" :label="t.text" :value="t.value" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="時間" :prop="'annualPublications.' + index + '.issueDate'" :rules="{ type: 'date', required: true, message: '請選擇時間', trigger: 'change' }">
                                    <el-date-picker style="width: 100%;" v-model="item.issueDate" type="month" value-format="YYYY-MM"
                                        format="YYYY-MM" placeholder="時間" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="13">
                                <el-form-item label="名稱" :prop="'annualPublications.' + index + '.name'" :rules="{ required: true, message: '請輸入名稱', trigger: 'blur' }">
                                    <el-input v-model="item.name" placeholder="請輸入名稱" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <el-form-item
                                    style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                    <!-- <el-button type="success" @click="addAnnualPublications()">新增</el-button> -->
                                    <el-button plain type="danger" @click="removeAnnualPublications(index,item)">
                                        <!-- 刪除 -->
                                        <el-icon><Delete /></el-icon>
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </el-col>
                <!-- 新增歷年著作 -->
                <el-col :span="24" >
                    <el-row justify="center">
                        <el-button plain type="success" @click="addAnnualPublications()">新增</el-button>
                    </el-row>
                </el-col>
                <!-- TODO 歷年參與之專案計畫 -->
                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">歷年參與之專案計畫</el-text>
                    </el-divider>
                </el-col>
                <el-col :span="24">
                    <el-row style="width: 100%;align-items: end;" :gutter="10"
                            v-for="(item, index) in curriculumVitae.annualProjects" :key="index"
                            class="work-experience-item">
                            <el-col :span="4">
                                <el-form-item label="委託單位" :prop="'annualProjects.' + index + '.customer'" :rules="{ required: true, message: '請輸入委託單位', trigger: 'blur' }">
                                    <el-input v-model="item.customer" placeholder="請輸入委託單位" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="起訖年月" :prop="'annualProjects.' + index + '.period'" :rules="{
                                    type: 'array',
                                    required: true,
                                    trigger: 'change',
                                    validator: (rule, value, callback) => {
                                        if (value && value.length === 2 && value[0] !== null && value[1] !== null) {
                                            callback();
                                        } else {
                                            callback(new Error('請選擇有效的起訖年月'));
                                        }
                                    }
                                }">
                                    <el-date-picker v-model="item.period" type="monthrange" range-separator="至"
                                        start-placeholder="開始年月" end-placeholder="結束年月" format="YYYY-MM"
                                        value-format="YYYY-MM" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="計畫名稱" :prop="'annualProjects.' + index + '.projectName'" :rules="{ required: true, message: '請輸入名稱', trigger: 'blur' }">
                                    <el-input v-model="item.projectName" placeholder="請輸入名稱" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <el-form-item
                                    style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                    <!-- <el-button type="success" @click="addAnnualProjects()">新增</el-button> -->
                                    <el-button plain type="danger" @click="removeAnnualProjects(index,item)">
                                        <!-- 刪除 -->
                                        <el-icon><Delete /></el-icon>
                                    </el-button>
                                </el-form-item>
                            </el-col>
                    </el-row>
                </el-col>
                <!-- 新增歷年參與之專案計畫 -->
                <el-col :span="24" >
                    <el-row justify="center">
                        <el-button plain type="success" @click="addAnnualProjects()">新增</el-button>
                    </el-row>
                </el-col>
                <!-- TODO 按鈕區 -->
                <el-col :span="24">
                    <el-divider>
                    </el-divider>
                </el-col>
                <el-col :span="24" style="text-align:center;margin-top:30px;" v-if="checkUser">
                    <!-- <el-button  size="large" type="primary" @click="updateData()">保存</el-button> -->
                    <el-button  size="large" type="primary" @click="saveResume(ruleFormRef)">保存</el-button>
                </el-col>

            </el-row>
        </el-form>
    </div>
</template>
<script setup>
import { ref, onMounted, computed,reactive } from 'vue'
import { db } from '../api/firebaseConfig';
import {
    getDatabase, ref as dbRef, push, onValue, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
import { useEmployeeStore } from '../stores/employee';
import { apiGetMetaDataList,apiSaveResume,apiDeleteWorkingExperience,apiDeleteUserPublication,apiDeleteUserProject} from '../api/api';
import { ElLoading,ElMessage,ElMessageBox } from 'element-plus'
// TODO 設定動態新增的項目上下限
//控制可動態新增的項目的最大、最小數量
const dataConstraints=reactive({
    //工作經歷
    workExperiences:{
        min:0,
        max:10
    },
    //歷年著作
    annualPublications:{
        min:0,
        max:10
    },
    //歷年參與之專案計畫
    annualProjects:{
        min:0,
        max:3
    }
})
//控制刷新
// const randerKey=computed(()=>{
//     return employeeStore.tmpCurriculumVitae
// })
// 創建一個響應式引用來存儲表單元素
const ruleFormRef = ref(null);
//驗證規則
const rules = reactive({
    userName: [
        { required: true, message: '請輸入姓名', trigger: 'blur' }
    ]
})
const employeeStore = useEmployeeStore();
const role = ref(employeeStore.getUserInfo.role)
// const curriculumVitae = ref(employeeStore.tmpCurriculumVitae);
const curriculumVitae = computed(()=>employeeStore.tmpCurriculumVitae);
const checkUser = computed(() => {
    return curriculumVitae.value.userId == employeeStore.getUserInfo.userId || employeeStore.getUserInfo.role == '3'
})
const isHRUser=computed(()=>{
    return employeeStore.getUserInfo.role == '3'
})
const highestEducationTxt=computed(()=>{
    return curriculumVitae.value.highestEducation.name+curriculumVitae.value.highestEducation.academicDegreeCaption
})

// 新增經歷
const addWorkExperience = () => {
    let max=dataConstraints.workExperiences.max
    let arrLength = curriculumVitae.value.workExperiences.length
    if (arrLength == max) {
        ElMessage({
            message: `最多${max}筆`,
            type: 'warning',
            plain: true,
        })
    } else {
        curriculumVitae.value.workExperiences.push({
            company: "",//公司名稱
            position: "",//職務名稱
            period: [null,null],//服務起訖年月
            rid:null//編號
        });
    }
};
// 移除經歷
const removeWorkExperience = (index,obj) => {
    let min=dataConstraints.workExperiences.min
    let arrLength = curriculumVitae.value.workExperiences.length
    if (arrLength == min) {
        ElMessage({
            message: `最少${min}筆`,
            type: 'warning',
            plain: true,
        })
    } else {
        console.log("想移除的經歷:",obj)
        let rid=obj.rid
        ElMessageBox.confirm(
        '確定要移除該筆經歷嗎?',
        '警告',
        {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async() => {
            if(obj.rid){
                const loadingInstance1 = ElLoading.service({ fullscreen: true })
                try {
                    const response=await apiDeleteWorkingExperience(rid)
                    if(response.data.success){
                        ElMessage({
                        type: 'success',
                        message: response.data.message??'刪除成功',
                        })
                        curriculumVitae.value.workExperiences.splice(index, 1);
                    }else{
                        ElMessage({
                        type: 'error',
                        message: response.data.message??'刪除失敗',
                        })
                    }
                    
                    
                } catch (error) {
                    console.log(error)
                }finally{
                    loadingInstance1.close()
                }
            }else{
                curriculumVitae.value.workExperiences.splice(index, 1);
            }
        })
        .catch(() => {
            console.log(`取消刪除rid:${rid}`)
        })
    }
};
// 新增歷年著作
const addAnnualPublications = () => {
    let max=dataConstraints.annualPublications.max
    let arrLength = curriculumVitae.value.annualPublications.length
    if (arrLength == max) {
        ElMessage({
            message: `最多${max}筆`,
            type: 'warning',
            plain: true,
        })
    } else {
        curriculumVitae.value.annualPublications.push({
            paperType:null,//論文類型
            issueDate: null,//發表日期
            name: null,//論文名稱
            rid:null//編號
          });
    }
};

// 移除歷年著作
const removeAnnualPublications = (index,obj) => {
    let arrLength = curriculumVitae.value.annualPublications.length
    let min=dataConstraints.annualPublications.min
    if (arrLength == min) {
        ElMessage({
            message: `最少${min}筆`,
            type: 'warning',
            plain: true,
        })
    } else {
        console.log("想移除的歷年著作:",obj)
        let rid=obj.rid
        ElMessageBox.confirm(
        '確定要移除該筆歷年著作嗎?',
        '警告',
        {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async() => {
            if(obj.rid){
                const loadingInstance1 = ElLoading.service({ fullscreen: true })
                try {
                    const response=await apiDeleteUserPublication(rid)
                    if(response.data.success){
                        ElMessage({
                        type: 'success',
                        message: response.data.message??'刪除成功',
                        })
                        curriculumVitae.value.annualPublications.splice(index, 1);
                    }else{
                        ElMessage({
                        type: 'error',
                        message: response.data.message??'刪除失敗',
                        })
                    }
                    
                    
                } catch (error) {
                    console.log(error)
                }finally{
                    loadingInstance1.close()
                }
            }else{
                curriculumVitae.value.annualPublications.splice(index, 1);
            }
        })
        .catch(() => {
            console.log(`取消刪除rid:${rid}`)
        })
    }
};
// 新增歷年計畫
const addAnnualProjects = () => {
    let max=dataConstraints.annualProjects.max
    let arrLength = curriculumVitae.value.annualProjects.length
    if (arrLength == max) {
        ElMessage({
            message: `最多${max}筆`,
            type: 'warning',
            plain: true,
        })
    } else {
        curriculumVitae.value.annualProjects.push({
            customer: null,
            projectName: null,
            period:[null,null],
            rid:null
          });
    }
};

// 移除歷年計畫
const removeAnnualProjects = (index,obj) => {

    let arrLength = curriculumVitae.value.annualProjects.length
    let min=dataConstraints.annualProjects.min
    if (arrLength == min) {
        ElMessage({
            message: `最少${min}筆`,
            type: 'warning',
            plain: true,
        })
    } else {
        console.log("想移除的歷年參與之專案計畫:",obj)
        let rid=obj.rid
        ElMessageBox.confirm(
        '確定要移除該筆歷年參與之專案計畫嗎?',
        '警告',
        {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async() => {
            if(obj.rid){
                const loadingInstance1 = ElLoading.service({ fullscreen: true })
                try {
                    const response=await apiDeleteUserProject(rid)
                    if(response.data.success){
                        ElMessage({
                        type: 'success',
                        message: response.data.message??'刪除成功',
                        })
                        curriculumVitae.value.annualProjects.splice(index, 1);
                    }else{
                        ElMessage({
                        type: 'error',
                        message: response.data.message??'刪除失敗',
                        })
                    }
                    
                    
                } catch (error) {
                    console.log(error)
                }finally{
                    loadingInstance1.close()
                }
            }else{
                curriculumVitae.value.annualProjects.splice(index, 1);
            }
        })
        .catch(() => {
            console.log(`取消刪除rid:${rid}`)
        })
    }
};
// firebase更新資料
const updateData = () => {
    let firebaseKey = employeeStore.tmpUserInfo.firebaseKey
    console.log('firebaseKey:', firebaseKey)
    let isSelf = (employeeStore.tmpUserInfo.userName == employeeStore.getUserInfo.userName)
    //如果修改對象是本人，則更新store中的資料
    console.log('isSelf:', isSelf)
    if (isSelf) {
        employeeStore.getUserInfo = deepCopy(employeeStore.tmpUserInfo)
        console.log('本人更新成功:', employeeStore.tmpUserInfo);
    } else {
        console.log('非本人更新成功:', employeeStore.tmpUserInfo);
    }
    set(dbRef(db, `users/${firebaseKey}`), employeeStore.tmpUserInfo);
}
// 驗證 & 儲存員工簡歷
const saveResume = async()=>{

    // console.log("驗證", ruleFormRef.value)
    ruleFormRef.value.validate(async (valid, fields) => {
        if (!valid) {
            // 使用 Object.keys 列出所有未通過的欄位名稱
            const errorFields = Object.keys(fields);
            
            // 顯示具體的錯誤訊息
            console.log("未通過驗證的欄位：", errorFields);
            console.log("詳細錯誤信息：", fields); // 會顯示欄位及對應的錯誤訊息
            
            ElMessage.error('驗證失敗，請檢查輸入');
            
            // 若要進一步顯示每個欄位的錯誤訊息
            errorFields.forEach(field => {
                console.log(`欄位 ${field} 錯誤：`, fields[field][0].message);
            });
        } else {
            // console.log('目前資料curriculumVitae:',curriculumVitae.value);
            const loadingInstance1 = ElLoading.service({ fullscreen: true })
            let apiData = deepCopy(curriculumVitae.value)//深拷貝不影響原來數據
            apiData= dataFormatHandle(apiData)
            console.log("要更新的簡歷處理前:",curriculumVitae.value)
            console.log("要更新的簡歷處理後:",apiData)
            try {
                const respone=await apiSaveResume(apiData)
                console.log("更新成功，返回的數據:", respone.data);
                ElMessage.success('個人簡歷 更新成功');
            } catch (error) {
                console.log(error)
                ElMessage.error('個人簡歷 更新失敗');
            }finally{
                loadingInstance1.close()
            }
        }
    });
}
//深拷貝
const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
//把資料轉換成api要用的結構
function dataFormatHandle(data){
        //歷年參與之專案計畫 格式化
        data.annualProjects.forEach((item) =>{
            item.startFrom=item.period[0]+"-01"
            item.endAt=item.period[1]+"-01"
        })
        //歷年著作 格式化
        data.annualPublications.forEach((item) =>{
            item.issueDate=item.issueDate+"-01"
        })
        // 工作經歷格式化
        data.workExperiences.forEach((item) =>{
            item.startFrom=item.period[0]+"-01"
            item.endAt=item.period[1]+"-01"
        })
        //專長格式化
        if(data.computerExpertise.length>0){
            let arry=[]
            data.computerExpertise.forEach((item) =>{
                const findObj=options.value.expertiseList.find((x) => x.text==item)
                if(findObj){
                    let obj={codeNo:findObj.value}
                    arry.push(obj)
                }else{
                    let obj={newText:item}
                    arry.push(obj)
                }
            })
            data.computerExpertise = arry;
        }
        //證照格式化
        if(data.professionalLicense.length>0){
            let arry=[]
            data.professionalLicense.forEach((item) =>{
                const findObj=options.value.professionalLicenseList.find((x) => x.text==item)
                if(findObj){
                    let obj={codeNo:findObj.value}
                    arry.push(obj)
                }else{
                    let obj={newText:item}
                    arry.push(obj)
                }
            })
            data.professionalLicense = arry;
        }
        return data
}
// 下拉清單
const options=ref({   
    "departmentList": [
        { "text": "研究一所", "value": "研究一所" }
    ],    
    "sexList":[
        { "text": "男", "value": "男" }
    ],
    "positionTitleList": [
        { "text": "開發人員", "value": "開發人員" }
    ],
    "specialStatuList": [
        { "text": "原住民", "value": "原住民" }
    ],
    "drvingLicenseList":[
        { "text": "無", "value": "無" }
    ],
    "maritalStatusList":[
        { "text": "未婚", "value": "未婚" }
    ],
    "academicDegreeList":[
        { "text": "博士", "value": "博士" }
    ],
    "graduateStatusList":[
        { "text": "畢業", "value": "畢業" }
    ],
    "languageList": [
        { "text": "國語", "value": "國語" }
    ],
    "expertiseList": [
        { "text": "Word", "value": "Word" }
    ],
    "professionalLicenseList": [
        { "text": "系統分析師 (CSM)", "value": "系統分析師 (CSM)" }
    ],
    "paperTypeList":[
        { "text": "博士論文", "value": "博士論文" }
    ]
})
//取得下拉選單
async function fetchOptions(){
  try {
    const result = await apiGetMetaDataList()
    options.value= result.data

  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
    fetchOptions()
})
</script>
<style scoped lang="scss">
.el-breadcrumb{
    width: 80%;
    margin: 20px auto;
}
.el-form {
    width: 80%;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px
}

.el-form-item {
    align-items: center;
}

.el-divider {
    margin: 50px 0 30px 0;
}
</style>
