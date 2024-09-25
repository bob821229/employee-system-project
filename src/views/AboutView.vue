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
                        <el-input v-model="curriculumVitae.name" placeholder="請輸入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="學歷">
                        <el-input v-model="curriculumVitae.educationalQualifications" placeholder="請輸入學歷" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="專長">
                        <el-input v-model="curriculumVitae.expertise" placeholder="請輸入專長" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6">
                    <el-form-item label="專業證照">
                        <el-input v-model="curriculumVitae.professionalLicense" placeholder="請輸入專業證照" />
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
                            v-for="(item, index) in curriculumVitae.workExperience" :key="index"
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
                                <el-form-item label="起訖年月">
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
                                    <el-select v-model="item.category" placeholder="選擇類型" :multiple="false" filterable
                                        allow-create default-first-option :reserve-keyword="false">
                                        <el-option v-for="c in categorys" :key="c" :label="c" :value="c" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="時間">
                                    <el-date-picker v-model="item.period" type="month" value-format="YYYY-MM"
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
                                    <el-input v-model="item.sponsorUnit" placeholder="請輸入委託單位" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="起訖年月">
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
const employeeStore = useEmployeeStore();
const role = ref(employeeStore.getUserInfo.role)
const curriculumVitae = ref(employeeStore.tmpUserInfo.curriculumVitae);
const checkUser = computed(() => {
    return curriculumVitae.value.name === employeeStore.getUserInfo.userName || employeeStore.getUserInfo.role == '3'
})
//類別列表
const categorys = ref(['博士論文', '碩士論文', '期刊', '研討會論文', '其他'])

// 新增經歷
const addWorkExperience = () => {
    curriculumVitae.value.workExperience.push({
        company: "",//公司名稱
        position: "",//職務名稱
        period: null//服務起訖年月
    });
};

// 移除經歷
const removeWorkExperience = (index) => {
    const minWorkExperience = 1;
    if (curriculumVitae.value.workExperience.length <= minWorkExperience) {
        alert("最少一筆");
        return;
    }
    curriculumVitae.value.workExperience.splice(index, 1);
};
// 新增歷年著作
const addAnnualPublications = () => {
    curriculumVitae.value.annualPublications.push({
        category: '',//類型
        date: '',//時間
        name: ''//名稱
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
        sponsorUnit: '',//委託單位
        period: null,//起訖時間
        projectName: ''//計畫名稱
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

const tableData = ref([])
// const fetchItems = async () => {
//     tableData.value.length = 0
//     let itemsRef = dbRef(db, '/curriculumVitaes');
//     try {

//         onValue(itemsRef, (snapshot) => {

//             snapshot.forEach((childSnapshot) => {
//                 const childKey = childSnapshot.key;
//                 const obj = childSnapshot.val();

//                 curriculumVitae.value = obj;
//                 curriculumVitae.value.key = childKey;
//             })
//         });
//         console.log('取得個人簡歷成功')

//     } catch (error) {
//         console.log('取得個人簡歷失敗:', error)

//     }
// };

const addItem = () => {

    const itemsRef = dbRef(db, 'curriculumVitaes');

    //啟用狀態
    curriculumVitae.value.ifEnable = true
    push(itemsRef, curriculumVitae.value);
};
const updateData = () => {
    let keyId = curriculumVitae.value.key
    set(dbRef(db, `curriculumVitaes/${keyId}`), curriculumVitae.value);
}
onMounted(() => {
    // fetchItems();
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
