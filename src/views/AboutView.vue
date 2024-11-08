<template>
    <div class="about">
        <el-form :model="curriculumVitae" label-position="top" :size="'large'" :disabled="!checkUser">
            <h1 style="text-align: center;margin-top: 20px;">個人簡歷</h1>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">基本資料</el-text>
                    </el-divider>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="姓名">
                        <el-input v-model="curriculumVitae.userName" placeholder="請輸入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="學歷">
                        <el-input v-model="curriculumVitae.educationalQualifications" placeholder="請輸入學歷" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6">
                    <!-- <el-form-item label="專長">
                        <el-input v-model="curriculumVitae.computerExpertise" placeholder="請輸入專長" />
                    </el-form-item> -->
                    <el-form-item label="特殊專長">
                    <el-select v-model="curriculumVitae.computerExpertise" placeholder="選擇特殊專長" multiple filterable
                        allow-create default-first-option :reserve-keyword="false">
                        <el-option v-for="d in options.expertiseList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6">
                    <!-- <el-form-item label="專業證照">
                        <el-input v-model="curriculumVitae.professionalLicense" placeholder="請輸入專業證照" />
                    </el-form-item> -->
                    <el-form-item label="專業證照">
                    <!-- <el-input v-model="currentData.professionalLicense" placeholder="請輸入專業證照" /> -->
                    <el-select v-model="curriculumVitae.professionalLicense" placeholder="請輸入專業證照" multiple filterable
                        allow-create default-first-option :reserve-keyword="false">
                        <el-option v-for="d in options.professionalLicenseList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">經歷</el-text>
                    </el-divider>
                </el-col>
                <el-col :span="24">

                    <el-form-item>
                        <el-row style="width: 100%;" :gutter="10"
                            v-for="(item, index) in curriculumVitae.workExperiences" :key="index"
                            class="work-experience-item">
                            <el-col :span="6">
                                <el-form-item label="單位">
                                    <el-input v-model="item.company" placeholder="請輸入單位" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="職稱">
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
                            <el-col :span="3">
                                <el-form-item
                                    style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                    <el-button type="success" @click="addWorkExperience()">新增</el-button>
                                    <el-button type="danger" @click="removeWorkExperience(index)">刪除</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">歷年著作</el-text>
                    </el-divider>
                </el-col>

                <el-col :span="24">
                    <el-form-item>
                        <el-row style="width: 100%;" :gutter="10"
                            v-for="(item, index) in curriculumVitae.annualPublications" :key="index"
                            class="work-experience-item">
                            <el-col :span="4">
                                <el-form-item label="類型">
                                    <el-select v-model="item.paperType" placeholder="選擇類型" :multiple="false" filterable
                                        allow-create default-first-option :reserve-keyword="false">
                                        <el-option v-for="t in options.paperTypeList" :key="t.value" :label="t.text" :value="t.value" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="時間">
                                    <el-date-picker v-model="item.issueDate" type="month" value-format="YYYY-MM"
                                        format="YYYY-MM" placeholder="時間" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="13">
                                <el-form-item label="名稱">
                                    <el-input v-model="item.name" placeholder="請輸入名稱" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item
                                    style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                    <el-button type="success" @click="addAnnualPublications()">新增</el-button>
                                    <el-button type="danger" @click="removeAnnualPublications(index)">刪除</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-divider>
                        <el-text size="large" tag="b">歷年參與之專案計畫</el-text>
                    </el-divider>
                </el-col>

                <el-col :span="24">

                    <el-form-item>
                        <el-row style="width: 100%;" :gutter="10"
                            v-for="(item, index) in curriculumVitae.annualProjects" :key="index"
                            class="work-experience-item">
                            <el-col :span="4">
                                <el-form-item label="委託單位">
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
                            <el-col :span="8">
                                <el-form-item label="計畫名稱">
                                    <el-input v-model="item.projectName" placeholder="請輸入名稱" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item
                                    style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                    <el-button type="success" @click="addAnnualProjects()">新增</el-button>
                                    <el-button type="danger" @click="removeAnnualProjects(index)">刪除</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="text-align:center;margin-top:30px;" v-if="checkUser">
                    <el-button type="success" @click="updateData()">保存</el-button>
                </el-col>

            </el-row>
        </el-form>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '../api/firebaseConfig';
import {
    getDatabase, ref as dbRef, push, onValue, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
import { useEmployeeStore } from '../stores/employee';
import { getOptions,saveProfile} from '../api/api';
const employeeStore = useEmployeeStore();
const role = ref(employeeStore.getUserInfo.role)
const curriculumVitae = ref(employeeStore.tmpCurriculumVitae);
const checkUser = computed(() => {
    return curriculumVitae.value.userId == employeeStore.getUserInfo.userId || employeeStore.getUserInfo.role == '3'
})


// 新增經歷
const addWorkExperience = () => {
    curriculumVitae.value.workExperiences.push({
        company: "",//公司名稱
        position: "",//職務名稱
        period: null//服務起訖年月
    });
};
// 移除經歷
const removeWorkExperience = (index) => {
    const minWorkExperience = 1;
    if (curriculumVitae.value.workExperiences.length <= minWorkExperience) {
        alert("最少一筆");
        return;
    }
    curriculumVitae.value.workExperiences.splice(index, 1);
};
// 新增歷年著作
const addAnnualPublications = () => {
    curriculumVitae.value.annualPublications.push({
        paperType:null,
        date: null,
        name: null
      });
};

// 移除歷年著作
const removeAnnualPublications = (index) => {
    const minannualPublications = 1;
    if (curriculumVitae.value.annualPublications.length <= minannualPublications) {
        alert("最少一筆");
        return;
    }
    curriculumVitae.value.annualPublications.splice(index, 1);
};
// 新增歷年計畫
const addAnnualProjects = () => {
    curriculumVitae.value.annualProjects.push({
        customer: null,
        projectName: null,
        period:[null,null]
      });
};

// 移除歷年計畫
const removeAnnualProjects = (index) => {
    const minannualProjects = 1;
    if (curriculumVitae.value.annualProjects.length <= minannualProjects) {
        alert("最少一筆");
        return;
    }
    curriculumVitae.value.annualProjects.splice(index, 1);
};
// 更新資料
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
    const result = await getOptions()
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
